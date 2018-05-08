const path = require('path')
const axios = require('axios')
const proxy = require('http-proxy-middleware') // express代理中间件
const webpack = require('webpack')
const MemoryFs = require('memory-fs') // 内存中读取文件
const ReactDomServer = require('react-dom/server')

const serverConfig = require('../../build/webpack.config.server')

const getTemplate = () => {
    return new Promise((resolve, reject) => {
        axios.get('http://localhost:8888/public/index.html')
            .then(res => {
                resolve(res.data)
            })
            .catch(reject)
    })
}

const Module = module.constructor  // 拿到mldule的构造方法，用于解析bundle字符串为js可执行文件

const mfs = new MemoryFs

const serverCompiler = webpack(serverConfig)
serverCompiler.outputFileSystem = mfs // webpack提供的配置项,从内存读写
let serverBundle
serverCompiler.watch({}, (err, stats) =>{
    if(err) throw err
    stats = stats.toJson()
    stats.errors.forEach(err => console.error(err))
    stats.warnings.forEach(warn => console.warn(warn))

    const bundlePath = path.join(
        serverConfig.output.path,
        serverConfig.output.filename
    )
    const bundle = mfs.readFileSync(bundlePath, 'utf8') // 此时bundle只是字符串，不能以js格式运行
    const m = new Module()
    m._compile(bundle, 'server-entry.js') // 注意第二个参数需要指定文件的名字，容易遗漏
    serverBundle = m.exports.default
})

module.exports = function(app){
    app.use('/public', proxy({
        target: 'http://localhost:8888'
    })) // 将 /public 开头的文件全都代理到 localhost:8888 端口的服务

    app.get("*", function(req, res){
        getTemplate().then(template => {
            const content = ReactDomServer.renderToString(serverBundle)
            res.send(template.replace('<!-- app -->', content))
        })
    })
}