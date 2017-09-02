
const deleteThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'things',
            cmd: 'delete',
            id: { required$: true },
        }, (message, done) => {
            const { id } = message
            return server.db.Things.findOne({_id: id})
                .remove(done)
        })

        next()
    }
};

deleteThingsMethod.register.attributes = {
    name: 'deleteThingsMethod',
    version: '1.0.0'
};

module.exports = deleteThingsMethod
