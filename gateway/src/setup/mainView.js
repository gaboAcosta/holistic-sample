
const config = require('../config')

const mainViewConfig = {
    register: function (server, options, next) {

        const { webClientURL } = config

        server.route({
            method: 'GET',
            path: '/{p*}',
            handler: function (request, reply) {
                reply.view('index', { webClientURL })
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
