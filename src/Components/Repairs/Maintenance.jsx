import React, { Component } from 'react';
import { Alert } from 'reactstrap';
import { firestore, uid } from  '../../fire';


class Maintenance extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: {
                isOpen: false,
                message: null,
                color: null,
            },
        }
    }

    componentWillMount() {
        firestore.collection('users').doc(localStorage.getItem(uid)).get()
            .then((doc) => {
                this.setState({
                    name: `${doc.data().fname} ${doc.data().lname}`,
                    unit: doc.data().unit,
                })
            })
            .catch((error) => {
                console.error(error);
                this.setAlert(true, error.message, "danger");
            })
    }

    render() {
        return (
            <div className="file">
                <Alert color={this.state.alert.color} isOpen={this.state.alert.isOpen} toggle={this.toggleAlert}>
                    {this.state.alert.message}
                </Alert>
                <h3 className="mb-3">Maintenance Request</h3>
                <div>
                    <p><strong>Name: </strong><em>{this.state.name}</em></p>
                    <p><strong>Unit No: </strong><em>{this.state.unit}</em></p>
                </div>
                <div>
                    <div><p className="font-weight-bold">What rooms are affected</p></div>
                    <div className="row">
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input id="hb" className="form-check-input room-checkbox" type="checkbox"/>
                                <p id="hb-l">Half Bathroom</p>
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input id="fb" className="form-check-input room-checkbox" type="checkbox"/>
                                <p id="fb-l">Full Bathroom</p>
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input id="lr" className="form-check-input room-checkbox" type="checkbox"/>
                                <p id="lr-l">Living Room</p>
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input id="kt" className="form-check-input room-checkbox" type="checkbox"/>
                                <p id="kt-l">Kitchen</p>
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input id="mb" className="form-check-input room-checkbox" type="checkbox"/>
                                <p id="mb-l">Master Bedroom</p>
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input id="sb" className="form-check-input room-checkbox" type="checkbox"/>
                                <p id="sb-l">Second Bedroom</p>
                            </label>
                        </div>
                    </div>
                </div>
                <div>
                    <div><p className="font-weight-bold">Description of the problem</p></div>
                    <div>
                        <textarea id="desc" rows="4" type="text" placeholder="Enter description"/>
                    </div>
                </div>
                <div>
                    <button id="submit" onClick={this.submit} type="button" className="btn btn-outline-primary">Submit</button>
                </div>
            </div>
        )
    }

    submit = (event) => {
        var desc = document.getElementById('desc');
        if (desc.value) {
            var rooms = [];
            var nodeList = document.getElementsByClassName('room-checkbox');
            for (var i=0;  i<nodeList.length; i++) {
                if(nodeList[i].checked) {
                    rooms.push( nodeList[i].id + "-l" )
                }
            }
            console.log(rooms);

            firestore.collection('users').doc(localStorage.getItem(uid))
                .collection('repairs').add({
                    desc: desc.value,
                    rooms: rooms,
                })
                .then(() => {
                    this.setAlert(true, "Successfully submitted report", "success")
                    desc.value = "";
                    for (var i=0;  i<nodeList.length; i++) {
                        nodeList[i].checked = false;
                    }
                })
                .catch((error) => {
                    this.setAlert(true, error.message, "danger");
                    console.log(error);
                })
        } else {
            this.setAlert(true, "Please enter a description", "danger")
        }
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

export default Maintenance;
