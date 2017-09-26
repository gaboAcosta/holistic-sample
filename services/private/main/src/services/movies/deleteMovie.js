
const Boom = require('boom')

const deleteMovieMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'deleteMovie',
            id: { required$: true },
        }, ({id}, done) => {
            return server.db.Movies.findOne({_id: id})
                .remove((errFind, result) => {
                    if(errFind){
                        return done(Boom.internal(errFind))
                    }
                    return done(null, { result })
                })
        })

        next()
    }
};

deleteMovieMethod.register.attributes = {
    name: 'deleteMovieMethod',
    version: '1.0.0'
};

module.exports = deleteMovieMethod
