module.exports = {
  extends: ['stylelint-config-standard'],
  ignoreFiles: ['node_modules/**/*', 'assets/**/*', 'build/**/*', 'src/assets/**/*'],
  rules: {
    /*
     * ECSS basic rules
     */
    // 空のブロックを禁止
    'block-no-empty': true,
    // 不正なhexを禁止
    'color-no-invalid-hex': true,
    // コロンのあとにはスペース
    'declaration-colon-space-after': 'always',
    // コロンの前にはスペースなし
    'declaration-colon-space-before': 'never',
    'function-url-quotes': 'always',
    'media-feature-colon-space-after': 'always',
    'media-feature-colon-space-before': 'never',
    'media-feature-name-no-vendor-prefix': true,
    'max-empty-lines': 2,
    'property-no-vendor-prefix': true,
    'declaration-block-no-duplicate-properties': true,
    'declaration-block-trailing-semicolon': 'always',
    'selector-list-comma-newline-after': 'always-multi-line',
    'selector-max-id': 0,
    'value-no-vendor-prefix': true,
    'function-linear-gradient-no-nonstandard-direction': true,
    'selector-max-universal': 0,
    'declaration-block-no-shorthand-property-overrides': true,

    /*
     * prettier
     */
    'max-line-length': null,
    indentation: null,
    'no-extra-semicolons': null,
    'declaration-block-semicolon-newline-after': null,
    'declaration-block-semicolon-newline-before': null,
    'declaration-block-semicolon-space-after': null,
    'declaration-block-semicolon-space-before': null,
    'string-quotes': null,
    'block-closing-brace-empty-line-before': null,
    'block-closing-brace-newline-after': null,
    'block-closing-brace-newline-before': null,
    'block-closing-brace-space-after': null,
    'block-closing-brace-space-before': null,
    'block-opening-brace-newline-after': null,
    'block-opening-brace-newline-before': null,
    'block-opening-brace-space-after': null,
    'block-opening-brace-space-before': null,
    'number-leading-zero': null,
    'number-no-trailing-zeros': null,

    /*
     * Manual
     */
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
  },
};
