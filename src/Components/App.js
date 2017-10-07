import React, { Component } from 'react';
import AppHeader from './AppHeader'
import AppBody from './AppBody'
import SignUp from './SignUp'
import Admin from './Admin'
import { auth, firestore, storageKey } from '../fire';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import '../App.css';


class App extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: {
                uid: null,
                isAdmin: false,
            }
        };
    }

    componentWillMount() {
        auth.onAuthStateChanged((fireUser) => {
            var newUser;
            if (fireUser) {
                window.localStorage.setItem(storageKey, fireUser.uid);
                newUser = this.state.user;
                newUser.uid = fireUser.uid;
                this.setState({ user: newUser });
                console.log("User signed in");
                this.setAdminPriv();
                console.log(this.state.user);
            } else {
                window.localStorage.removeItem(storageKey);
                newUser = {
                    uid: null,
                    isAdmin: false,
                }
                this.setState({ user: newUser });
                console.log(this.state.user);
                console.log("Signed out");
            }
        })
    }

    setAdminPriv() {
        var userRef = firestore.collection("users");
        userRef.doc(this.state.user.uid).get().then((doc) => {
            if (doc.exists) {
                var newUser = this.state.user;
                newUser.isAdmin = doc.data().isAdmin;
                this.setState({ user: newUser });
            }
        })
    }

    render() {
        return (
            <Router>
                <div>
                    <AppHeaderWrapper user={this.state.user}/>
                    <div className="red-content">
                        <Route exact path="/" component={AppBody}/>
                        <Route exact path="/signup" component={SignUp}/>
                        <Route path="/admin/:page" component={Admin}/>
                    </div>
                </div>
            </Router>
        );
    }
}

const AppHeaderWrapper = ({user, history, match, location}) => (
    <Route path="/" render={(props) => <AppHeader user={user}/>}/>
);

export default App;
