const Joi = require('joi')
const Boom = require('boom')

const updateThingRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'PUT',
            path: '/api/things/{id}',
            config: {
                tags: ['api'],
                description: 'Update Thing',
                notes: 'Update thing',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { id } = request.params
                    const { name } = request.payload

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        cmd: 'updateThing',
                        id,
                        name,
                    }, (errUpdate, response) => {

                        if (errUpdate) {
                            const boomError = errUpdate.isBoom ? errUpdate : Boom.internal(errUpdate)
                            return reply(boomError);
                        }

                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { thing } = response
                        return reply(thing);
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
                    params: {
                        id: Joi.string().required()
                    },
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
                    }),
                }
            }


        });
        next();
    },
};

updateThingRoute.register.attributes = {
    name: 'updateThingRoute',
    version: '1.0.0'
};

module.exports = updateThingRoute
