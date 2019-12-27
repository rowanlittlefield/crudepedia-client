const path = require('path');

module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "@": "./src",
      }
    }],
    [path.resolve('./my-babel-graphql-plugin/index.js'), { extensions: '.gql' }],
  ],
}
