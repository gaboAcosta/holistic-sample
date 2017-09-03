
const healthRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/health',
            handler: function (request, reply) {
                // Invoke a Seneca action using the request decoration

                request.seneca.act({
                    src: 'main',
                    cmd: 'healthCheck',
                }, (err, result) => {

                    if (err) {
                        return reply(err);
                    }

                    const { response } = result

                    return reply({ message: response });
                });
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
