module.exports = {
  env: {
    node: true,
    es2021: true,
    mocha: true
  },
  extends: [
    'eslint:recommended'
  ],
  parserOptions: {
    ecmaVersion: 12,
    sourceType: 'module'
  },
  rules: {
    'indent': ['error', 2],
    'linebreak-style': ['error', 'unix'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'no-unused-vars': ['error', { 'argsIgnorePattern': '^_' }],
    'no-console': ['warn'],
    'no-debugger': ['error']
  },
  ignorePatterns: [
    'node_modules/',
    'coverage/',
    'dist/'
  ]
};
