const Boom = require('boom')
const Joi = require('joi')

const deleteMovieRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'DELETE',
            path: '/api/movies/{id}',
            config: {
                tags: ['api'],
                description: 'Deletes Movie',
                notes: 'Deletes movie',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        service: 'deleteMovie',
                        id,
                    }, (errDelete, response) => {

                        if (errDelete) {
                            const boomError = errDelete.isBoom ? errDelete : Boom.internal(errDelete)
                            return reply(boomError);
                        }

                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { result } = response
                        return reply(result);
                    });
                },
                response: {
                    modify: true,
                    options: {
                        stripUnknown: true,
                    },
                    schema: Joi.object().keys({
                        ok: Joi.number().required(),
                        n: Joi.number().required(),
                    }),
                },
                validate: {
                    params: {
                        id: Joi.string().required()
                    },
                }
            }


        });
        next();
    },
};

deleteMovieRoute.register.attributes = {
    name: 'deleteMovieRoute',
    version: '1.0.0'
};

module.exports = deleteMovieRoute
