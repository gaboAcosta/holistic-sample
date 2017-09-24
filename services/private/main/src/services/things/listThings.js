
const Boom = require('boom')

const listThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'listThings',
        }, (message, done) => {
           server.db.Things.find({}, (errFind, things) => {
               if(errFind){
                   return done(Boom.internal(errFind))
               }

               done(null, { things })
           })
        })

        next()
    }
};

listThingsMethod.register.attributes = {
    name: 'listThingsMethod',
    version: '1.0.0'
};

module.exports = listThingsMethod
