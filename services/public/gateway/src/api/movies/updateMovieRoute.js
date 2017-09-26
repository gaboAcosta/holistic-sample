const Boom = require('boom')
const Joi = require('joi')

const updateMovieRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'PUT',
            path: '/api/movies/{id}',
            config: {
                tags: ['api'],
                description: 'Update MOvie',
                notes: 'Update movie',
                handler: function (request, reply) {

                    const { id } = request.params
                    const { name } = request.payload
                    const { score } = request.payload

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        service: 'updateMovie',
                        id,
                        name,
                        score,
                    }, (errUpdate, response) => {

                        if (errUpdate) {
                            const boomError = errUpdate.isBoom ? errUpdate : Boom.internal(errUpdate)
                            return reply(boomError);
                        }

                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { movie } = response
                        return reply(movie)
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
                        score: Joi.number().required(),
                    }),
                },
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
                        score: Joi.number().required(),
                    }),
                }
            }


        });
        next();
    },
};

updateMovieRoute.register.attributes = {
    name: 'updateMovieRoute',
    version: '1.0.0'
};

module.exports = updateMovieRoute
