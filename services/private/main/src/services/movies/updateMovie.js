
const Boom = require('boom')

const updateMovieMethod = {
    register: (server, options, next) => {
        server.dependency('chairo')
        server.seneca.add({
            src: 'main',
            service: 'updateMovie',
            id: { required$: true },
            name: { required$: false },
            score: { required$: false }
        }, (message, done) => {

            const { id } = message
            const { name } = message
            const { score } = message

            server.db.Movies.findOne({_id: id}, (errFind, foundMovie) => {
                if(errFind){
                    return done(Boom.internal(errFind))
                }

                if(!foundMovie){
                    return done(Boom.notFound('Movie not found'))
                }

                name && (foundMovie.name = name)
                score && (foundMovie.score = score)

                foundMovie.save()
                    .then((movie) => {
                        done(null, { movie })
                    })
                    .catch(done)
            })

        })
        next()
    }
};

updateMovieMethod.register.attributes = {
    name: 'updateMovieMethod',
    version: '1.0.0'
};

module.exports = updateMovieMethod
