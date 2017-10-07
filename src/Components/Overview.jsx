import React, { Component } from 'react';

class Overview extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }


    render() {
        return (
            <div className="overview">
                <label htmlFor="cuser">Create a new user</label>
                <button type="button" id="cuser" className="btn btn-primary ml-3" onClick={this.createUser}>Create User</button>
            </div>
        )
    }

}

export default Overview;
