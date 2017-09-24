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
                description: 'Update User',
                notes: 'Update user',
                handler: function (request, reply) {

                    const { id } = request.params
                    const { name } = request.payload
                    const { email } = request.payload
                    const { password } = request.payload

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'update',
                        id,
                        name,
                        email,
                        password,
                    }, (errUpdate, response) => {

                        if (errUpdate) {
                            const boomError = errUpdate.isBoom ? errUpdate : Boom.internal(errUpdate)
                            return reply(boomError);
                        }

                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { user } = response
                        return reply(user)
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
