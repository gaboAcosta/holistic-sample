var mongoose = require('mongoose')
mongoose.Promise = global.Promise
const config = require('../config')

let connectionAttempts = 0

function connectAndRetry(logger){
    connectionAttempts++
    const mongoURI = `${config.mongo.host}/${config.mongo.db}`
    const mongoOptions = config.mongo.options || {}

    logger.log(['info'], '=======Connecting to mongoDB')
    logger.log(['info'], `mongoURI, ${mongoURI}`)
    logger.log(['info'], `mongoURI, ${mongoURI}`)
    logger.log(['info'], `mongoOptions', ${JSON.stringify(mongoOptions)}`)

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

module.exports = {
    connectAndRetry,
}