const plugins = {
  'postcss-import': {},
  'postcss-custom-properties': {},
  'postcss-custom-media': {},
  'postcss-nested': {},
  'postcss-color-hex-alpha': {},
  'postcss-fixes': {},
  'postcss-url': {},
  autoprefixer: { grid: true },
};

if (process.env.NODE_ENV === 'production') {
  plugins.cssnano = {};
}

module.exports = { plugins };
