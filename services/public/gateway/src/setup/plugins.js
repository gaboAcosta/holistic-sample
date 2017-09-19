const Glob = require('glob')

const plugins = []

Glob.sync('../api/**/!(*.spec.js)', {
    realpath: true,
    cwd: __dirname,
})
    .filter((file) => {
        return /\.js/.test(file)
    })
    .forEach((file) => {
        plugins.push(require(file))
    })

module.exports = plugins
