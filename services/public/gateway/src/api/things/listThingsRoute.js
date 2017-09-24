const Joi = require('joi')

const listThingsRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'GET',
            path: '/api/things',
            config: {
                tags: ['api'],
                description: 'List Things',
                notes: 'List things',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const client = server.seneca.getClient()

                    client.act({
                        src: 'main',
                        cmd: 'listThings',
                    }, (errList, response) => {

                        if (errList) {
                            const boomError = errList.isBoom ? errList : Boom.internal(errList)
                            return reply(boomError)
                        }


                        if(!response){
                            return reply(Boom.internal('No response received from service'))
                        }

                        const { things } = response
                        return reply(things);
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
};

listThingsRoute.register.attributes = {
    name: 'listThingsRoute',
    version: '1.0.0'
};

module.exports = listThingsRoute
