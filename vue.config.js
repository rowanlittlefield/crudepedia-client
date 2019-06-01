module.exports = {
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