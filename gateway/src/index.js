const Hapi = require('hapi')
const Chairo = require('chairo')
const Good = require('good')
const _ = require('lodash')
const server = new Hapi.Server()
const Hoek = require('hoek');
const mainViewConfig = require('./config/mainView')

server.connection({
    host: '0.0.0.0',
    port: '4000',
    routes: {
        timeout: {
            server: 3000, // 3 seconds is a lot of time
        },
        validate: {
            options: {
                stripUnknown: true
            }
        }
    }
})

const mainPlugins = [
    mainViewConfig,
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

const appPlugins = require('./config/plugins.js')
const plugins = _.concat(mainPlugins, appPlugins)

server.register(require('vision'), (err) => {

    Hoek.assert(!err, err);

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: __dirname,
        path: 'views'
    });

});

server.register(plugins, (errorRegister) => {

    console.log('server started')
    if (errorRegister) return server.log(['error'], errorRegister)

    return server.start(() => {

        console.log('server started')
        server.seneca
            .client({
                type: 'http',
                host: 'main',
                port: 8000,
                pin: 'src:main',
            })

        server.log(['info'], `Seneca client running at: ${server.info.host}`)
        server.log(['info'], `Server running at: ${server.info.uri}`)
    })

})
