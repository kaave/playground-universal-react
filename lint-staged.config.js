module.exports = {
  subTaskConcurrency: 1,
  linters: {
    '*.{js,ts,tsx}': ['eslint --fix', 'git add'],
    '*.css': ['prettier --write', 'stylelint', 'git add'],
    '*.json': ['prettier --write', 'git add'],
  },
};
