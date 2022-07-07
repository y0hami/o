const path = require('node:path')

module.exports = {
  testEnvironment: 'node',
  rootDir: '../../',
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/configs/tsconfigs/tsconfig.test.json'
    }
  },
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.js$': ['babel-jest', { configFile: path.resolve(__dirname, '../babel.js') }]
  },
  transformIgnorePatterns: [
    'node_modules/(?!dot\\-prop)/'
  ],
  collectCoverage: true,
  collectCoverageFrom: ['./packages/**/*.ts'],
  coverageReporters: ['json', 'lcov', 'text'],
  coveragePathIgnorePatterns: ['dist', 'node_modules']
}
