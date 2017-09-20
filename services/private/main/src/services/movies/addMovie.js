
const addMovieMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            cmd: 'addMovie',
            movie: { required$: true },
        }, (message, done) => {

            const { movie } = message
            return server.db.Movies.create(movie, (error, movie) => {
                if(error){
                    return done(null, { error })
                }
                return done(null, { movie })
            })
            .catch((error) => {
                return done(null, { error })
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
