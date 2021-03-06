const CopyPlugin = require('copy-webpack-plugin');
const CssExtractPlugin = require('mini-css-extract-plugin');
const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const request = require('request');

let VERSION = require('./package.json').version;

try {
  request.get({
      url: 'https://api.github.com/repos/SugarF0x/simple-assistant/stats/contributors',
      headers: {
        'User-Agent': 'SugarF0x'
      }
    }, (err, res, body) => {
      VERSION += '.' + JSON.parse(body)[0].total;
    }
  )
} catch {
  console.log('There was an error fetching commits from GitHub');
  VERSION += '.' + '0';
}

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
  stats: {
    // minimal
    all: false,
    modules: true,
    maxModules: 0,
    errors: true,
    warnings: true,
    // extend
    timings: true,
    builtAt: true
  },
  target: "web",
  module: {
    rules: [
      {
        test: /\.ts$/,
        loader: 'ts-loader',
        options: {
          appendTsSuffixTo: [/\.vue$/]
        }
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.less$/,
        use: [
          CssExtractPlugin.loader,
          'css-loader',
          'less-loader'
        ],
      }
    ]
  },
  plugins: [
    new CssExtractPlugin({
      filename: 'styles.css'
    }),
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
    }),
    new VueLoaderPlugin()
  ],
  resolve: {
    extensions: [ '.tsx', '.ts', '.js', '.vue'],
  },
};
