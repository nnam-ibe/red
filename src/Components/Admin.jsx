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
                    <div className="red-sidebar col-12 col-md-3 col-xl-2 border pt-4 border-top-0 border-secondary">
                        <nav className="nav flex-column">
                            <li className="nav-item">
                                <a id="over" href="overview" className={`nav-link ${this.state.page === <Overview/> ? "active" : ""}`}>Overview</a>
                            </li>
                            <li className="nav-item">
                                <a id="annc" href="announcements" className={`nav-link ${this.state.page === <Announcements/> ? "active" : ""}`} >Announcements</a>
                            </li>
                            <li className="nav-item">
                                <a id="app" href="appointments" className={`nav-link ${this.state.page === <Overview/> ? "active" : ""}`} >Appointments</a>
                            </li>
                            <li className="nav-item">
                                <a id="rar" href="repairs" className={`nav-link ${this.state.page === <Overview/> ? "active" : ""}`} >Repairs & Requests</a>
                            </li>
                        </nav>
                    </div>
                    <div className="content col-12 col-md-9 col-xl-8 py-4">
                        { this.state.page }
                    </div>
                </div>
            </div>
        )
    }

    componentWillMount() {
        this.getPage(this.props.match.params.page)
    }

    getPage(page) {
        if (page === 'overview') {
            this.setState({
                page: (<Overview />)
            })
        } else if (page === 'announcements') {
            this.setState({
                page: <Announcements />
            })
        }
    }
}

export default Admin;
