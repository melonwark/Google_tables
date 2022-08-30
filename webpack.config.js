const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
function shortCutPatch(name) {
    return path.resolve(__dirname, name)
}
const ESLintPlugin = require('eslint-webpack-plugin')


const isProd = process.env.NODE_ENV === 'production'
const isDev = !isProd
console.log('is prod', isProd);

module.exports = {
    context: shortCutPatch('src'),
    mode: 'development',
    entry: [
        '@babel/polyfill',
        './app.js'],
    output: {
        filename: isProd ? 'bundle.[hash].js' : 'bundle.js',
        path: shortCutPatch('distr')
    },
    resolve: {
        extensions: ['.js'],
        alias: {
            '@': shortCutPatch('src'),
            '@core': shortCutPatch('src/core')
        }
    },
    plugins: [
        new ESLintPlugin(
            {
                extensions: ['js']
            }
        ),
        new CleanWebpackPlugin(),
        new HTMLWebpackPlugin({
            template: 'index.html'
        }),
        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(__dirname, 'src/favicon.ico'),
                    to: path.resolve(__dirname, 'distr')
                }
            ]
        }),
        new MiniCssExtractPlugin({
            filename: isProd ? 'bundle.[hash].css' : 'bundle.css'
        })
    ],
    devtool: isDev ? 'source-map' : false,
    devServer: {
        port: 4200,
        hot: isDev
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader",
                ],
            },
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    }

}
