import agent from 'superagent'

export default class UserService {

    static createUser(user){
        return agent.post('/api/users')
            .send(user)
    }

    static updateUser(user){
        const {_id} = user
        return agent.put(`/api/users/${_id}`)
            .send(user)
    }

    static deleteUser(user){
        const {_id} = user
        return agent.delete(`/api/users/${_id}`)
            .send(user)
    }

    static fetchUsers(){
        return agent.get('/api/users')
    }
}