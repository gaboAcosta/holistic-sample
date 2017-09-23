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
                    server.seneca.errorHandler(client, reply)

                    // Invoke a Seneca action using the request decoration
                    client.act({
                        src: 'main',
                        service: 'user',
                        cmd: 'list',
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
