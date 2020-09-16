const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');
const VERSION = require('./package.json').version;

  // TODO: UPDATE PRODUCTION CONFIG

module.exports = {
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
          globOptions: {
            ignore: ['**/dev/**'],
          },
          transform(content, path) {
            if (path.indexOf('manifest') !== -1) {
              let manifest = JSON.parse(content.toString());
                  manifest.version = VERSION;
                  manifest.version_name = VERSION;
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
