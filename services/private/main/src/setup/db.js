var mongoose = require('mongoose')
const Glob = require('glob')
const path = require('path')
const config = require('../config')
mongoose.Promise = global.Promise


let connectionAttempts = 0
function connectAndRetry(server){
    connectionAttempts++
    const mongoURI = `${config.mongo.host}/${config.mongo.db}`
    const mongoOptions = config.mongo.options || {}

    server.log(['info'], '=======Connecting to mongoDB')
    server.log(['info'], `mongoURI, ${mongoURI}`)
    server.log(['info'], `mongoURI, ${mongoURI}`)
    server.log(['info'], `mongoOptions', ${JSON.stringify(mongoOptions)}`)

    mongoose.connect(mongoURI, mongoOptions)
        .catch(err => {
            if (connectionAttempts < 10) {
                console.log('Retrying connection to Mongo')           
                setTimeout(connectAndRetry, 3000)
            } else if(err) {
                server.log(['error'], 'Cannot connect to Mongo')
                server.log(['error'], err)
                process.exit(1)
            }
        })
}

const dbSetup = {
    register: (server, options, next) => {
        
        connectAndRetry(server)

        const db = {}

        Glob.sync('../db/schemas/**/*.js', {
            realpath: true,
            cwd: __dirname,
        })
        .forEach((file) => {
            const model = require(file)
            const modelName = model.modelName
            db[modelName] = model
        })

        server.decorate('server','db', db)
        next()
    }
};

dbSetup.register.attributes = {
    name: 'dbSetup',
    version: '1.0.0'
};

module.exports = dbSetup
