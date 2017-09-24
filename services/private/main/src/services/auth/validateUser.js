
const jwt = require('jsonwebtoken');
const Boom = require('boom')
const bcrypt = require('bcrypt')
const config = require('../../config')

const validateUserMethod = {
    register: function (server, options, next) {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'auth',
            cmd: 'validateUser',
            email: { required$: true },
            password: { required$: true },
        }, ({ email, password }, done) => {

            server.db.Users.findOne({ email }, (errFind, user) => {
                if(errFind){
                    return done(Boom.unauthorized('Invalid email/password'))
                }

                if(!user){
                    // I don't like to give details if it's an email or password error
                    // to make it harder for a brute force attack
                    return done(Boom.unauthorized('Invalid email/password'))
                }

                bcrypt.compare(password, user.password, (errCompare, result) =>{
                    if(errCompare || !result){
                        return done(Boom.unauthorized('Invalid email/password'))
                    }

                    return done(null, { user })

                })
            })

        })

        next()
    }
};

validateUserMethod.register.attributes = {
    name: 'validateUserMethod',
    version: '1.0.0'
};

module.exports = validateUserMethod
