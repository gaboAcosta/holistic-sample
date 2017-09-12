const Hapi = require('hapi')
const Good = require('good')
const Inert = require('inert')
const _ = require('lodash')
const Hoek = require('hoek');

const server = new Hapi.Server()
const chairoSetup = require('./setup/chairoSetup')
const mainViewConfig = require('./setup/mainView')
const jwtSchemeSetup = require('./setup/jwtScheme') 
const validateJWTSetup = require('./setup/validateJWT')
const HapiSwagger = require('./setup/hapiSwagger')

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

const mainPlugins = [
    chairoSetup,
    validateJWTSetup,
    jwtSchemeSetup,
    Inert,
    HapiSwagger,
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
]

const appPlugins = require('./setup/plugins.js')
const plugins = _.concat(mainPlugins, appPlugins, [mainViewConfig])

server.register(plugins, (errorRegister) => {

    if (errorRegister) return server.log(['error'], errorRegister)

    return server.start(() => {
        require('./setup/errorHandling')(server)
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
