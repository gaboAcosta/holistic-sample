const Joi = require('joi')
const Boom = require('boom')

const listMoviesRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/movies',
            config: {
                tags: ['api'],
                description: 'List Movies',
                notes: 'List all the movies in the database',
                handler: function (request, reply) {

                    const client = server.seneca.getClient()
                    server.seneca.errorHandler(client, reply)

                    client.act({
                        src: 'main',
                        cmd: 'listMovies',
                    }, (err, { error, movies }) => {
                        // we don't handle the first error because we have our error handler on top
                        if (error) {
                            return reply(Boom.internal(error));
                        }

                        return reply(movies);
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
                        score: Joi.number().optional(),
                    })),
                },
            }


        });
        next();
    },
};

listMoviesRoute.register.attributes = {
    name: 'listMoviesRoute',
    version: '1.0.0'
};

module.exports = listMoviesRoute
