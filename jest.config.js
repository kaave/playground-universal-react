module.exports = {
  testURL: 'http://localhost',
  rootDir: 'src/',
  moduleFileExtensions: ['tsx', 'ts', 'js', 'json'],
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    '.+\\.(css|styl|less|sass|scss)$': '<rootDir>/../node_modules/jest-css-modules-transform',
  },
  testRegex: '\\.spec\\.(ts|tsx)$',
  moduleNameMapper: {
    '^~/(.*)': '<rootDir>/$1',
  },
  setupTestFrameworkScriptFile: 'jest-enzyme',
  testEnvironment: 'enzyme',
  testEnvironmentOptions: {
    enzymeAdapter: 'react16',
  },
  collectCoverage: true,
  collectCoverageFrom: ['src/**/*.ts', 'src/**/*.tsx', '!src/**/*.css', '!src/**/*.stories.*', '!src/**/*.d.ts'],
};
