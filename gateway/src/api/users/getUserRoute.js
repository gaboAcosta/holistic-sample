const Joi = require('joi')

const getUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/users/{id}',
            config: {
                tags: ['api'],
                description: 'Get user',
                notes: 'Get user',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params

                    request.seneca.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'get',
                        id,
                    }, (err, result) => {

                        if (err) {
                            return reply(err);
                        }

                        return reply(result);
                    });
                },
                response: {
                    modify: true,
                    options: {
                        stripUnknown: true,
                    },
                    schema: Joi.object().keys({
                        _id: Joi.string().required(),
                        name: Joi.string().required(),
                        email: Joi.string().required(),
                    }),
                },
                validate: {
                    params: {
                        id: Joi.string().required()
                    }
                }
            }


        });
        next();
    },
};

getUserRoute.register.attributes = {
    name: 'getUserRoute',
    version: '1.0.0'
};

module.exports = getUserRoute
