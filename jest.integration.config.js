module.exports = {
  projects: [{
    displayName: 'test',
    globalSetup: '<rootDir>/integration-tests/setup/global-setup.js',
    globalTeardown: '<rootDir>/integration-tests/setup/global-teardown.js',
    setupFilesAfterEnv: ['<rootDir>/integration-tests/setup/setup.js'],
    testMatch: ['<rootDir>/integration-tests/test/**/*.js'],
    modulePathIgnorePatterns: [
      '<rootDir>/.*/__mocks__'
    ]
  },
  {
    runner: 'jest-runner-eslint',
    verbose: false,
    displayName: 'lint',
    testMatch: ['<rootDir>/integration-tests/**/*.js'],
    modulePathIgnorePatterns: [
      '<rootDir>/.*/__mocks__'
    ]
  }],
  collectCoverage: false
};
