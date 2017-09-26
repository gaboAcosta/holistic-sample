import agent from 'superagent'

export default class MoviesService {

    static createMovie(movie){
        return agent.post('/api/movies')
            .send(movie)
    }

    static fetchMovies(){
        return agent.get('/api/movies')
    }

    static updateMovie(movie){
        const {_id} = movie
        return agent.put(`/api/movies/${_id}`)
            .send(movie)
    }

    static deleteMovie(movie){
        const {_id} = movie
        return agent.delete(`/api/movies/${_id}`)
            .send(movie)
    }
}