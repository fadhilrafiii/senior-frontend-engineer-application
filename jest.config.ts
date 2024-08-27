export default {
  preset: 'ts-jest',
  testEnvironment: 'jest-environment-jsdom',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
    // process `*.tsx` files with `ts-jest`
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coverageProvider: 'v8',
  moduleNameMapper: {
    '^@(components|libs)(.*)$': '<rootDir>/src/$1$2',
  },
  coveragePathIgnorePatterns: ['/_tests_/'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
