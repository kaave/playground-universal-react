module.exports = {
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.spec\\.(ts|tsx)$',
  collectCoverage: true,
  collectCoverageFrom: [
    "src/scripts/**/*.ts",
    "src/scripts/**/*.tsx",
    "!src/scripts/**/*.d.ts",
  ]
};
