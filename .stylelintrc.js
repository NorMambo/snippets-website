export default {
  extends: [
    'stylelint-config-recommended'
  ],
  ignoreFiles: [
    '**/*.json',
    '**/*.min.css',
    'build/**/*.css',
    'dist/**/*.css',
    'doc/**/*.css',
    'node_modules/**/*.css'
  ]
}
