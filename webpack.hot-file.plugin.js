const path = require('path')
const fs = require('fs')

function WebpackHotPlugin(options) {
    this.options = options || {}
}

WebpackHotPlugin.prototype.apply = function(compiler) {
    if (this.options.disabled) return

    if (compiler.options.devServer) {
        const server = compiler.options.devServer

        if (server.hot) {
            const http = compiler.options.devServer.https ? 'https' : 'http'
            const contents = http + '://' + server.host + ':' + server.port

            fs.mkdir(compiler.options.output.path, function(err) {
                fs.writeFile(
                    path.join(compiler.options.output.path, 'hot'),
                    contents,
                    function(err) {
                        if (err) throw err
                    },
                )
            })
        }
    }
}

module.exports = WebpackHotPlugin
