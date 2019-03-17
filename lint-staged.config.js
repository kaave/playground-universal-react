module.exports = {
  subTaskConcurrency: 1,
  linters: {
    '*.{js,ts,tsx}': ['eslint --fix', 'git add'],
    '*.scss': ['stylelint --fix', 'git add'],
    '*.json': ['prettier --write', 'git add'],
  },
};
