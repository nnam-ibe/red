import React, { Component } from 'react';
import { auth, isAuthenticated } from '../fire';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from 'react-router-dom'

class AppHeader extends Component {

    constructor(props) {
        super(props);
        this.state = {
            signInModal: false,
            user: props.user,
        };
    }

    signOut = () => {
        auth.signOut().then(() => {
            // Nothing for now
        });
    }

    signIn = () => {
        var email = document.getElementById('inputEmail').value;
        var password = document.getElementById('inputPassword').value;
        console.log(`${email} & ${password}`);

        auth.signInWithEmailAndPassword(email, password).catch((error) => {
            var errorMessage = error.message;
            alert(errorMessage);
            this.toggleSignIn();
            console.log(error);
        });

        this.toggleSignIn();
    }

    render() {
        return (
            <nav className="navbar navbar-dark fixed-top bg-dark">
                <Link className="navbar-brand" to={`/`}>Project Red</Link>
                {
                    this.state.user.isAdmin ? (
                        <ul className="navbar-nav ml-auto mr-2 mt-2 mt-lg-0">
                            <li className={`nav-item ${this.props.location === "/admin" ? "active" : ""}`}>
                                <Link className="nav-link" to={`/admin/overview`}>Admin</Link>
                            </li>
                        </ul>
                    ) : null
                }
                {
                    isAuthenticated() ? (<button type="button" className="btn btn-outline-primary" onClick={this.signOut}>Sign Out</button>)
                                : (<button type="button" className="btn btn-outline-secondary" onClick={this.toggleSignIn}>Sign In</button>)
                }
                <Modal isOpen={this.state.signInModal} toggle={this.toggleSignIn}>
                    <ModalHeader toggle={this.toggleSignIn}>Sign In</ModalHeader>
                    <ModalBody>
                        <div className="form-group">
                            <label htmlFor="inputEmail">Email address</label>
                            <input type="email" className="form-control" id="inputEmail" placeholder="Enter email"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="inputPassword">Password</label>
                            <input type="password" className="form-control" id="inputPassword" placeholder="Password"/>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <button type="button" className="btn btn-outline-primary" onClick={this.signIn}>Sign In</button>
                    </ModalFooter>
                </Modal>
            </nav>
        );
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user,
        })
    }


    toggleSignIn = () => {
        this.setState({
            signInModal: !this.state.signInModal
        });
    }
}

export default AppHeader;
