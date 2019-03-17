module.exports = {
  extends: ['stylelint-config-prettier', 'stylelint-config-recommended-scss'],
  ignoreFiles: ['node_modules/**/*', 'assets/**/*', '.tmp/**/*', 'build/**/*', 'src/coverage/**/*', 'src/assets/**/*'],
  syntax: 'scss',
  rules: {
    /*
     * Manual
     */
    // indentはprettierが受け持つ
    indentation: null,
    // コメント記号とコメント本文の間にスペースを共用する 無効化 IntelliJと相性が悪い
    'comment-whitespace-inside': null,
    // @なにがしで意味不明なものを無効化 mixin関係を通す
    'at-rule-no-unknown': [true, { ignoreAtRules: ['mixin', 'define-mixin'] }],
    // @の前に空行を強制 いくつかのルールは例外
    'at-rule-empty-line-before': [
      'always',
      {
        except: ['blockless-after-same-name-blockless', 'first-nested', 'inside-block'],
        ignore: ['after-comment'],
      },
    ],
    // 複雑すぎる指定はNG ただし属性っぽいものはだいたいOK
    'selector-max-specificity': ['0,2,0', { ignoreSelectors: ['/:.*/', '/-[^-].*/', '/ \\+ /'] }],
    // コメントの前には空行
    'comment-empty-line-before': [
      'always',
      {
        except: ['first-nested'],
        ignore: ['after-comment', 'stylelint-commands'],
      },
    ],
    // カンマの後ろにはスペース
    'function-comma-space-after': 'always-single-line',

    // @extendは難しいから近視
    'at-rule-blacklist': ['extend'],
  },
};
