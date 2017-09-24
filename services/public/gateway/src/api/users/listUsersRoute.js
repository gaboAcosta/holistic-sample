const Boom = require('boom')
const Joi = require('joi')

const listUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/users',
            config: {
                auth: 'jwt',
                tags: ['api'],
                description: 'List Users',
                notes: 'List users',
                handler: function (request, reply) {

                    const client = server.seneca.getClient()

                    // Invoke a Seneca action using the request decoration
                    client.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'list',
                    }, (errList, response) => {

                        if (errList) {
                            const boomError = errList.isBoom ? errList : Boom.internal(errList)
                            return reply(boomError)
                        }

                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { users } = response
                        return reply(users)
                    });
                },
                response: {
                    modify: true,
                    options: {
                        stripUnknown: true,
                    },
                    schema: Joi.array().items(Joi.object().keys({
                        _id: Joi.string().required(),
                        name: Joi.string().required(),
                        email: Joi.string().required(),
                    })),
                },
                validate: {
                    headers: Joi.object().keys({
                        authorization: Joi.string().optional(),
                    }).unknown(),
                }
            }


        });
        next();
    },
};

listUserRoute.register.attributes = {
    name: 'listUserRoute',
    version: '1.0.0'
};

module.exports = listUserRoute
