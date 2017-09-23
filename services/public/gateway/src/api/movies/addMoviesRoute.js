const Joi = require('joi')
const Boom = require('boom')

const addMoviesRoute = {
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


                    const client = server.seneca.getClient()
                    server.seneca.errorHandler(client, reply)

                    client.act({
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

addMoviesRoute.register.attributes = {
    name: 'addMoviesRoute',
    version: '1.0.0'
};

module.exports = addMoviesRoute
