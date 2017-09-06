const Boom = require('boom')
const Joi = require('joi')

const listUserRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/users',
            config: {
                tags: ['api'],
                description: 'List Users',
                notes: 'List users',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    request.seneca.act({
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
