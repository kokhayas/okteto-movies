module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(css|jpg|png)$': '<rootDir>/jest.mock.js',
  },
};
