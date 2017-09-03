
const healthMethod = {
    register: function (server, options, next) {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'healthCheck',
        }, (message, done) => {
            return done(null, { response: 'Everything fine in the main service!' })
        })

        next()
    }
};

healthMethod.register.attributes = {
    name: 'healthMethod',
    version: '1.0.0'
};

module.exports = healthMethod
