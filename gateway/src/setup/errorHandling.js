
const config = require('../config')

module.exports = (server)=>{

    const preResponse = function (request, reply) {

        const { env } = config
        const response = request.response

        if (!response.isBoom) {

            return reply.continue()

        } else if(env === 'develop'){

            const error = response.message
            const { statusCode } = response.output
            return reply(error).code(statusCode)

        }

        reply.continue()
    };

    server.ext('onPreResponse', preResponse);
}