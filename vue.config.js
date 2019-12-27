module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.gql'],
    },
  },
  css: {
    loaderOptions:{
      sass: {
        data: `
          @import "@/styles/base/_module.scss";
        `,
      },
    },
  },
};