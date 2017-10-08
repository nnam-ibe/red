import React, { Component } from 'react';
import { firestore } from '../fire';
import '../App.css';

class AppBody extends Component {
    constructor(props) {
        super(props);
        this.state = {} ;
    }

    componentWillMount() {
        this.getAnnouncements();
    }

    getAnnouncements() {
        firestore.collection("announcements").onSnapshot((snapShot) => {
            var anncList = [];
            snapShot.forEach((doc) => {
                if ( doc.exists ) {
                    var annc = (
                        <div className="card col-4" key={doc.id}>
                            <div className="card-body container">
                                <h4 className="card-title">{doc.data().title}</h4>
                                <p className="card-text">{doc.data().desc}</p>
                                <p className="card-text"><small className="text-muted">{doc.data().last_updated.toString()}</small></p>
                            </div>
                        </div>
                    )
                    anncList.push(annc);
                }
            })
            this.setState({anncList: anncList});
        });
    }

    render() {
        return (
          <div className="app-body">
            <div className="container">
                <div className="annc">
                    <div className="row">
                        <div className="annc-header bg-light col">
                            Announcements
                        </div>
                    </div>
                    <div className="annc-body row">
                        {this.state.anncList}
                    </div>
                </div>
            </div>
          </div>
        );
    }
}

export default AppBody;
