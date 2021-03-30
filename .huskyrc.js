module.exports = {
  hooks: {
    'pre-commit': 'npm run check',
    'pre-push': 'npm test',
    'commit-msg': 'commitlint -E HUSKY_GIT_PARAMS',
  },
};
