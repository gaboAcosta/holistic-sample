
const Chairo = require('chairo')

const chairoSetup = {
    register: Chairo,
    options: {
        log: 'info+,type:act',
        fixedargs: {fatal$:false}
    },
}

chairoSetup.register.attributes = {
    name: 'chairoSetup',
    version: '1.0.0'
};

module.exports = chairoSetup
