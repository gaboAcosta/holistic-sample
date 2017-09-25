
const config = require('../config')

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
                }, (errValidate, { user }) => {
                    if(errValidate)  return cb(errValidate);
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
