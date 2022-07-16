const { defineConfig } = require("@vue/cli-service")
const ZipPlugin = require("zip-webpack-plugin")
const path = require("path")
const { HotReload } = require("./plugins")

const isDev = process.env.NODE_ENV !== "production"

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
    config.plugins.delete("html")
    config.plugins.delete("preload")
    config.plugins.delete("prefetch")

    config.resolve.alias.set("~", path.resolve("extension/services"))

    if (!isDev) {
      config.plugin("zip").use(ZipPlugin, [
        {
          path: "../",
          filename: "dist.zip",
        },
      ])
    }

    config.entry("services").add(`./extension/services/index.ts`)

    config.plugin("copy").tap((args) => {
      args[0].patterns.push({
        from: "extension/manifest.json",
        transform(content) {
          const VERSION = require("./package.json").version
          const REVISION = require("child_process").execSync("git rev-list --count HEAD").toString().trim()
          const version = isDev ? `${VERSION}.${REVISION}` : VERSION

          let manifest = JSON.parse(content.toString())
          manifest.version = version
          manifest.version_name = version

          if (isDev) manifest.permissions = [...(manifest.permissions || []), "tabs"]

          return Buffer.from(JSON.stringify(manifest, null, 2))
        },
      })

      return args
    })

    if (isDev) {
      config.plugin("HotReload").use(new HotReload())
      config.entry("app").add("./plugins/HotReload/content.js")
      config.entry("services").add("./plugins/HotReload/service.js")
    }

    config.optimization.delete("splitChunks")

    config.devtool(isDev ? "inline-source-map" : false)

    return config
  },
})
