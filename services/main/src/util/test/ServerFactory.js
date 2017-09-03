
const Hapi = require('hapi')

class ServerFactory {

    static getServer(plugins){
        return new Promise((resolve, reject) => {
            const server = new Hapi.Server()
            server.connection()

            server.register(plugins, (error) => {

                if(error){
                    return reject(error)
                }

                return resolve(server)

            })
        })
    }
}

module.exports = ServerFactory