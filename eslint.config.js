import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'node_modules', '*.config.js']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      // Error on unused vars for cleaner code
      'no-unused-vars': ['error', { 
        varsIgnorePattern: '^[A-Z_]',
        argsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_'
      }],
      // Prefer const for immutability
      'prefer-const': 'error',
      // No console in production code
      'no-console': ['warn', { allow: ['error', 'warn'] }],
      // React best practices
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // Import organization
      'no-duplicate-imports': 'error',
      // Performance
      'no-var': 'error',
      'object-shorthand': 'error',
    },
  },
  // Stricter rules for source files
  {
    files: ['src/**/*.{js,jsx}'],
    rules: {
      // Enforce prop-types or TypeScript (when we add it)
      'react/prop-types': 'off', // Disabled since we're using modern React
    }
  }
])
