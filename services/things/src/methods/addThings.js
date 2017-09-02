
const addThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'things',
            cmd: 'add',
            name: { required$: true },
        }, (message, done) => {
            const { name } = message
            server.db.Things.create({ name }, done)
        })

        next()
    }
};

addThingsMethod.register.attributes = {
    name: 'addThingsMethod',
    version: '1.0.0'
};

module.exports = addThingsMethod
