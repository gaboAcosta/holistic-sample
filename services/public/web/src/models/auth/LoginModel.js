import { observable, computed, action } from 'mobx'
import APIClient from '../../util/ApiClient'
import SessionStorage from './SessionModel'
import history from '../history'


const agent = APIClient.getClient()

export default class LoginModel {
    @observable email = '';
    @observable password = ''

    @action
    updateEmail(email){
        this.email = email
    }

    @action
    updatePassword(password){
        this.password = password
    }

    @action
    tryLogin() {
        const { email } = this
        const { password } = this

        return agent.post('/api/login', {email, password})
            .then((res) => {
                const { user, token } = res.body
                SessionStorage.setUser(user)
                SessionStorage.setToken(token)
                return history.push('/admin/users')
            })
    }
}