
const Boom = require('boom')

const addUserMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'add',
            name: { required$: true },
            email: { required$: true },
            password: { required$: true },
        }, ({name, email, password}, done) => {

            const newUser = {name, email, password}

            server
                .db
                .Users
                .create(newUser, (err, user) => {
                    if(err){
                        const error = Boom.badData(err.errmsg)
                        return done(null, { error })
                    }

                    if(!user){
                        const error = Boom.notFound('user not found!')
                        return done(null, { error })
                    }

                    return done(null, { user })

                })
        })
        next()
    }
};

addUserMethod.register.attributes = {
    name: 'addUserMethod',
    version: '1.0.0'
};

module.exports = addUserMethod
