
const listMoviesMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'listMovies',
        }, (message, done) => {

            return server.db.Movies.find({}, (error, movies) => {
                if(error){
                    return done(null, { error })
                }
                return done(null, { movies })
            })
            .catch((error) => {
                return done(null, { error })
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