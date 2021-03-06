const path = require('path')
const webpack = require('webpack')
const webpackMerge = require('webpack-merge')
const HTMLPlugin = require('html-webpack-plugin')

const baseConfig = require('./webpack.config.base')

const isDev = process.env.NODE_ENV === "development"

const config = webpackMerge(baseConfig, {
    mode: 'development',
    entry: {
            app: path.join(__dirname, '../client/app.js')
        },
    output: {
        filename: '[name].[hash].js',
    },
    plugins: [
       new HTMLPlugin({
           template: path.join(__dirname, '../client/template.html')
       })
    ]
})

if(isDev){
    config.entry = { //热更替相关配置
        app: [
            'react-hot-loader/patch',
            path.join(__dirname, '../client/app.js')
        ]
    }
    config.devServer = {
        host: '0.0.0.0',
        port: '8888',
        contentBase: path.join(__dirname, '../dist'),
        hot: true, //热更替相关配置
        overlay: {
            errors: true
        },
        publicPath: '/public/',
        historyApiFallback: {
            index: '/public/index.html'
        }
    }
    config.plugins.push(new webpack.HotModuleReplacementPlugin()) //热更替相关配置
}

module.exports = config