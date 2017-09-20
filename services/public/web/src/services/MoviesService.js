import agent from 'superagent'

export default class MoviesService {

    static createMovie(movie){
        return agent.post('/api/movies')
            .send(movie)
    }

    static fetchMovies(){
        return agent.get('/api/movies')
    }
}