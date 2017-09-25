
const bcrypt = require('bcrypt')
const Boom = require('boom')

const loginMethod = {
    register: function (server, options, next) {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'auth',
            cmd: 'login',
            email: { required$: true },
            password: { required$: true },
        }, ({ email, password }, done) => {

            function validateUser(email, password){
                return new Promise((resolve, reject) => {
                    server.seneca.act({
                        src: 'main',
                        service: 'auth',
                        cmd: 'validateUser',
                        email,
                        password,
                    }, (errValidate, message) => {
                        if(errValidate) return reject(errValidate)

                        const { user } = message

                        resolve({ user })
                    })
                })
            }

            function generateToken(user){
                return new Promise((resolve, reject) => {
                    server.seneca.act({
                        src: 'main',
                        service: 'auth',
                        cmd: 'generateToken',
                        user,
                    }, (errGenerate, message) => {

                        if(errGenerate) return reject(errGenerate)

                        const { token } = message

                        resolve({ user, token })
                    })
                })
            }

            validateUser(email, password)
            .then(({ user }) => {
                return generateToken(user)
            })
            .then(({ user, token}) => {
                done(null, { user, token })
            })
            .catch((errLogin) => {
                const boomError = errLogin.isBoom ? errLogin : Boom.internal(errLogin)
                done(boomError)
            })

        })

        next()
    }
};

loginMethod.register.attributes = {
    name: 'loginMethod',
version: '1.0.0'
};

module.exports = loginMethod
