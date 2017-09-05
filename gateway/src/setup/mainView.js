
const mainViewConfig = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/',
            handler: function (request, reply) {
                reply.view('index')
            }
        });
        next();
    }
};

mainViewConfig.register.attributes = {
    name: 'mainViewConfig',
    version: '1.0.0'
};

module.exports = mainViewConfig
