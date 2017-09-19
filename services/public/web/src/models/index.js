
import ThingsListModel from './things/ThingsListModel'
import UsersListModel from './users/UsersListModel'
import LoginModel from './auth/LoginModel'
import SessionStorage from './auth/SessionModel'

const GetModels = () => {
    return {
        ThingsListModel,
        UsersListModel,
        LoginModel,
        SessionStorage
    }
}

export default GetModels