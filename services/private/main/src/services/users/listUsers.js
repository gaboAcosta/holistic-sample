
const Boom = require('boom')

const listUsersMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'list',
        }, (message, done) => {
           server.db.Users.find({}, (errFind, users) => {
               if(errFind){
                   return done(Boom.internal(errFind))
               }
               return done(null, { users })
           })
        })

        next()
    }
};

listUsersMethod.register.attributes = {
    name: 'listUsersMethod',
    version: '1.0.0'
};

module.exports = listUsersMethod
