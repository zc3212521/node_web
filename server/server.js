const express = require('express')
const favicon = require('serve-favicon') // 处理favicon图标请求
const ReactSSR = require('react-dom/server')
const fs = require('fs')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

const app = express()

app.use(favicon(path.join(__dirname, '../favicon.ico')))

if(!isDev){ // 非开发环境
    const serverEntry = require('../dist/server-entry').default //commonjs 引入export default内容后面要加一个.default
    let template = fs.readFileSync(path.join(__dirname, '../dist/index.html'), 'utf8')

    app.use('/public', express.static(path.join(__dirname, '../dist')))

    app.get('*', function(req, res){
        const appString = ReactSSR.renderToString(serverEntry)
        template = template.replace('<!-- app -->', appString)
        res.send(template)
    })
}else{ // 开发环境，资源从webpack-dev-server中取到
    const devStatic = require('./util/dev-static')
    devStatic(app)
}

app.listen(3333, function(){
    console.log('server start on 3333')
})