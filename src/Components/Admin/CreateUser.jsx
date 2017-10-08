import React, { Component } from 'react';
import { firestore, auth } from '../../fire';
import { Alert } from 'reactstrap';

class CreateUser extends Component {

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

    render() {
        return (
            <div className="overview">
                <div className="">
                    <Alert color={this.state.alert.color} isOpen={this.state.alert.isOpen} toggle={this.toggleAlert}>
                        {this.state.alert.message}
                    </Alert>
                    <div>
                        <h2>Create New User</h2>
                    </div>
                    <div className="container">
                        <label htmlFor="fname">First Name</label>
                        <input type="text" className="form-control" id="fname" placeholder="First Name"/>
                    </div>
                    <div className="container">
                        <label htmlFor="lname">Last Name</label>
                        <input type="text" className="form-control" id="lname" placeholder="Last Name"/>
                    </div>
                    <div className="container">
                        <label htmlFor="inputEmail">Email address</label>
                        <input type="email" className="form-control" id="inputEmail" placeholder="Enter email"/>
                    </div>
                    <div className="container">
                        <label htmlFor="inputPassword">Password</label>
                        <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                    </div>
                    <div className="container">
                        <label htmlFor="unit">Unit Number</label>
                        <input type="number" className="form-control" id="unit" placeholder="Unit Number"/>
                    </div>
                    <div className="container">
                        <label htmlFor="phone">Phone number</label>
                        <input type="tel" className="form-control" id="phone" placeholder="Phone Number"/>
                    </div>
                    <div className="container mb-3">
                        <label htmlFor="admin">Admin Access?</label>
                        <input className="ml-3" id="admin" type="checkbox"/>
                    </div>
                    <div className="mb-3">
                        <button type="button" className="btn btn-primary" onClick={this.signUp}>Create User</button>
                    </div>
                </div>
            </div>
        )
    }

    signUp = () => {
        var fname = document.getElementById('fname');
        var lname = document.getElementById('lname');
        var email = document.getElementById('inputEmail');
        var password = document.getElementById('inputPassword');
        var unit = document.getElementById('unit');
        var phone = document.getElementById('phone');
        var admin = document.getElementById('admin');
        console.log(`${email.value} & ${password.value} & ${admin}`);

        auth.createUserWithEmailAndPassword(email.value, password.value)
            .then((user) => {
                firestore.collection("users").doc(user.uid).set({
                    fname: fname.value,
                    lname: lname.value,
                    isAdmin: admin.checked,
                    unit: unit.value,
                    phone: phone.value,
                });

                this.setState({
                    alert: {
                        isOpen: false,
                        message: "Successfully created user",
                        color: "success",
                    }
                })
                this.toggleAlert();

                fname.value = "";
                lname.value = "";
                admin.checked = false;
                unit.value = "";
                phone.value = "";
            })
            .catch((error) => {
                this.setState({
                    alert: {
                        isOpen: false,
                        message: error.message,
                        color: "danger",
                    }
                })
                this.toggleAlert();
                console.log(error);
            });
    }

    toggleAlert = () => {
        if (this.state.alert.isOpen) {
            this.setState({
                alert: {
                    isOpen: false,
                    message: null,
                    color: null,
                }
            });
        } else {
            var temp = this.state.alert;
            temp.isOpen = true;
            this.setState({
                alert: {
                    isOpen: true,
                    message: this.state.alert.message,
                    color: this.state.alert.color,
                }
            })
        }
    }

}

export default CreateUser;
