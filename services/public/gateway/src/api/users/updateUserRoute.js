const Boom = require('boom')
const Joi = require('joi')

const updateUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'PUT',
            path: '/api/users/{id}',
            config: {
                auth: 'jwt',
                tags: ['api'],
                description: 'Update Things',
                notes: 'Update things',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params
                    const { name } = request.payload
                    const { email } = request.payload
                    const { password } = request.payload
                    server.seneca.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'update',
                        id,
                        name,
                        email,
                        password,
                    }, (err, result) => {

                        if (err) {
                            const error = err.toString()
                            return reply(Boom.internal(error))
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
                    headers: Joi.object().keys({
                        authorization: Joi.string().optional(),
                    }).unknown(),
                    params: {
                        id: Joi.string().required()
                    },
                    payload: Joi.object().keys({
                        name: Joi.string().optional(),
                        email: Joi.string().optional(),
                        password: Joi.string().optional(),
                    }),
                }
            }


        });
        next();
    },
};

updateUserRoute.register.attributes = {
    name: 'updateUserRoute',
    version: '1.0.0'
};

module.exports = updateUserRoute
