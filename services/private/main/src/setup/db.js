const { connectAndRetry } = require('../util/dbConnect')
const { loadModels } = require('../util/dbLoadModels')

const dbSetup = {
    register: (server, options, next) => {
        
        connectAndRetry(server)
        const db = loadModels()
        server.decorate('server','db', db)
        next()
    }
};

dbSetup.register.attributes = {
    name: 'dbSetup',
    version: '1.0.0'
};

module.exports = dbSetup
