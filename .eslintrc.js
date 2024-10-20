module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin', 'unused-imports', 'simple-import-sort'],
  extends: ['plugin:@typescript-eslint/recommended'],
  root: true,
  env: {
    node: true
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    'import/prefer-default-export': 'off',
    'no-param-reassign': 'off',
    'prefer-destructuring': 'off',
    'class-methods-use-this': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    'import/no-extraneous-dependencies': 'off',
    'consistent-return': 'off',
    'import/no-named-as-default': 'off',
    'simple-import-sort/imports': ['error', {
      groups: [
        ['^\\u0000'],
        [`^(${require('module').builtinModules.join('|')})(/|$)`],
        ['^react', '^next', '^@?\\w', '^'],
        ['^@/\\w'],
        ['^\\.\\.(?!/?$)', '^\\.\\./?$'],
        ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'],
        ['^.+\\.styles$'],
      ],
    }],
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-shadow': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-empty-interface': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
  },
  settings: {
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
      },
    },
  },
  ignorePatterns: ['**/node_modules/**', 'graphql/**', '*.js', '*.jsx'],
};
