const Joi = require('joi')

const listThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/things',
            config: {
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    request.seneca.act({
                        src: 'main',
                        cmd: 'listThings',
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
                    schema: Joi.array().items(Joi.object().keys({
                        _id: Joi.string().required(),
                        name: Joi.string().required(),
                    })),
                },
            }


        });
        next();
    },
};

listThingsRoute.register.attributes = {
    name: 'listThingsRoute',
    version: '1.0.0'
};

module.exports = listThingsRoute
