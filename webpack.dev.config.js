const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const VERSION = require('./package.json').version;
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: [
      /node_modules/
    ]
  },
  entry: path.resolve(__dirname, 'src/assets/rewrite.ts'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: "index.js"
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.vue?$/,
        use: 'vue-loader',
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new CopyPlugin({
      patterns: [
        {
          from: 'src/static',
          globOptions: {
            ignore: ['**/dev/**'],
          },
          transform(content, path) {
            if (path.indexOf('manifest') !== -1) {
              let manifest = JSON.parse(content.toString());
                  manifest.version = VERSION;
                  manifest.version_name = VERSION + ' IN-DEV';
                  manifest.background = { scripts: ["lib/hot-reload.js"] };
              return Buffer.from(JSON.stringify(manifest));
            }
            return content;
          },
        },
        {
          from: 'src/static/dev'
        }
      ],
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};
