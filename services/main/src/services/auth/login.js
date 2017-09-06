
const bcrypt = require('bcrypt')

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
                    }, (fatal, { error, user }) => {
                        if(fatal) reject(fatal)
                        if(error) reject(error)
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
                    }, (fatal, { error, token }) => {
                        if(fatal) reject(fatal)
                        if(error) reject(error)
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
            .catch((error) => {
                done(null, { error })
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
