module.exports = {
  testURL: 'http://localhost',
  rootDir: 'src/',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  testRegex: '\\.spec\\.(ts|tsx)$',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/$1',
  },
  setupFilesAfterEnv: ['../node_modules/jest-enzyme/lib/index.js'],
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.scss', '!src/**/*.stories.*', '!src/**/*.d.ts'],
};
