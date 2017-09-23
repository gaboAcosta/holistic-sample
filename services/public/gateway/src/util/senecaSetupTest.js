
const _ = require('lodash')
const SenecaFactory = require('../util/SenecaFactory')

const senecaSetup = {
    register: (server, options, next) => {
        server.decorate('server','seneca', new SenecaFactory(true))
        next()
    }
};

senecaSetup.register.attributes = {
    name: 'senecaSetup',
    version: '1.0.0'
};

module.exports = senecaSetup
