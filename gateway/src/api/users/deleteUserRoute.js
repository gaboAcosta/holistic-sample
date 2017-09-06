const Joi = require('joi')

const deleteUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'DELETE',
            path: '/api/users/{id}',
            config: {
                tags: ['api'],
                description: 'Deletes User',
                notes: 'Deletes user',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params

                    request.seneca.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'delete',
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
                        ok: Joi.number().required(),
                        n: Joi.number().required(),
                    }),
                },
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                }
            }


        });
        next();
    },
};

deleteUserRoute.register.attributes = {
    name: 'deleteUserRoute',
    version: '1.0.0'
};

module.exports = deleteUserRoute
