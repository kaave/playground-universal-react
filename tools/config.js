const fs = require('fs');
const path = require('path');

exports.path = {
  dest: {
    development: path.join(process.cwd(), '.tmp'),
    production: path.join(process.cwd(), 'build'),
  },
  scripts: path.join(process.cwd(), 'src', 'scripts'),
  styles: path.join(process.cwd(), 'src', 'styles'),
  views: path.join(process.cwd(), 'src', 'views'),
  assets: path.join(process.cwd(), 'assets'),
};

// この項目に要素を追加すると[copy:[KEY_NAME]]という名称で勝手にtaskも増えます。
exports.copy = {
  'assets:build': [
    `${exports.path.assets}/**/*`,
    `!${exports.path.assets}/**/*.{jpg,jpeg,gif,png}`,
  ],
};

exports.style = {
  src: [
    path.join(exports.path.styles, '**', '*.css'),
    `!${path.join(exports.path.styles, '**', '_*')}`
  ],
  watch: [path.join(exports.path.styles, '**', '*.css')],
};

exports.image = {
  src: [
    `${exports.path.assets}/**/*.{jpg,jpeg,gif,png}`,
  ],
  // PNG形式: https://www.npmjs.com/package/imagemin-pngquant
  png: {
    // クオリティ 0(やり過ぎ) ~ 100(ほぼそのまま) -で繋いで2つ書くとmin-maxという意味合いらしいがよくわかりません
    quality: '65-80',
    // 処理速度を指定 1(じっくり) ~ 10(最速) 5％くらい質に違いが出るらしい
    speed: 1,
    // ディザリングを設定 0(無効) ~ 1(最大)
    floyd: 0,
    // フロイド-スタインバーグ・ディザリングを無効化するか
    // https://ja.wikipedia.org/wiki/%E3%83%95%E3%83%AD%E3%82%A4%E3%83%89-%E3%82%B9%E3%82%BF%E3%82%A4%E3%83%B3%E3%83%90%E3%83%BC%E3%82%B0%E3%83%BB%E3%83%87%E3%82%A3%E3%82%B6%E3%83%AA%E3%83%B3%E3%82%B0
    nofs: false
  },
  // JPG形式: https://www.npmjs.com/package/imagemin-mozjpeg
  jpg: {
    // クオリティ 0(やり過ぎ) ~ 100(ほぼそのまま)
    quality: 80,
    // プログレッシブjpegを作成するか falseにするとベースラインjpeg
    progressive: true,
  },
  // GIF形式: https://github.com/imagemin/imagemin-gifsicle#imagemingifsicleoptionsbuffer
  gif: {
    // 最適化レベル 1(ちょっと)-3(そこそこ)で指定
    optimizationLevel: 3
  },
  // SVG形式: https://github.com/svg/svgo#what-it-can-do
  svg: {
  },
};

exports.view = {
  src: [`${exports.path.views}/**/*.ejs`, `!${exports.path.views}/**/_*`],
  watch: [`${exports.path.views}/**/*.ejs`],
};

exports.port = {
  browserSync: 8880,
  webpackDevServer: 13000,
}

exports.browser = {
  // open: false,
  notify: false,
  port: exports.port.browserSync,
  proxy: `http://localhost:${exports.port.webpackDevServer}`,
  reloadDebounce: 500,
};
