import React, { Component } from 'react';
import File from './File'

class RepairsOverview extends Component {

    constructor(props) {
        super(props);
        this.state = {
            page: <File/>
        }
    }


    render() {
        return (
            <div className="container-fluid">
                <div className="row flex-xl-nowrap">
                    <div className="red-sidebar col-12 col-md-3 col-xl-2 border border-top-0 border-secondary">
                        <nav className="nav flex-column">
                            <li className="nav-item">
                                <a id="over" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>Request Repair</a>
                            </li>
                            <li className="nav-item">
                                <a id="annc" href="javascript:null" className={"nav-link clickable"} onClick={this.navClick}>My Requests</a>
                            </li>
                        </nav>
                    </div>
                    <div className="content col-12 col-md-9 col-xl-8 pt-3">
                        {this.state.page}
                    </div>
                </div>
            </div>
        )
    }

}

export default RepairsOverview;
