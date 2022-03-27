const { defineConfig } = require("@vue/cli-service")

const VERSION = require("./package.json").version
const REVISION = require("child_process").execSync("git rev-list --count HEAD").toString()

const version = process.env.NODE_ENV === "production" ? VERSION : `${VERSION}.${REVISION}`

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  filenameHashing: false,
  css: {
    extract: {
      filename: "styles.css",
    },
  },
  chainWebpack: (config) => {
    // TODO:
    //  * add hot extension reload

    config.plugins.delete("html")
    config.plugins.delete("preload")
    config.plugins.delete("prefetch")

    config.plugin("copy").tap((args) => {
      args[0].patterns.push({
        from: "extension/manifest.json",
        transform(content) {
          let manifest = JSON.parse(content.toString())
          manifest.version = version
          manifest.version_name = version
          // manifest.background = { scripts: ["lib/hot-reload.js"] };

          return Buffer.from(JSON.stringify(manifest, null, 2))
        },
      })

      return args
    })

    return config
  },
})
