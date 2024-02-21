module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  plugins: [
    'jsdoc'
  ],
  extends: [
    'standard',
    '@lnu'
  ],
  overrides: [
    {
      env: {
        node: true
      },
      files: [
        '.eslintrc.{js,cjs,ejs}'
      ]
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  rules: {
    'require-jsdoc': ['error', {
      require: {
        FunctionDeclaration: true,
        MethodDefinition: true,
        ClassDeclaration: true, // Set to true if you want to enforce JSDoc for class declarations
        ArrowFunctionExpression: true, // Set to true if you want to enforce JSDoc for arrow functions
        FunctionExpression: true // Set to true if you want to enforce JSDoc for function expressions
      }
    }],
    'no-unused-expressions': 'error'
  },
  ignorePatterns: [
    'build/',
    'doc/',
    'dist/',
    'node_modules'
  ]
}
