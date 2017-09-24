
const Boom = require('boom')

const addThingMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'addThing',
            name: { required$: true },
        }, (message, done) => {
            const { name } = message
            server.db.Things.create({ name }, (errCreate, thing) => {
                if(errCreate){
                    return done(Boom.internal(errCreate))
                }

                done(null, { thing })
            })
        })

        next()
    }
};

addThingMethod.register.attributes = {
    name: 'addThingMethod',
    version: '1.0.0'
};

module.exports = addThingMethod
