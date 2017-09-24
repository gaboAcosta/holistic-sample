
const Boom = require('boom')

const listMoviesMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, done) => {

            return server.db.Movies.find({}, (errFind, movies) => {
                if(errFind){
                    return done(Boom.internal(errFind))
                }
                return done(null, { movies })
            })
        })
        next()
    }
}

listMoviesMethod.register.attributes = {
    name: 'listMoviesMethod',
    version: '1.0.0'
}

module.exports = listMoviesMethod