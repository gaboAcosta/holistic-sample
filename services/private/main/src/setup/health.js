
const healthRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/health',
            config: {
                description: 'Health check',
                notes: 'Returns a health message',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    return reply({ message: 'everything ok!' });
                }
            }
        });
        next();
    }
};

healthRoute.register.attributes = {
    name: 'healthRoute',
    version: '1.0.0'
};

module.exports = healthRoute
