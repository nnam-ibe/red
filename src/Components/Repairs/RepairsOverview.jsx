import React, { Component } from 'react';
import { isAuthenticated } from  '../../fire';
import Maintenance from './Maintenance'
import MyRequests from './MyRequests'
import Requests from './Requests'

class RepairsOverview extends Component {

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
                page: <Maintenance />
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
                                <a id="maintenance" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Maintenance Request</a>
                            </li>
                            <li className="nav-item">
                                <a id="requests" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Other Requests</a>
                            </li>
                            <li className="nav-item">
                                <a id="my-req" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>My Requests</a>
                            </li>
                        </nav>
                    </div>
                    <div className="content col-12 col-md-9 col-xl-10 pt-3">
                        {this.state.page}
                    </div>
                </div>
            </div>
        )
    }

    navClick = (event) => {
        if (event.target.id === "maintenance") {
            this.setState({
                page: (<Maintenance />)
            });
        } else if (event.target.id === "requests") {
            this.setState({
                page: <Requests />
            });
        } else if (event.target.id === "my-req") {
            this.setState({
                page: <MyRequests />
            });
        }
    }

}

export default RepairsOverview;
