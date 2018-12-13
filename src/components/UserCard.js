import React, {Component} from 'react'

class UserCard extends Component {
    constructor(props) {
        super(props);
        this.state={flag: true}
    }

    render() {
        let user = this.props.data
        // console.log(user)
        return (
 
            <div className="col-xs-2">
                <div className="usercard">
                    <img src={user.avatar_url} alt={user.login} width="100%"/>
                    <p><a href={user.html_url}>{user.login}</a></p>
                </div>
            </div>
        )
    }
}

export default UserCard