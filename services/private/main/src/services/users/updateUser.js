
const Boom = require('boom')

const updateUserMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'update',
            id: { required$: true },
        }, ({id, name, email, password}, done) => {

            return server.db.Users.findOne({_id: id}, (errFind, user) => {
                if(errFind) return done(Boom.internal(errFind))
                if(!user) return done(Boom.notFound('User not found'))

                name && (user.name = name)
                email && (user.email = email)
                password && (user.password = password)
                return user.save()
            })
            .then((user) => {
                done({ user })
            })
        })

        next()
    }
};

updateUserMethod.register.attributes = {
    name: 'updateUserMethod',
    version: '1.0.0'
};

module.exports = updateUserMethod
