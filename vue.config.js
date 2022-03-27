const { defineConfig } = require("@vue/cli-service")

const VERSION = require("./package.json").version
const REVISION = require("child_process").execSync("git rev-list --count HEAD").toString()

const version = process.env.NODE_ENV === "production" ? VERSION : `${VERSION}.${REVISION}`

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: false,
  chainWebpack: (config) => {
    // TODO:
    //  * add manifest
    //  * add hot extension reload

    config.plugins.delete("html")
    config.plugins.delete("preload")
    config.plugins.delete("prefetch")

    return config
  },
})
