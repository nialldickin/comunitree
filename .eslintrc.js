module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'standard',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  plugins: ['react', '@typescript-eslint', 'prettier'],
  rules: {
    'prettier/prettier': ['error'],
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',
    camelcase: 'off'
  },
  overrides: [
    {
      files: ['graphql.d.ts'],
      rules: {
        camelcase: 'off',
        'no-unused-vars': 'off'
      }
    }
  ],
  settings: {
    react: {
      version: 'detect'
    }
  }
};
