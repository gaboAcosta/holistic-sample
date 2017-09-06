
const getUserMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'get',
            id: { required$: true },
        }, ({id}, done) => {
           server.db.Users.findById(id, done)
        })

        next()
    }
};

getUserMethod.register.attributes = {
    name: 'getUserMethod',
    version: '1.0.0'
};

module.exports = getUserMethod
