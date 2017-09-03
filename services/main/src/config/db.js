var mongoose = require('mongoose');
const Glob = require('glob')
const path = require('path')

const dbSetup = {
    register: (server, options, next) => {

        mongoose.connect('mongodb://mongo/test')
        const db = {}

        Glob.sync('../db/schemas/**/*.js', {
            realpath: true,
            cwd: __dirname,
        })
        .forEach((file) => {
            const schema = require(file)(mongoose)
            const modelName = schema.name
            console.log(`Loading model: ${modelName}`)
            db[modelName] = schema.model
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
