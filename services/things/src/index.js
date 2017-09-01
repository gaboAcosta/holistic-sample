const Hapi = require('hapi')
const Chairo = require('chairo')
const Good = require('good')
const _ = require('lodash')

const server = new Hapi.Server()

server.connection({ port: 3000, host: 'localhost' })

const mainPlugins = [
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
        options: {
            log: 'info+,type:act',
        },
    },
]

// App Plugins
const appPlugins = require('./config/plugins.js')
const plugins = _.concat(mainPlugins, appPlugins)

server.register(plugins, (errorRegister) => {

    if (errorRegister) return server.log(['error'], errorRegister)

    return server.start(() => {

        server.seneca.listen({
            type: 'http',
            port: 8000,
            pin: 'things',
            timeout: 5000,
        })

        server.log(['info'], `Seneca client running at: ${server.info.host}`)
        server.log(['info'], `Server running at: ${server.info.uri}`)
    })

})
