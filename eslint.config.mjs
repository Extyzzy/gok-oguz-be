// @ts-check
import eslint from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import globals from 'globals';
import tseslint from 'typescript-eslint';
import eslintPluginUnicorn from 'eslint-plugin-unicorn';

export default tseslint.config(
  // Base ignores
  {
    ignores: [
      'eslint.config.mjs',
      'dist/**',
      'node_modules/**',
      'coverage/**',
      '**/*.d.ts',
      'jest.config.js',
      'test/**',
    ],
  },

  // Core ESLint recommendations
  eslint.configs.recommended,

  // TypeScript recommendations
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.jest,
      },
      parserOptions: {
        project: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },

  // Prettier integration (must come after other configs)
  eslintPluginPrettierRecommended,

  // Unicorn plugin for additional best practices
  {
    plugins: {
      unicorn: eslintPluginUnicorn,
    },
    rules: {
      ...eslintPluginUnicorn.configs.recommended.rules,
      'unicorn/prefer-module': 'off',
      'unicorn/filename-case': [
        'error',
        {
          cases: {
            camelCase: true,
            pascalCase: true,
          },
        },
      ],
    },
  },

  // Custom rule overrides for NestJS
  {
    rules: {
      // TypeScript rules
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/no-unsafe-argument': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/require-await': 'warn',
      '@typescript-eslint/await-thenable': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],

      // NestJS-specific patterns
      '@typescript-eslint/explicit-function-return-type': [
        'warn',
        {
          allowExpressions: true,
          allowHigherOrderFunctions: true,
        },
      ],
      'class-methods-use-this': 'off', // Disabled for NestJS services/controllers
      'max-classes-per-file': 'off', // Allow multiple classes in modules
      'padding-line-between-statements': [
        'error',
        { blankLine: 'always', prev: '*', next: 'return' },
        { blankLine: 'always', prev: ['const', 'let', 'var'], next: '*' },
        {
          blankLine: 'any',
          prev: ['const', 'let', 'var'],
          next: ['const', 'let', 'var'],
        },
      ],
    },
  },
);
