module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: './backend/tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: [
    '.eslintrc.js',
    'dist',
    'node_modules',
    'webpack.config.js',
    'jest.config.js',
  ],
};
