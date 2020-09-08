// const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
    watchOptions: {
        aggregateTimeout: 300,
        ignored: [
            /node_modules/
        ]
    },
    entry: path.resolve(__dirname, 'src/assets/index.ts'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "js/[name].bundle.js"
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
    // plugins: [
    //     new CopyPlugin([
    //         {
    //             from: 'src/img',
    //             to: 'img/[path][name].[ext]',
    //             toType: 'template'
    //         }
    //     ])
    // ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
};