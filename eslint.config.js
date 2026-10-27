import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'

export default [
  { ignores: ['dist', 'coverage', 'public/pyodide', 'test-results', 'playwright-report'] },
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, __PYODIDE_VERSAO__: 'readonly' },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      // Sem eslint-plugin-react, componentes usados só em JSX parecem "não usados".
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]', argsIgnorePattern: '^_' }],
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  },
  {
    files: ['src/**/*.worker.js', 'src/**/worker.js'],
    languageOptions: { globals: { ...globals.worker } },
  },
  {
    files: ['*.config.js', 'scripts/**/*.js', 'tests/**/*.js', 'src/**/*.test.{js,jsx}'],
    languageOptions: { globals: { ...globals.node } },
  },
]
