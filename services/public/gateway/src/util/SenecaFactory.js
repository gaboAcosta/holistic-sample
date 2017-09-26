
const senecaConstructor = require('seneca')
const serverConfig = require('../config')
const Boom = require('boom')

class SenecaFactory {

    constructor(server, testing=false){
        this.server = server
        this.testing = testing
    }

    setClient(client){
        this.client = client
    }

    setVerbose(verbose=true){
        this.verbose = verbose
    }

    getClient(){

        const defaultConfig = {
            log: 'info+,type:act',
            fixedargs: {fatal$:false},
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

        client.error((error) => {
            if(!error.isBoom){
                console.log('===== UNEXPECTED ERROR IN SENECA SERVICE =====')
                console.log(error)
                console.log('===== UNEXPECTED ERROR IN SENECA SERVICE =====')
            }
        })

        return client
    }

}

module.exports = SenecaFactory