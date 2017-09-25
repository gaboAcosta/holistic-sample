
const config = require('../config')

module.exports = (server)=>{

    const preResponse = function (request, reply) {

        const { env } = config
        const response = request.response
        if (!response.isBoom) {
            return reply.continue()
        }

        const { statusCode } = response.output
        let error

        if(env === 'production'){
            error = statusCode === 500 ? 'Internal Server Error' : response.message
        } else {
            error = response.message
        }

        server.log(['error'], '=== HANDLING ERROR RESPONSE ===')
        server.log(['error'], `Path: ${JSON.stringify(request.path)}`)
        server.log(['error'], `Headers: ${JSON.stringify(request.headers)}`)
        server.log(['error'], `Payload: ${JSON.stringify(request.payload)}`)
        server.log(['error'], `Response Message: ${error}`)
        server.log(['error'], `Response Code: ${statusCode}`)

        return reply(error).code(statusCode)
    };

    server.ext('onPreResponse', preResponse);
}