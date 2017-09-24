
const Boom = require('boom')

const deleteThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'deleteThing',
            id: { required$: true },
        }, (message, done) => {
            const { id } = message
            return server.db.Things.findOne({_id: id})
                .remove((errFind, result) => {
                    if(errFind){
                        return done(Boom.internal(errFind))
                    }

                    done(null, { result })
                })
        })

        next()
    }
};

deleteThingsMethod.register.attributes = {
    name: 'deleteThingsMethod',
    version: '1.0.0'
};

module.exports = deleteThingsMethod
