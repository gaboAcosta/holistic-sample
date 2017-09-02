
const updateThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'things',
            cmd: 'update',
            id: { required$: true },
            name: { required$: true },
        }, (message, done) => {
            const { id } = message
            const { name } = message
            return server.db.Things.findOne({_id: id}, (err, thing) => {
                if(err) return done(err)
                if(!thing) return done('Object not found')
                thing.name = name
                return thing.save(done)
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
