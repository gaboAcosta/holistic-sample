const Glob = require('glob')

const plugins = []

Glob.sync('../api/**/!(*.test.js)', {
    realpath: true,
    cwd: __dirname,
})
    .filter((file) => {

        return /\.js/.test(file)

    })
    .forEach((file) => {
        console.log(file)
        plugins.push(require(file)) // eslint-disable-line global-require
    })

module.exports = plugins
