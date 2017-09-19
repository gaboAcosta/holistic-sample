const Joi = require('joi')

const deleteThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'DELETE',
            path: '/api/things/{id}',
            config: {
                tags: ['api'],
                description: 'Deletes Things',
                notes: 'Deletes things',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params

                    request.seneca.act({
                        src: 'main',
                        cmd: 'deleteThings',
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

deleteThingsRoute.register.attributes = {
    name: 'deleteThingsRoute',
    version: '1.0.0'
};

module.exports = deleteThingsRoute
