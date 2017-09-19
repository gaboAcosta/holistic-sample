
const config = require('../config')

const validateJWTMethod = {
    register: function (server, options, next) {

        server.dependency('chairo')
        server.method({
            name: 'validateJWT',
            method: (token, cb) => {

                return server.seneca.act({
                    src: 'main',
                    service: 'auth',
                    cmd: 'validateToken',
                    token,
                }, (fatal, { error, user }) => {
                    if(fatal)  return cb(fatal);
                    if(error)  return cb(null, { error });
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
