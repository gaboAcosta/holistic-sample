
const Boom = require('boom')

const addMovieMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, (message, done) => {

            const { movie } = message
            return server.db.Movies.create(movie, (errCreate, movie) => {
                if(errCreate){
                    return done(Boom.internal(errCreate))
                }
                return done(null, { movie })
            })
        })

        next()
    }
};

addMovieMethod.register.attributes = {
    name: 'addMovieMethod',
    version: '1.0.0'
};

module.exports = addMovieMethod
