import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import playwright from 'eslint-plugin-playwright';
import tsParser from '@typescript-eslint/parser';

export default tseslint.config(
  {
    ignores: ['node_modules', 'logs', 'playwright-report', 'eslint.config.mjs'],
  },
  ...tseslint.configs.stylistic,
  {
    files: ['**/*.ts'],
    plugins: {
      prettier: eslintPluginPrettierRecommended,
      playwright,
    },
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
      },
    },
    extends: [eslint.configs.recommended, ...tseslint.configs.recommended],
    rules: {
      'import/prefer-default-export': 'off',
      'import/extensions': 'off',
      'import/no-unresolved': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'no-console': 'off',
      'class-methods-use-this': 'off',
      'max-classes-per-file': 'off',
      'no-useless-constructor': 'off',
      'no-empty-function': 'off',
      'func-names': 'off',
      'import/no-extraneous-dependencies': 'off',
      '@typescript-eslint/consistent-type-definitions': 'off',
      'no-empty-pattern': 'off',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/await-thenable': 'error',
    },
  },
  // Playwright ESlint config
  {
    files: ['src/tests/**'],
    rules: {
      'playwright/no-standalone-expect': 'off',
      'playwright/expect-expect': 'warn',
      'playwright/no-wait-for-timeout': 'error',
      'playwright/missing-playwright-await': 'error',
      'playwright/no-element-handle': 'warn',
      'playwright/expect-expect': 'off',
    },
  },
);
