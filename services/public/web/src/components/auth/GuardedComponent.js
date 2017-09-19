import React from 'react'
import { observer, inject } from 'mobx-react'
import history from '../../models/history'

@observer
class GuardedComponent extends React.Component {

    componentWillMount () {
        const token = localStorage.getItem('token')
        if(!token){
            history.push('/login')
        }
    }

}

export default GuardedComponent