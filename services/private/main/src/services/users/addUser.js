
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

            server.db.Users.create(newUser, (errCreate, user) => {

                let boomError
                if(errCreate && errCreate.code === 11000){
                    boomError = Boom.conflict('User already exists')
                } else if(errCreate) {
                    boomError = Boom.internal(errCreate.errmsg)
                }

                if(boomError){
                    return done(boomError)
                }

                if(!user){
                    return done(Boom.notFound('user not found'))
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
