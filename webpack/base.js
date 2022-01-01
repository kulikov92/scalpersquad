import {
    isDevServer,
    isProd
} from './utils/env.js'
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin'
import HtmlWebpackPlugin from 'html-webpack-plugin'
import webpack from 'webpack'
import { fileURLToPath } from 'url';
import {
    dirname,
    resolve
} from 'path'
import { TsconfigPathsPlugin } from 'tsconfig-paths-webpack-plugin'
import { url } from './conf/server.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const extensions = [
    '.tsx',
    '.ts',
    '.js',
    '.css',
    '.json'
]

export default {
    mode: isProd ? 'production' : 'development',
    entry: './src/index.tsx',
    target: 'web',
    output: {
        path: resolve(__dirname, '../build'),
        filename: isProd ? '[name].[contenthash].js' : '[name].[fullhash].js',
        chunkFilename: isProd ? '[name].[contenthash].js' : '[name].[chunkhash].js',
        publicPath: isDevServer ? url : './'
    },
    module: {
        rules: [
            {
                test: /\.(ts|js)x?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            "@babel/preset-env",
                            "@babel/preset-react",
                            "@babel/preset-typescript",
                        ]
                    }
                }
            },
            {
                test: /\.(html)$/,
                use: {
                    loader: 'html-loader',
                }
            },
            {
                test: /\.(jpe?g|svg|png|gif|bmp|mp3|mp4|ogg|wav|eot|ttf|woff|woff2)$/,
                use: 'file-loader'
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new ForkTsCheckerWebpackPlugin({
            async: false,
            eslint: {
                files: './src/**/*',
            }
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: resolve(__dirname, '../src/index.html'),
        }),
        new webpack.ProvidePlugin({
            React: 'react'
        })
    ],
    resolve: {
        plugins: [
            new TsconfigPathsPlugin({
                configFile: resolve(__dirname, '../tsconfig.json'),
                extensions
            })
        ],
        aliasFields: ['browser'],
        extensions
    },
    optimization: {
        runtimeChunk: true,
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendor',
                    chunks: 'initial',
                },
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    chunks: 'all',
                    filename: isProd ? 'vendor.[contenthash].js' : 'vendor.[hash].js',
                    priority: -10
                }
            },
        }
    }
}