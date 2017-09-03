const Hapi = require('hapi')
const Chairo = require('chairo')
const Good = require('good')
const _ = require('lodash')
const db = require('./setup/db')
const server = new Hapi.Server()

server.connection({ port: 3000, host: 'localhost' })

const mainPlugins = [
    db,
    {
        register: Good,
        options: {
            ops: {
                interval: 10000,
            },
            reporters: {
                console: [{
                    module: 'good-squeeze',
                    name: 'Squeeze',
                    args: [{
                        // ops: '*',
                        log: '*',
                        request: '*',
                        response: '*',
                        error: '*',
                    }],
                }, {
                    module: 'good-console',
                    args: [{
                        format: 'YYYY-MM-DDTHH:mm:ss.SSS[Z]',
                    }],
                }, 'stdout'],
            },
        },
    },
    {
        register: Chairo,
    },
]

// App Plugins
const appPlugins = require('./setup/plugins.js')
const plugins = _.concat(mainPlugins, appPlugins)

server.register(plugins, (errorRegister) => {

    if (errorRegister) return server.log(['error'], errorRegister)

    return server.start(() => {

        server.seneca.listen({
            type: 'http',
            port: 8000,
            pin: 'main',
            timeout: 5000,
        })

        server.log(['info'], `Seneca client running at: ${server.info.host}`)
        server.log(['info'], `Server running at: ${server.info.uri}`)
    })

})
