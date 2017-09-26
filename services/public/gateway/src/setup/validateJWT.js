
const config = require('../config')
const Boom = require('boom')

const validateJWTMethod = {
    register: function (server, options, next) {

        server.dependency('senecaSetup')
        server.method({
            name: 'validateJWT',
            method: (token, cb) => {

                const client = server.seneca.getClient()
                client.act({
                    src: 'main',
                    service: 'auth',
                    cmd: 'validateToken',
                    token,
                }, (errValidate, response) => {
                    if(errValidate){
                        const boomError = errValidate.isBoom ? errValidate : Boom.internal(errValidate)
                        return cb(boomError)
                    }

                    if(!response) return cb(Boom.internal('No response received'))

                    const { user } = response
                    return cb(null, { user })
                })

            },
        })

        next();
    }
};

validateJWTMethod.register.attributes = {
    name: 'validateJWTMethod',
    version: '1.0.0'
};

module.exports = validateJWTMethod
