const Joi = require('joi')
const Boom = require('boom')

const addThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/api/things',
            config: {
                tags: ['api'],
                description: 'Add Things',
                notes: 'Adds things',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { name } = request.payload

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        cmd: 'addThing',
                        name,
                    }, (errAdd, response) => {

                        if (errAdd) {
                            const boomError = errAdd.isBoom ? errAdd : Boom.internal(errAdd)
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
                    payload: Joi.object().keys({
                        name: Joi.string().required(),
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
