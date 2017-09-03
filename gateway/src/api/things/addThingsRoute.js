const Joi = require('joi')

const addThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/api/things',
            config: {
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { name } = request.payload

                    request.seneca.act({
                        src: 'main',
                        cmd: 'addThings',
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
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
                    }),
                }
            }


        });
        next();
    },
};

addThingsRoute.register.attributes = {
    name: 'addThingsRoute',
    version: '1.0.0'
};

module.exports = addThingsRoute
