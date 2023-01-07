module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir : __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['.eslintrc.js'],
  rules: {
    "prettier/prettier": ["error", { "endOfLine": "auto" }],
    "linebreak-style": ["error", (process.platform === "win32" ? "windows" : "unix")],
    'eol-last': ['error', 'always'],
    'no-plusplus': 'off',
    'operator-linebreak': ['error', 'after', { overrides: { '?': 'before', ':': 'before' } }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'prefer-destructuring': 'off',
    'arrow-parens': ['error', 'always'],
    'arrow-body-style': 'off',
    'object-curly-newline': 'off',
    'no-use-before-define': 'off',
    'no-shadow': 'off',
    'space-before-function-paren': ['error', { anonymous: 'always', named: 'never', asyncArrow: 'always' }],
    'no-restricted-syntax': 'off',
    camelcase: 'off',
    'no-continue': 'off',
    'import/prefer-default-export': 'off',
    'import/no-unresolved': 'off',
    'react/display-name': 'off',
    'consistent-return': 'off',
    'function-paren-newline': ['error', 'consistent'],
    'quote-props': 0,
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'import/extensions': 0,
    'import/no-extraneous-dependencies': 'off',
    'padded-blocks': ['error', 'never'],
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    'no-param-reassign': ['error', { props: true, ignorePropertyModificationsFor: ['store', 'acc', 'req', 'res'] }],
    semi: 'off',
    '@typescript-eslint/semi': ['error', 'always'],
    'comma-dangle': 'off',
    '@typescript-eslint/comma-dangle': ['error', 'always-multiline'],
    '@typescript-eslint/member-delimiter-style': 'error',
    '@typescript-eslint/no-explicit-any': ['error'],
    '@typescript-eslint/consistent-generic-constructors': 'error',
    '@typescript-eslint/naming-convention': [
      'error',
      { selector: 'variable', format: ['camelCase', 'PascalCase', 'UPPER_CASE'] },
      { selector: 'class', format: ['PascalCase'] },
      { selector: 'enum', format: ['PascalCase'], suffix: ['ENUM'] },
      { selector: 'interface', format: ['PascalCase'], prefix: ['I'] },
      { selector: 'typeAlias', format: ['PascalCase'], suffix: ['Type'] }
    ],
    '@typescript-eslint/await-thenable': 'error',
    indent: 'off',
    '@typescript-eslint/indent': ['error', 2, {
      ignoredNodes: [
        'FunctionExpression > .params[decorators.length > 0]',
        'FunctionExpression > .params > :matches(Decorator, :not(:first-child))',
        'ClassBody.body > PropertyDefinition[decorators.length > 0] > .key'
      ]
    }],
    '@typescript-eslint/consistent-type-imports': 'error'
  },
};
