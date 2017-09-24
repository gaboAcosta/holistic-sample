
const Boom = require('boom')

const deleteUserMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'delete',
            id: { required$: true },
        }, ({id}, done) => {
            return server.db.Users.findOne({_id: id})
                .remove((errFind, result) => {
                    if(errFind){
                        return done(Boom.internal(errFind))
                    }
                    return done(null, { result })
                })
        })

        next()
    }
};

deleteUserMethod.register.attributes = {
    name: 'deleteUserMethod',
    version: '1.0.0'
};

module.exports = deleteUserMethod
