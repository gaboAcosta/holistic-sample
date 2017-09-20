const Joi = require('joi')

const addThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/api/movies',
            config: {
                tags: ['api'],
                description: 'Add Movie',
                notes: 'Adds a movie',
                handler: function (request, reply) {

                    const { name } = request.payload
                    const { score } = request.payload

                    const movie = {
                        name,
                        score,
                    }

                    // Invoke a Seneca action using the request decoration
                    request.seneca.act({
                        src: 'main',
                        cmd: 'addMovie',
                        movie,
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
                        score: Joi.number().optional(),
                    }),
                },
                validate: {
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
                        score: Joi.number().optional(),
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
