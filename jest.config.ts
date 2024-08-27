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
  coveragePathIgnorePatterns: ['<rootDir>/e2e-testing'],
  modulePathIgnorePatterns: ['<rootDir>/e2e-testing'],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};
