module.exports = {
  presets: [
    '@vue/app'
  ],
  plugins: [
    ["import-graphql-string", {
      aliases: {
        '@': './src',
      },
      stripIgnoredCharacters: true,
      includeTypeNames: true,
    }],
  ],
}
