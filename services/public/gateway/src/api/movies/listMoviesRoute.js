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

                    client.act({
                        src: 'main',
                        cmd: 'listMovies',
                    }, (errList, response) => {

                        if (errList) {
                            const boomError = errList.isBoom ? errList : Boom.internal(errList)
                            return reply(boomError)
                        }

                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { movies } = response
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
