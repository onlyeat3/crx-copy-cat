module.exports = {
  filenameHashing: false,
  lintOnSave: false,
  pages: {},
  pluginOptions: {
    browserExtension: {
      components: {
        contentScripts: true
      },
      componentOptions: {
        contentScripts: {
          entries: {
            'content-embed': [
              'src/content-scripts/content-script.js'
            ]
          }
        }
      },
      manifestTransformer: (manifest) => {
        delete manifest.content_security_policy
        // manifest.content_security_policy = {
        //  "extension_pages": manifest.content_security_policy.replace('script-src', 'script-src-elem http://localhost:8098')
        // }
        return manifest;
      }
    }
  },
  configureWebpack: {
    devtool: "true",
  }
}
