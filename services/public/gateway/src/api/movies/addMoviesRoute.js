const Joi = require('joi')
const Boom = require('boom')

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

                    // in case the service is down
                    server.seneca.error(function(error){
                        return reply(Boom.internal(error))
                    })

                    server.seneca.act({
                        src: 'main',
                        cmd: 'addMovie',
                        movie,
                    }, (err, { error, movie }) => {

                        // we dont handle the first error because we have our error handler on top
                        if (error) {
                            return reply(Boom.internal(error));
                        }

                        return reply(movie);
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
