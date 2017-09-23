
const senecaConstructor = require('seneca')
const serverConfig = require('../config')
const Boom = require('boom')

class SenecaFactory {

    constructor(testing=false){
        this.testing = testing
    }

    setClient(client){
        this.client = client
    }

    setVerbose(verbose=true){
        this.verbose = verbose
    }

    getClient(reply){
        const { env } = serverConfig
        const defaultConfig = {
            log: 'silent',
        }
        const client = this.testing ? this.client :  senecaConstructor(defaultConfig)
        const host = serverConfig.mainServiceHost

        // when running our tests we want to do it in isolation so that we can
        // make sure that we are handling client errors
        if(!this.testing){
            console.log('======== Connecting to  main service on host:', host)
            client
                .client({
                    type: 'http',
                    host,
                    port: 8000,
                    pin: 'src:main',
                })
        }

        this.errorHandler(client, reply)

        return client
    }

    errorHandler(client, reply){
        client.error(function(error){
            console.log(error)
            return reply(Boom.internal(error));
        })
    }

}

module.exports = SenecaFactory