
import React from 'react'
import agent from 'superagent'

class TopBar extends React.Component {
    constructor(props) {
        super(props)

        //we will to mobx once the overall architecture is in place
        this.state = {
            status: 'Checking connection'
        }
    }

    componentDidMount(){
        this.checkServiceStatus()
    }

    checkServiceStatus(){
        return agent.get('/api/health')
            .set('Access-Control-Allow-Origin', '*')
            .end((err, response) => {
                const { message } = response.body
                this.setState({
                    status: message
                })
            })
    }


    render() {
        const { status } = this.state
        return (
            <div>
                <p>
                    Welcome to the HolisticJS Web Client, we will make a request to check the backend and
                    services are working as expected, have fun!
                </p>
                <h3>Status:</h3>
                <ul>
                    <li>
                        {status}
                    </li>
                </ul>
            </div>
        )
    }
}

export default TopBar