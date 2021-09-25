module.exports = {
  lintOnSave: false,
  pages: {},
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-scripts/content-script.js'
            ]
          }
        }
      }
    }
  }
}
