import React, { Component } from 'react';
import { Alert } from 'reactstrap';


class Requests extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alert: {
                isOpen: false,
                message: null,
                color: null,
            },
            parking: false,
            bike: false,
            multiRoom: false,
            buzzer: false,
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

    handleCheckChange = (event) => {
        if (event.target.id === "parking") {
            this.setState({
                parking: !this.state.parking,
            })
        } else if (event.target.id === "bike") {
            this.setState({
                bike: !this.state.bike,
            })
        } else if (event.target.id === "multi-room") {
            this.setState({
                multiRoom: !this.state.multiRoom,
            })
        } else if (event.target.id === "buzzer") {
            this.setState({
                buzzer: !this.state.buzzer
            })
        }
    }

    render() {
        const parkingHidden = this.state.parking ? '' : 'd-none';
        const bikeHidden = this.state.bike ? '' : 'd-none';
        const multiRoomHidden = this.state.multiRoom ? '' : 'd-none';
        const buzzerHidden = this.state.buzzer ? '' : "d-none";

        return (
            <div className="file">
                <Alert color={this.state.alert.color} isOpen={this.state.alert.isOpen} toggle={this.toggleAlert}>
                    {this.state.alert.message}
                </Alert>
                <h3 className="mb-3">Requests</h3>
                <div>
                    <div><p className="font-weight-bold">What do you need?</p></div>
                    <div>
                        <div className="parking form-check">
                            <label className="form-check-label">
                                <input id="parking" type="checkbox" className="form-check-input" onChange={this.handleCheckChange}/>
                                <p id="parking-l">Parking Spot</p>
                            </label>
                            <div id="parking-info" className={`ml-4 ${parkingHidden}`}>
                                <p><i>Vehicle Information</i></p>
                                <label className="mr-2">
                                    <p>Color</p>
                                    <input type="text"/>
                                </label>
                                <label className="mr-2">
                                    <p>Year</p>
                                    <input type="number"/>
                                </label>
                                <label className="mr-2">
                                    <p>Make</p>
                                    <input type="text"/>
                                </label>
                                <label className="mr-2">
                                    <p>License Plate</p>
                                    <input type="text"/>
                                </label>
                            </div>
                        </div>
                        <div className="bike form-check">
                            <label className="form-check-label">
                                <input id="bike" type="checkbox" className="form-check-input" onChange={this.handleCheckChange}/>
                                <p id="bike-l">Bike Parking</p>
                            </label>
                            <div id="bike-info" className={`ml-4 ${bikeHidden}`}>
                                <p><i>Bike Information</i></p>
                                <label className="mr-2">
                                    <p>Color</p>
                                    <input type="text"/>
                                </label>
                                <label className="mr-2">
                                    <p>Make</p>
                                    <input type="text"/>
                                </label>
                            </div>
                        </div>
                        <div className="access-card form-check">
                            <label className="form-check-label">
                                <input id="access-card" type="checkbox" className="form-check-input"/>
                                <p id="access-card-l">New Access Card</p>
                            </label>
                        </div>
                        <div className="keys form-check">
                            <label className="form-check-label">
                                <input id="keys" type="checkbox" className="form-check-input" onChange={this.handleCheckChange}/>
                                <p id="keys-l">New keys</p>
                            </label>
                        </div>
                        <div className="multi-room form-check">
                            <label className="form-check-label">
                                <input id="multi-room" type="checkbox" className="form-check-input" onChange={this.handleCheckChange}/>
                                <p id="multi-room-l">Book Multipurpose Room</p>
                            </label>
                            <div id="multi-room-info" className={`ml-4 ${multiRoomHidden}`}>
                                <p>
                                    Pick a Date
                                    <input className="ml-2" type="date"/>
                                </p>
                            </div>
                        </div>
                        <div className="buzzer form-check">
                            <label className="form-check-label">
                                <input id="buzzer" type="checkbox" className="form-check-input" onChange={this.handleCheckChange}/>
                                <p id="buzzer-l">Change buzzer number</p>
                            </label>
                            <div id="buzzer-info" className={`ml-4 ${buzzerHidden}`}>
                                <p>
                                    Enter New Number
                                    <input className="col-4 ml-2" type="number"/>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <button id="submit" onClick={this.submit} type="button" className="btn btn-outline-primary">Submit Requests</button>
                </div>
            </div>
        )
    }

}

export default Requests;
