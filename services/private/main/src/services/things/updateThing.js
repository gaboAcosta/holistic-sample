
const Boom = require('boom')

const updateThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'updateThing',
            id: { required$: true },
            name: { required$: true },
        }, (message, done) => {
            const { id } = message
            const { name } = message

            return server.db.Things.findOne({_id: id}, (errFind, foundThing) => {
                if(errFind) return done(errFind)
                if(!foundThing) return done(Boom.notFound('Thing not found'))

                foundThing.name = name

                return foundThing.save((errSave, thing) => {
                    if(errSave){
                        return done(Boom.internal(errSave))
                    }

                    done(null, { thing })
                })
            })
        })

        next()
    }
};

updateThingsMethod.register.attributes = {
    name: 'updateThingsMethod',
    version: '1.0.0'
};

module.exports = updateThingsMethod
