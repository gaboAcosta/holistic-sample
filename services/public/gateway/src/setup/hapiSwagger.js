
const Pack = require('../../package');
const HapiSwagger = require('hapi-swagger');

const options = {
    info: {
        'title': 'Holistic Gateway API Documentation',
        'version': Pack.version,
    }
};

module.exports = {
    'register': HapiSwagger,
    'options': options
}