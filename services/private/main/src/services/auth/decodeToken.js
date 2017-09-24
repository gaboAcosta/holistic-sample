
const jwt = require('jsonwebtoken');
const Boom = require('boom')
const present = require('present')
const config = require('../../config')

const decodeTokenMethod = {
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
                    done(Boom.internal(errVerify))
                }

                done(null, { user })
            });

        })

        next()
    }
};

decodeTokenMethod.register.attributes = {
    name: 'decodeTokenMethod',
    version: '1.0.0'
};

module.exports = decodeTokenMethod
