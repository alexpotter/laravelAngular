import path from 'path'
import fs from 'fs'

export default class WebpackHotFilePlugin {
    options

    constructor(options) {
        this.options = options
    }

    apply = function (compiler) {
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
}
