
const jwt = require('jsonwebtoken');
const Boom = require('boom')
const present = require('present')
const config = require('../../config')

const validateToken = {
    register: function (server, options, next) {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'auth',
            cmd: 'validateToken',
            token: { required$: true },
        }, ({ token }, done) => {

            jwt.verify(token, config.appSecret, (errVerify, user) => {
                if(errVerify) {
                    done(Boom.badData(errVerify))
                }

                done(null, { user })
            });

        })

        next()
    }
};

validateToken.register.attributes = {
    name: 'validateToken',
    version: '1.0.0'
};

module.exports = validateToken
