/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    '^orb-billing$': '<rootDir>/src/index.ts',
    '^orb-billing/_shims/auto/(.*)$': '<rootDir>/src/_shims/auto/$1-node',
    '^orb-billing/(.*)$': '<rootDir>/src/$1',
  },
  modulePathIgnorePatterns: ['<rootDir>/ecosystem-tests/', '<rootDir>/dist/', '<rootDir>/deno_tests/'],
};
