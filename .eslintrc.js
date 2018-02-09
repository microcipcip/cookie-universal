module.exports = {
  root: true,
  parser: 'babel-eslint',
  env: {
    browser: true,
    node: true
  },
  extends: 'standard',
  rules: {
    // node specific
    'node/no-extraneous-require': 'error',
    // defaults
    'space-before-function-paren': ['error', {
      'anonymous': 'ignore',
      'named': 'ignore',
      'asyncArrow': 'ignore'
    }],
    'new-cap': 0,
    'comma-dangle': 0,
    'no-unused-vars': 0,
    'no-trailing-spaces': 0,
    'arrow-parens': 0,
    'spaced-comment': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  },
  globals: {
    'define': true,
    'it': true,
    'describe': true,
    'before': true,
    'after': true,
    'beforeEach': true,
    'afterEach': true,
  },
}
