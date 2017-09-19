
const listUsersMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'list',
        }, (message, done) => {
           server.db.Users.find({}, done)
        })

        next()
    }
};

listUsersMethod.register.attributes = {
    name: 'listUsersMethod',
    version: '1.0.0'
};

module.exports = listUsersMethod
