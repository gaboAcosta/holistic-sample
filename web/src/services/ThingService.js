import agent from 'superagent'

export default class ThingService {

    static createThing(thing){
        return agent.post('/api/things')
            .send(thing)
    }

    static updateThing(thing){
        const {_id} = thing
        return agent.put(`/api/things/${_id}`)
            .send(thing)
    }

    static deleteThing(thing){
        const {_id} = thing
        return agent.delete(`/api/things/${_id}`)
            .send(thing)
    }

    static fetchThings(){
        return agent.get('/api/things')
    }
}