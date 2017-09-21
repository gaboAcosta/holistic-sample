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

                    request.seneca.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'add',
                        name,
                        email,
                        password,
                    }, (fatal, { error, user }) => {

                        if (fatal) {
                            const error = err.toString()
                            return reply(Boom.internal(error))
                        }

                        if(error){
                            return reply(Boom.badRequest(error))
                        }

                        return reply(user);
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
