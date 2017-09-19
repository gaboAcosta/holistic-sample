
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

            server.db.Users.findOne({ email }, (err, user) => {
                if(err){
                    const error = Boom.badData(err.errmsg)
                    return done(null, { error })
                }

                if(!user){
                    // I don't like to give details if it's an email or password error
                    // to make it harder for a brute force attack
                    const error = Boom.unauthorized('Invalid email/password')
                    return done(null, { error })
                }

                bcrypt.compare(password, user.password, (err, result) =>{
                    if(err){
                        const error = Boom.badData(err)
                        return done(null, { error })
                    }
                    if(!result){
                        const error = Boom.unauthorized('Invalid email/password')
                        return done(null, { error })
                    }

                    return done(null, { user: user.toJSON() })

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
