import React, { Component } from 'react';
import { firestore, auth } from '../fire';

class SignUp extends Component {

    constructor(props) {
        super(props);
        this.state = {};
    }


    signUp = () => {
        var username = document.getElementById('username').value;
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        var admin = document.getElementById('admin').checked;
        console.log(`${email} & ${password} & ${admin}`);

        auth.createUserWithEmailAndPassword(email, password)
            .then((user) => {
                firestore.collection("users").doc(user.uid).set({
                    username: username,
                    isAdmin: admin
                });
                this.props.history.push("/");
            })
            .catch((error) => {
                var errorCode = error.code;
                var errorMessage = error.message;
                if (errorCode === 'auth/weak-password') {
                    alert('The password is too weak.');
                } else {
                    alert(errorMessage);
                }
                console.log(error);
            });
    }

    render() {
        return (
            <div className="jumbotron">
                <div>
                    <h2>Register New User</h2>
                </div>
                <div className="container">
                    <label htmlFor="username">Username</label>
                    <input type="text" className="form-control" id="username" placeholder="Choose a username"/>
                </div>
                <div className="container">
                    <label htmlFor="inputEmail">Email address</label>
                    <input type="email" className="form-control" id="inputEmail" placeholder="Enter email"/>
                </div>
                <div className="container">
                    <label htmlFor="inputPassword">Password</label>
                    <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                </div>
                <div className="container mb-3">
                    <label htmlFor="admin">Admin</label>
                    <input className="ml-3" id="admin" type="checkbox"/>
                </div>
                <div>
                    <button type="button" className="btn btn-primary" onClick={this.signUp}>Create User</button>
                </div>
            </div>
        );
    }
}

export default SignUp;
