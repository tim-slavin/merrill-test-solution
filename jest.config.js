module.exports = {
  projects: [
    {
      displayName: 'test',
      setupFilesAfterEnv: [
        '<rootDir>/test/setup.js'
      ],
      testMatch: ['<rootDir>/test/**/*test.js'],
      modulePathIgnorePatterns: [
        '<rootDir>/.*/__mocks__'
      ]
    },
    {
      runner: 'jest-runner-eslint',
      verbose: false,
      displayName: 'lint',
      testMatch: ['<rootDir>/lib/**/*.js', '<rootDir>/test/**/*.js'],
      modulePathIgnorePatterns: [
        '<rootDir>/.*/__mocks__'
      ]
    }
  ],
  collectCoverage: true,
  coverageReporters: [
    'text-summary',
    'html',
    'lcov'
  ]
};
