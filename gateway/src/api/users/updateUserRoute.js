const Boom = require('boom')
const Joi = require('joi')

const updateUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'PUT',
            path: '/api/users/{id}',
            config: {
                tags: ['api'],
                description: 'Update Things',
                notes: 'Update things',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params
                    const { name } = request.payload
                    console.log('=== CALLING SERVICE ===')
                    server.seneca.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'update',
                        id,
                        name,
                    }, (err, result) => {

                        if (err) {
                            const error = err.toString()
                            return reply(Boom.internal(error))
                        }

                        return reply(result);
                    });
                },
                validate: {
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
