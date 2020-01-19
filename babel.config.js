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
    ["import-graphql-string", { trim: true }],
  ],
}
