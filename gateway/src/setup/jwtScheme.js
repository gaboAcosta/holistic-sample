
const Boom = require('boom')

const scheme = (server, options) => {

    return {
        authenticate: (request, reply) => {

            const req = request.raw.req;
            if(!req.headers.authorization) return reply(Boom.unauthorized('No auth headers sent'))
            const parts = req.headers.authorization.split(' ')
            const scheme = parts[0]
            const token = parts[1]
            if (scheme === 'Bearer:') {
                return server.methods.validateJWT(token, (fatal, {error, user}) => {
                    if(fatal)  return reply(fatal);
                    if(error)  return reply(null, { error });
                    return reply.continue({ credentials: { user } });
                })
            }

            return reply(Boom.unauthorized('Only Bearer scheme accepted'))
        }
    };
};

const jwtSchemaSetup = {
    register: function (server, options, next) {

        server.auth.scheme('jwt', scheme);
        server.auth.strategy('jwt', 'jwt');
        next();
    }
};

jwtSchemaSetup.register.attributes = {
    name: 'jwtSchemaSetup',
    version: '1.0.0'
};

module.exports = jwtSchemaSetup