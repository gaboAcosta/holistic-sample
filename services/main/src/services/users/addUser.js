
const addUserMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'add',
            name: { required$: true },
            email: { required$: true },
            password: { required$: true },
        }, ({name, email, password}, done) => {

            const user = {name, email, password}

            server
                .db
                .Users
                .create(user, done)
        })
        next()
    }
};

addUserMethod.register.attributes = {
    name: 'addUserMethod',
    version: '1.0.0'
};

module.exports = addUserMethod
