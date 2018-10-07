const { execSync } = require('child_process');
const fs = require('fs-extra');
const path = require('path');

const PATH = {
  build: 'build/',
  work: 'build_diff/'
};

const RESULT_SUCCESS = 0;
const RESULT_ERROR = 1;

function main() {
  const gitInfo = getGitInfo();

  if (!isWorkingDirClean()) {
    console.error('Error! working dirがよごれています。git statusを確認してください');
    return RESULT_ERROR;
  }

  if (typeof gitInfo.checkoutTarget !== 'string') {
    console.error('Error! checkout TARGETの引数が必要です');
    return RESULT_ERROR;
  }

  execCleaning();

  // 現在のものを作成
  buildAndCopy('current');

  // 指定checkout先へcheckout
  gitCheckout(gitInfo.checkoutTarget);

  // 指定のものを作成
  buildAndCopy('target');

  // 元のブランチへ戻る
  gitCheckout(gitInfo.currentBranch);

  // ファイル差分リストを作る
  makeDiffList(`${PATH.work}current`, `${PATH.work}target`);

  // ファイル差分を取得
  makeDiffFileDir();

  return RESULT_SUCCESS;
}

function getGitInfo() {
  return {
    currentBranch: execSync("git branch --contains | awk '{ print $2 }'").toString().trim(),
    currentId: execSync('git log -n 1 --format=%H').toString().trim(),
    checkoutTarget: process.argv[2]
  };
}

function isWorkingDirClean() {
  const gitStatus = execSync('git status').toString().trim();
  return gitStatus.match(/working tree clean/) != null ||
    gitStatus.match(/working directory clean/) != null;
}

/** TODO: can't get checkout result */
function gitCheckout(target) {
  console.log(`  checkout ${target}`);
  execSync(`git checkout ${target}`);
}

function execCleaning() {
  fs.removeSync(PATH.build);
  fs.removeSync(PATH.work);
}

function buildAndCopy(typeName) {
  console.log(`  build ${typeName}...`);

  fs.mkdirpSync(PATH.build);
  execSync('npm run build');

  fs.copySync(PATH.build, `${PATH.work + typeName}/`);
  fs.removeSync(PATH.build);
}

function makeDiffList(currentPath, targetPath, diffFileName = `${PATH.work}diff.txt`) {
  console.log(`  get difflist ${currentPath} and ${targetPath}...`);

  try {
    // diffは差分があるとexit codeが0でなくなるので例外扱いとなってしまうため潰す
    execSync(`/usr/bin/env diff -rq ${currentPath} ${targetPath} > ${diffFileName}`);
  } catch (_e) {
    console.log('  get difflist finish!');
  }
}

function makeDiffFileDir(diffFilePath = `${PATH.work}diff.txt`) {
  const lines = fs.readFileSync(diffFilePath, 'utf8').split('\n');

  lines.forEach(line => {
    const diffInfos = line.split(' ');

    switch (diffInfos[0]) {
      case 'Only':
        copyOnlyFile(diffInfos);
        break;
      case 'Files':
        copyFilesFile(diffInfos);
        break;
      default:
        // 何もしない
        break;
    }
  });
}

function copyOnlyFile([_, __, filePathWithCoron, fileName]) {
  const filePath = filePathWithCoron.replace(/:$/, '') + '/';

  // 比較先にしかないファイルは無視する
  if (filePath.indexOf(`${PATH.work}target/`) !== -1) {
    return;
  }

  const moveFilePath = filePath.replace(`${PATH.work}current/`, `${PATH.work}diff/`);

  console.log(`[copyOnly] File: ${filePath + fileName} Target: ${moveFilePath}`);
  const fileFullPath = moveFilePath + fileName;
  fs.mkdirpSync(path.dirname(fileFullPath));
  fs.copySync(filePath + fileName, fileFullPath);
}

function copyFilesFile([_, filePathName, __]) {
  const filePlainPath = filePathName.replace(`${PATH.work}current/`, '');
  const fileCopyPath = `${PATH.work}diff/${filePlainPath}`;

  console.log(`[copyFiles] File: ${filePathName}`);
  fs.mkdirpSync(path.dirname(fileCopyPath));
  fs.copySync(filePathName, fileCopyPath);
}

console.log('--------------------Start get-build-diff --------------------');
main();
console.log('-------------------- End get-build-diff  --------------------');