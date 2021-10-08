// vue.config.js
const path = require('path')

module.exports = {
  css: {
    loaderOptions: {
      stylus: {
        use: [
          require('nib')(),
        ],
        import: [
          path.resolve(__dirname, './app/client/styles/main.styl')
        ],
      },
    },
  },
};
