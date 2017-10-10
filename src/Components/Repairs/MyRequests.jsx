import React, { Component } from 'react';
import { firestore, uid } from  '../../fire';
import { Alert } from 'reactstrap';

class MyRequests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: {
                isOpen: false,
                message: null,
                color: null,
            },
            myReqs: null,
        }
    }

    componentWillMount() {
        firestore.collection('users').doc(localStorage.getItem(uid))
            .collection('repairs').onSnapshot((snapShot) => {
                var repairs = [];
                snapShot.forEach((doc) => {
                    var desc = doc.data().desc;
                    var rooms = doc.data().rooms;

                    var req = (
                        <div className="card card-body mb-3" key={doc.id}>
                            <div>
                                <div><p className="font-weight-bold">Rooms affected</p></div>
                                <div className="row">
                                    <div className="form-check col-6 col-sm-4">
                                        <label className="form-check-label">
                                            <input id="hb" className="form-check-input room-checkbox" type="checkbox" defaultChecked={rooms.includes("hb-l")? "checked" : null} disabled/>
                                            <p id="hb-l">Half Bathroom</p>
                                        </label>
                                    </div>
                                    <div className="form-check col-6 col-sm-4">
                                        <label className="form-check-label">
                                            <input id="fb" className="form-check-input room-checkbox" type="checkbox" defaultChecked={rooms.includes("fb-l")? "checked" : null} disabled/>
                                            <p id="fb-l">Full Bathroom</p>
                                        </label>
                                    </div>
                                    <div className="form-check col-6 col-sm-4">
                                        <label className="form-check-label">
                                            <input id="lr" className="form-check-input room-checkbox" type="checkbox" defaultChecked={rooms.includes("lr-l")? "checked" : null} disabled/>
                                            <p id="lr-l">Living Room</p>
                                        </label>
                                    </div>
                                    <div className="form-check col-6 col-sm-4">
                                        <label className="form-check-label">
                                            <input id="kt" className="form-check-input room-checkbox" type="checkbox" defaultChecked={rooms.includes("kt-l")? "checked" : null} disabled/>
                                            <p id="kt-l">Kitchen</p>
                                        </label>
                                    </div>
                                    <div className="form-check col-6 col-sm-4">
                                        <label className="form-check-label">
                                            <input id="mb" className="form-check-input room-checkbox" type="checkbox" defaultChecked={rooms.includes("mb-l")? "checked" : null} disabled/>
                                            <p id="mb-l">Master Bedroom</p>
                                        </label>
                                    </div>
                                    <div className="form-check col-6 col-sm-4">
                                        <label className="form-check-label">
                                            <input id="sb" className="form-check-input room-checkbox" type="checkbox" defaultChecked={rooms.includes("sb-l")? "checked" : null} disabled/>
                                            <p id="sb-l">Second Bedroom</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div><p className="font-weight-bold">Description of the problem</p></div>
                                <div>
                                    <textarea id="desc" rows="4" type="text" placeholder="Enter description"  disabled defaultValue={desc}/>
                                </div>
                            </div>
                            <div>
                                <button id="edit" onClick={this.edit} type="button" className="btn btn-outline-primary">Edit</button>
                            </div>
                        </div>
                    );
                    repairs.push(req);
                })
                this.setState({
                    myReqs: repairs,
                })
            })
    }

    render() {
        return (
            <div>{this.state.myReqs}</div>
        );
    }

    edit = (event) => {

    }

    toggleAlert = () => {
        this.setAlert(false, null, null);
    }

    setAlert = (isOpen, message, color) => {
        this.setState({
            alert: {
                isOpen: isOpen,
                message: message,
                color: color,
            }
        })
    }

}

export default MyRequests;
