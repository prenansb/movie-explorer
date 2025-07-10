import eslint from '@eslint/js'
import prettier from 'eslint-plugin-prettier/recommended'
import react from 'eslint-plugin-react'
import sonarjs from 'eslint-plugin-sonarjs'
import tsEslint from 'typescript-eslint'

export default tsEslint.config(
  sonarjs.configs.recommended,
  eslint.configs.recommended,
  tsEslint.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  prettier,
  { ignores: ['.next/*'] },
  {
    files: ['**/*.{mjs,js,ts,tsx}'],
    rules: {
      'sonarjs/no-duplicate-string': ['error', { threshold: 10 }],
      'prettier/prettier': [
        'warn',
        {
          plugins: ['@ianvs/prettier-plugin-sort-imports', 'prettier-plugin-tailwindcss'],
          tailwindFunctions: ['tw', 'twMerge', 'tv', 'cn'],
          importOrderMergeDuplicateImports: true,
          importOrderCombineTypeAndValueImports: true,
          importOrderSortSpecifiers: true,
          importOrderTypeScriptVersion: '5.1.3',
          importOrder: [
            '^(next/(.*)$)|^(next$)',
            '^(react/(.*)$)|^(react$)',
            '<THIRD_PARTY_MODULES>',
            '^~/(.*)$',
            '^[./]|^[..]',
          ],
          importOrderParserPlugins: ['typescript', 'jsx', 'decorators-legacy'],
          pluginSearchDirs: false,
          endOfLine: 'auto',
          arrowParens: 'avoid',
          singleQuote: true,
          tabWidth: 2,
          semi: false,
          printWidth: 90,
        },
      ],
      'import/no-anonymous-default-export': 'off',
      'react/prop-types': 'off',
    },
  },
)