
const _ = require('lodash')
const environment = process.env.NODE_ENV || 'develop'
const envConfigPath = `./env/${environment}`
const defaultConf = require('./default')
const envConfig = require(envConfigPath)

module.exports = _.merge(defaultConf,envConfig)

