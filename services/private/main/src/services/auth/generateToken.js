
const jwt = require('jsonwebtoken');
const Boom = require('boom')
const present = require('present')
const config = require('../../config')

const generateTokenMethod = {
    register: function (server, options, next) {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'auth',
            cmd: 'generateToken',
            user: { required$: true },
        }, ({ user }, done) => {

            const { _id }  = user
            const { name } = user
            const { email } = user
            const now = Math.floor(Date.now() / 1000)

            const payload = {
                _id,
                name,
                email,
                iat: now,
                nbf: now,
            }

            jwt.sign(payload, config.appSecret, (err, token) => {

                if(err) {
                    const error = Boom.internal(err)
                    done(null, { error })
                }

                done(null, { token })

            })
        })

        next()
    }
};

generateTokenMethod.register.attributes = {
    name: 'generateTokenMethod',
    version: '1.0.0'
};

module.exports = generateTokenMethod
