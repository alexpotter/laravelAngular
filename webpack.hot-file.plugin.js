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
            fs.mkdir(compiler.options.output.publicPath, function(err) {
                fs.writeFile(
                    path.join(compiler.options.output.path, 'hot'),
                    this.options.host,
                    function(err) {
                        if (err) throw err
                    },
                )
            }.bind(this))
        }
    }
}

module.exports = WebpackHotPlugin
