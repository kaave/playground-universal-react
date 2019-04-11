module.exports = {
  extends: [
    'airbnb',
    'plugin:prettier/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    // https://github.com/typescript-eslint/typescript-eslint/blob/master/packages/parser/README.md
    ecmaFeatures: {
      jsx: true,
    },
    // sourceType: 'module',
    project: './tsconfig.json',
    extraFileExtensions: ['.vue'],
  },
  env: {
    browser: true,
    node: true,
    es6: true,
    jest: true,
  },
  settings: {
    // typeをexportした際にimport/namedがおかしいため外す
    // 'import/parsers': {
    //   '@typescript-eslint/parser': ['.ts', '.tsx'],
    // },
    // importタグの拡張子がらみTS対応
    'import/resolver': {
      // use <root>/tsconfig.json
      typescript: {},
      webpack: {
        config: './tools/webpack/server/production.js',
      },
    },
    // importの際にあーだこーだ言われたくないものを
    'import/core-modules': ['enzyme', '@storybook/react'],
  },
  rules: {
    // default exportを押す 無効化
    'import/prefer-default-export': 'off',
    // ~が機能しないため外す
    'import/no-unresolved': 'off',
    // クラスメンバーは改行で区切るが、1行の場合はスルー
    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],

    /*
     * react
     */
    // prop typesはTSなので使わない
    'react/prop-types': 'off',
    // JSXが入ってる拡張子はtsx 一応jsxも入れとく
    'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
    // 1行あたり1expression prettierへ任せる
    'react/jsx-one-expression-per-line': 'off',
    // propsとか使うときにあらかじめ分割代入して使う クラスフィールドの場合は無視でほかは強制
    'react/destructuring-assignment': ['error', 'always', { ignoreClassFields: true }],
    // メソッドやらプロパティやらの順序を縛る 無効化 いろいろめんどくさい
    'react/sort-comp': 'off',

    /*
     * typescript
     */
    // publicとかprivateなどのアクセス修飾子を強要 無効化 JSに寄せたいし、そもそもなるべくなくてもいいように書きたい
    '@typescript-eslint/explicit-member-accessibility': 'off',
    // 関数のexportの並び順をしばる 有効化
    '@typescript-eslint/adjacent-overload-signatures': 'error',
    // 関数の戻り値を強制 無効化 voidのみ無効にできたら有効にしたいができないので全部OFF
    '@typescript-eslint/explicit-function-return-type': 'off',
    // interfaceの命名をIはじまりに 無効化 C#じゃないんで
    '@typescript-eslint/interface-name-prefix': 'off',
    // 空のinterfaceをしばる 無効化 アクセス修飾子の代わりに使うことがあるんで
    '@typescript-eslint/no-empty-interface': 'off',
    // 未使用の変数を警告 無効化 tscではねる
    '@typescript-eslint/no-unused-vars': 'off',
    // any禁止 無効化 tscに任せる
    '@typescript-eslint/no-explicit-any': 'off',
    // requireを蹴る 無効化 global-requireって設定があるからいらん
    '@typescript-eslint/no-var-requires': 'off',
    // interfaceでOKなものをtypeで書いてたら怒る 無効化 今っぽくない
    '@typescript-eslint/prefer-interface': 'off',
  },
};
