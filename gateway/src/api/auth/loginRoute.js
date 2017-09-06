const Boom = require('boom')
const Joi = require('joi')

const loginRoute = {
    register: function (server, options, next) {
        server.route({
            method: 'POST',
            path: '/api/login',
            config: {
                tags: ['api'],
                description: 'Login Route',
                notes: 'Login Route',
                handler: function (request, reply) {
                    // Invoke a Seneca action using the request decoration

                    const { email } = request.payload
                    const { password } = request.payload

                    request.seneca.act({
                        src: 'main',
                        service: 'auth',
                        cmd: 'login',
                        email,
                        password,
                    }, (fatal, { error, user, token}) => {

                        if (fatal) {
                            return reply(Boom.internal(fatal))
                        }

                        if(error){
                            const { payload } = error.output
                            return reply(payload.message).code(payload.statusCode)
                        }

                        return reply({user, token});
                    });
                },
                response: {
                    modify: true,
                    options: {
                        stripUnknown: true,
                    },
                    schema: Joi.object().keys({
                        user: {
                            _id: Joi.string().required(),
                            name: Joi.string().required(),
                            email: Joi.string().required(),
                        },
                        token: Joi.string().optional(),
                        error: Joi.object().optional()
                    }),
                },
                validate: {
                    payload: Joi.object().keys({
                        email: Joi.string().required(),
                        password: Joi.string().required(),
                    }),
                }
            }


        });
        next();
    },
};

loginRoute.register.attributes = {
    name: 'loginRoute',
    version: '1.0.0'
};

module.exports = loginRoute
