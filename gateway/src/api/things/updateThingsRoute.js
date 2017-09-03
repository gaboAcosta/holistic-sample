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


    // validate: {
    //     options: {
    //         abortEarly: false,
    //     },
    //     payload: Joi.object().keys({
    //         products: Joi.array().items(Joi.object().keys({
    //             id: Joi.string().required(),
    //             name: Joi.string().required(),
    //             description: Joi.string().required(),
    //             url: Joi.string().required(),
    //             image: Joi.string().required(),
    //             currency: Joi.string().required(),
    //             currentPrice: Joi.number().required(),
    //             category: Joi.string().required(),
    //             expirationDate: Joi.string().allow(null).allow(''),
    //             stockAvailability: Joi.string().allow(null).allow(''),
    //             added: Joi.boolean().allow(null),
    //         })).required(),
    //     }),
    // },
};

listThingsRoute.register.attributes = {
    name: 'addThingsRoute',
    version: '1.0.0'
};

module.exports = listThingsRoute
