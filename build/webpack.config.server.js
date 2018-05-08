const path = require('path')
const webpackMerge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

module.exports = webpackMerge(baseConfig, {
    mode: 'production',
    target: 'node',
    entry: {
        app: path.join(__dirname, '../client/server-entry.js')
    },
    output: {
        filename: 'server-entry.js',
        libraryTarget: "commonjs2"
    }
})