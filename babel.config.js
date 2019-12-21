const path = require('path');

module.exports = {
  presets: [
    '@vue/app'
      ],
  plugins: [
    [path.resolve('./my-babel-graphql-plugin/index.js'), { extensions: '.gql' }],
  ],
}
