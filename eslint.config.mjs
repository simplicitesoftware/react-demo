import js from '@eslint/js';
import globals from 'globals';
import react from '@eslint-react/eslint-plugin';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ["**/*.{js,jsx}"],
    extends: [
      js.configs.recommended,
      react.configs.recommended,
      reactHooks.configs.flat["recommended-latest"],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      globals: globals.browser,
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {
      'indent': ['error', 2],
      'quotes': ['error', 'single'],
      'semi': ['error', 'always'],
      'no-multiple-empty-lines': ['error', { max: 1 }],
      'no-multi-spaces': 'error',
      'no-trailing-spaces': ['error', { skipBlankLines: false }],
      'no-console': 'error',
      'no-debugger': 'error'
    }
  }
]);
