const Joi = require('joi')

const updateThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'PUT',
            path: '/api/things/{id}',
            config: {
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params
                    const { name } = request.payload

                    request.seneca.act({
                        src: 'main',
                        cmd: 'updateThings',
                        id,
                        name,
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
                    }),
                },
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
                    }),
                }
            }


        });
        next();
    },
};

updateThingsRoute.register.attributes = {
    name: 'updateThingsRoute',
    version: '1.0.0'
};

module.exports = updateThingsRoute
