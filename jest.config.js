module.exports = {
  preset: 'react-native',
  setupFilesAfterEnv: ['@testing-library/jest-native/extend-expect'],
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|@react-native-picker|@react-native-community|react-native-vector-icons|lottie-react-native|zustand)/)',
  ],
  // It might be necessary to explicitly transform some modules if they still cause issues
  // transform: {
  //   '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  //   // Add specific transformers here if needed, e.g., for specific node_modules
  // },
  moduleNameMapper: {
    // If you have path aliases in tsconfig.json, you might need to map them here
    // For example: "^@components/(.*)$": "<rootDir>/src/components/$1"
  },
  // Collect coverage from all .ts and .tsx files in src, excluding __tests__ and .d.ts
  collectCoverageFrom: [
    'src/**/*.{ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/__tests__/**/*.{ts,tsx}',
    '!src/**/index.{ts,tsx}', // Often boilerplate
  ],
  coveragePathIgnorePatterns: [
    '/node_modules/',
    'src/types/Types.ts', // Type definitions don't need coverage
    'src/navigation/AppNavigation.tsx', // Navigation setup can be harder to test effectively with unit tests
    'src/screens/Loging.screen.tsx', // Simple screen, potentially less critical for unit test coverage
  ],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'html'], // Added 'html' for better visualization
};
