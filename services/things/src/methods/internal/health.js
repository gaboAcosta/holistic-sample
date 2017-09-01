
const healthMethod = {
    register: function (server, options, next) {
        server.dependency('chairo')
        server.seneca.add({
            src: 'things',
            cmd: 'healthCheck',
        }, (message, done) => {
            return done(null, { response: 'Everything fine in things!!!!' })
        })

        next()
    }
};

healthMethod.register.attributes = {
    name: 'healthMethod',
    version: '1.0.0'
};

module.exports = healthMethod
