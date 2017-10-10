import React, { Component } from 'react';
import { isAuthenticated } from  '../../fire';
import CreateUser from './CreateUser'
import Announcements from './Announcements'

class AdminOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: null
        }
    }

    componentWillMount() {
        if (!isAuthenticated()) {
            this.props.history.push('/');
        } else {
            this.setState({
                page: <CreateUser />
            })
        }
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="red-sidebar col-12 col-md-3 col-xl-2 border border-top-0 border-secondary">
                        <nav className="nav flex-column">
                            <li className="nav-item">
                                <a id="create" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Create User</a>
                            </li>
                            <li className="nav-item">
                                <a id="annc" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Announcements</a>
                            </li>
                            <li className="nav-item">
                                <a id="app" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Appointments</a>
                            </li>
                            <li className="nav-item">
                                <a id="rar" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Repairs & Requests</a>
                            </li>
                        </nav>
                    </div>
                    <div className="content col-12 col-md-9 col-xl-8 pt-3">
                        { this.state.page }
                    </div>
                </div>
            </div>
        )
    }

    navClick = (event) => {
        if (event.target.id === "create") {
            this.setState({
                page: (<CreateUser />)
            });
        } else if (event.target.id === "annc") {
            this.setState({
                page: <Announcements />
            });
        } else if (event.target.id === "app") {
        } else if (event.target.id === "rar") {
        }
    }
}

export default AdminOverview;
