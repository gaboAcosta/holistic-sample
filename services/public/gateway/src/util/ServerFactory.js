const errorHandling = require('../setup/errorHandling')
const Hapi = require('hapi')

class ServerFactory {

    static getServer(plugins){
        return new Promise((resolve, reject) => {
            const server = new Hapi.Server()
            server.connection()

            server.register(plugins, (error) => {

                errorHandling(server)

                if(error){
                    return reject(error)
                }

                return resolve(server)

            })
        })
    }
}

module.exports = ServerFactory