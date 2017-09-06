
const agent = require('superagent-use')(require('superagent'));

import history from '../models/history'

const unauthorizedRedirect = function(req) {
    req.on('response', function (res) {
        if (res.status === 401) {
            localStorage.removeItem('token')
            history.push('/login');
        }
    });
}

const authHeaders = function(request){
    const token = localStorage.getItem('token')
    if(token) {
        request.set('Authorization', 'Bearer: ' + token)
    }
}

agent.use(unauthorizedRedirect)
agent.use(authHeaders)

export default class APIClientFactory {
    static getClient(){
        return agent
    }
}