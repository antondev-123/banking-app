module.exports = {
    preset: 'next/jest',  // To handle Next.js-specific testing
    testEnvironment: 'jsdom',
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1',  // Adjust import paths if necessary
    },
    transform: {
      '^.+\\.(ts|tsx)$': 'ts-jest',  // To transform TypeScript files
    },
    setupFilesAfterEnv: ['@testing-library/jest-dom/extend-expect'],
  };
  