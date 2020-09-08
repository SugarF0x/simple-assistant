const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const VERSION = require('./package.json').version;

module.exports = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 300,
    ignored: [
      /node_modules/
    ]
  },
  entry: path.resolve(__dirname, 'src/assets/index.ts'),
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
    ]
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: 'src/static',
          transform(content, path) {
            if (path.indexOf('manifest') !== -1) {
              let manifest = JSON.parse(content.toString());
                  manifest.version = VERSION;
                  manifest.version_name = 'IN-DEV';
              return Buffer.from(JSON.stringify(manifest));
            }
            return content;
          },
        }
      ],
    })
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
  },
};