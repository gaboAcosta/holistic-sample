const Boom = require('boom')
const Joi = require('joi')

const addUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/api/users',
            config: {
                auth: 'jwt',
                tags: ['api'],
                description: 'Add User',
                notes: 'Adds user',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { name } = request.payload
                    const { email } = request.payload
                    const { password } = request.payload

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'add',
                        name,
                        email,
                        password,
                    }, (errAdd, response) => {

                        if (errAdd) {
                            const boomError = errAdd.isBoom ? errAdd : Boom.internal(errAdd)
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
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
                        email: Joi.string().required(),
                        password: Joi.string().required(),
                    }),
                }
            }


        });
        next();
    },
};

addUserRoute.register.attributes = {
    name: 'addUserRoute',
    version: '1.0.0'
};

module.exports = addUserRoute
