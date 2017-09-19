const Glob = require('glob')

const plugins = []

Glob.sync('../services/**/!(*.spec.js)', {
    realpath: true,
    cwd: __dirname,
})
    .filter((file) => {

        return /\.js/.test(file)

    })
    .forEach((file) => {

        plugins.push(require(file)) // eslint-disable-line global-require

    })

module.exports = plugins
