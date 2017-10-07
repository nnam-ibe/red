import React, { Component } from 'react';
import Overview from './Overview'
import Announcements from './Announcements'

class Admin extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: <Overview />
        };
    }

    createUser = () => {
        this.props.history.push('/signup')
    }

    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="red-sidebar col-12 col-md-3 col-xl-2 border border-top-0 border-secondary">
                        <nav className="nav flex-column">
                            <li className="nav-item">
                                <a id="over" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Overview</a>
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
        if (event.target.id === "over") {
            this.setState({
                page: (<Overview />)
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

export default Admin;
