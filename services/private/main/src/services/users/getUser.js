
const Boom = require('boom')

const getUserMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'get',
            id: { required$: true },
        }, ({id}, done) => {
           server.db.Users.findById(id, (errFind, user) => {
               if(errFind){
                   return done(Boom.internal(errFind))
               }
               return done({ user })
           })
        })

        next()
    }
};

getUserMethod.register.attributes = {
    name: 'getUserMethod',
    version: '1.0.0'
};

module.exports = getUserMethod
