
import ThingsListModel from './things/ThingsListModel'
import MoviesListModel from './movies/MoviesListModel'
import UsersListModel from './users/UsersListModel'
import LoginModel from './auth/LoginModel'
import SessionStorage from './auth/SessionModel'

const GetModels = () => {
    return {
        ThingsListModel,
        MoviesListModel,
        UsersListModel,
        LoginModel,
        SessionStorage
    }
}

export default GetModels