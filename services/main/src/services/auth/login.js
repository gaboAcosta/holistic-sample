
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

            server.seneca.act({
                src: 'main',
                service: 'auth',
                cmd: 'validateUser',
                email,
                password,
            }, (validateError, { user }) => {
                if(validateError) return done(null, { error: validateError })
                server.seneca.act({
                    src: 'main',
                    service: 'auth',
                    cmd: 'generateToken',
                    user,
                }, (tokenError, { token }) => {
                    delete user.password
                    if(tokenError) return done(null, { error: tokenError })
                    return done(null, { user, token })
                })
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
