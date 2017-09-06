
const updateThingsMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'user',
            cmd: 'update',
            id: { required$: true },
            name: { required$: false },
            email: { required$: false },
            password: { required$: false },
        }, ({id, name, email, password}, done) => {

            return server.db.Users.findOne({_id: id}, (err, user) => {
                if(err) return done(err)
                if(!user) return done('Object not found')


                name && (user.name = name)
                email && (user.email = email)
                password && (user.password = password)
                return user.save(done)
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
