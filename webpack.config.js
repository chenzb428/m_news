const { resolve } = require('path');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        minimize: false
    },
    entry: {
        index: resolve(__dirname, './src/js/index.js'),
        detail: resolve(__dirname, './src/js/detail.js'),
        collections: resolve(__dirname, './src/js/collections.js')
    },
    output: {
        path: resolve(__dirname, './dist'),
        filename: 'js/[name].js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: resolve(__dirname, 'node_modules'),
                query: {
                    'presets': ['latest']
                }
            },
            {
                test: /\.tpl$/,
                loader: 'ejs-loader'
            },
            {
                test: /\.css$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugin: function() {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    'style-loader',
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugin: function() {
                                return [autoprefixer('last 5 versions')]
                            }
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(png|jpg|jpeg|gif|ico|woff|eot|svg|ttf)$/i,
                loaders: 'url-loader?limit=1024&name=img/[name]-[hash:16].[ext]'
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: resolve(__dirname, 'src/index.html'),
            title: '新闻头条',
            chunks: ['index'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'detail.html',
            template: resolve(__dirname, 'src/detail.html'),
            title: '新闻详情',
            chunks: ['detail'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'collections.html',
            template: resolve(__dirname, 'src/collections.html'),
            title: '我的新闻',
            chunks: ['collections'],
            chunksSortMode: 'manual',
            excludeChunks: ['node_modules'],
            hash: true,
            minify: {
                removeComments: true,
                collapseWhitespace: true
            }
        })
    ],
    devServer: {
        watchOptions: {
            ignored: /node_modules/
        },
        proxy: {
            "/api": {
              target: "http://v.juhe.cn",
              changeOrigin: true,
              pathRewrite: {
                "^/api": ''
              }
            }
        },
        open: true,
        host: 'localhost',
        port: 3000
    }
}