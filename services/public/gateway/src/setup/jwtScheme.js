
const Boom = require('boom')

const scheme = (server, options) => {

    return {
        authenticate: (request, reply) => {

            const req = request.raw.req;
            if(!req.headers.authorization) return reply(Boom.unauthorized('No auth headers sent'))
            const token = req.headers.authorization

            return server.methods.validateJWT(token, (error, result) => {
                if(error)  return reply(error);
                const { user } = result
                return reply.continue({ credentials: { user } });
            })
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