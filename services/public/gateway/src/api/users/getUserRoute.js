const Boom = require('boom')
const Joi = require('joi')

const getUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/users/{id}',
            config: {
                auth: 'jwt',
                tags: ['api'],
                description: 'Get user',
                notes: 'Get user',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'get',
                        id,
                    }, (errGet, response) => {

                        if (errGet) {
                            const boomError = errGet.isBoom ? errGet : Boom.internal(errGet)
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
