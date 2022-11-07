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

    config.module
      .rule("markdown")
      .test(/\.md$/)
      .use("html-loader")
      .loader("html-loader")
      .end()
      .use("markdown-loader")
      .loader("markdown-loader")
      .end()

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

          let manifest = JSON.parse(content.toString())
          manifest.version = VERSION
          manifest.version_name = VERSION

          if (isDev) manifest.permissions = [...(manifest.permissions || []), "tabs"]

          return Buffer.from(JSON.stringify(manifest, null, 2))
        },
      })

      return args
    })

    if (isDev) {
      config.plugin("HotReload").use(new HotReload())
      config.entry("app").prepend("./plugins/HotReload/content.js")
      config.entry("services").prepend("./plugins/HotReload/service.js")
    }

    config.optimization.delete("splitChunks")

    config.devtool(isDev ? "inline-source-map" : false)

    return config
  },
})
