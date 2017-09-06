var mongoose = require('mongoose')
const Glob = require('glob')
const path = require('path')
const config = require('../config')
mongoose.Promise = global.Promise

const dbSetup = {
    register: (server, options, next) => {
        const mongoURI = `${config.mongo.host}/${config.mongo.db}`
        const mongoOptions = config.mongo.options || {}

        mongoose.connect(mongoURI, mongoOptions)

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
