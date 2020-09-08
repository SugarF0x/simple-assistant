const CopyPlugin = require('copy-webpack-plugin');
const path = require('path');

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
                { from: 'src/static' }
            ],
        })
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
};