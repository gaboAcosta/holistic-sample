
const listThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'listThings',
        }, (message, done) => {
           server.db.Things.find({}, done)
        })

        next()
    }
};

listThingsMethod.register.attributes = {
    name: 'listThingsMethod',
    version: '1.0.0'
};

module.exports = listThingsMethod
