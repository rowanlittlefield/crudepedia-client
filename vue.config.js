module.exports = {
  configureWebpack: {
    devtool: 'source-map',
    resolve: {
      extensions: ['.gql'],
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('graphql')
      .test(/\.gql$/)
      .use('graphql-tag/loader')
      .loader('graphql-tag/loader')
      .end();
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