import React, { Component } from 'react';
import { firestore } from  '../fire';

class Announcements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anncWTags: []
        };
    }

    render() {
        return (
            <div className="announcements">
                <div className="card mb-3" key="new_annc">
                    <div className="card-body container">
                        <h4 className="card-title">
                            <input  className="py-1 px-1" id="new_title" type="text" placeholder="Enter title"/>
                        </h4>
                        <p className="card-text">
                            <textarea className="py-1 px-1" id="new_text" rows="4" cols="50" type="text" placeholder="Enter description"/>
                        </p>
                        <button id="new_button" onClick={this.postAnnouncememt} type="button" className="btn btn-outline-primary">Post Announcement</button>
                    </div>
                </div>
                {this.state.anncWTags}
            </div>
        )
    }

    componentDidMount() {
        var anncWTags = [];
        firestore.collection("announcements").get().then((snapShot) => {
            snapShot.forEach((doc) => {
                if (doc.exists) {
                    console.log(`${doc.id} => ${doc.data().title}`);
                    this.setState({
                        [doc.id]: {
                            title: doc.data().title,
                            desc: doc.data().desc,
                        }
                    });

                    var annc = (
                        <div className="card mb-3" key={doc.id}>
                            <div className="card-body container">
                                <h4 className="card-title">
                                    <input className="py-1 px-1" id={`${doc.id}_title`} type="text" onChange={this.handleTextChange} defaultValue={doc.data().title}/>
                                </h4>
                                <p className="card-text">
                                    <textarea className="py-1 px-1" id={`${doc.id}_text`} rows="4" cols="50" type="text" onChange={this.handleTextChange} defaultValue={doc.data().desc}/>
                                </p>
                                <button id={`${doc.id}_button`} type="button" className="btn btn-outline-primary" disabled>Save Changes</button>
                            </div>
                        </div>
                    )
                    anncWTags.push(annc);
                    this.setState({anncWTags: anncWTags})
                } else {
                    console.log("No such element")
                }
            })
        })
    }

    handleTextChange = (event) => {
        if ( event )  {
            var index = event.target.id.indexOf("_");
            var buttonId = event.target.id.substring(0,index) + "_button";
            document.getElementById(buttonId).disabled = false;
            document.getElementById(buttonId).onclick = this.saveChanges;
        }
    }

    saveChanges = (event) => {
        if (event) {
            console.log("Even on to the next step")
            var docId = event.target.id.substring(0, event.target.id.indexOf("_"));
            var titleId = docId + "_title";
            var textId = docId + "_text";

            var newTitle = document.getElementById(titleId).value;
            var newText = document.getElementById(textId).value;

            firestore.collection('announcements').doc(docId).set({
                title: newTitle,
                desc: newText,
                last_updated: new Date()
            }).then(() => {
                document.getElementById(docId + "_button").disabled = true;
            }).catch((error) => {
                console.error("Opps!: ", error);
            })
        }
    }

    postAnnouncememt = (event) => {
        if (event) {
            var titleId = "new_title";
            var textId = "new_text";

            var title = document.getElementById(titleId);
            var text = document.getElementById(textId);

            if (title.value && text ) {
                firestore.collection('announcements').add({
                    title: title.value,
                    desc: text.value,
                    last_updated: new Date()
                }).then(() => {
                    title.value = "";
                    text.value = "";
                }).catch((error) => {
                    console.error("Opps!: ", error);
                })
            } else {
                console.log("Something empty, had to back out")
            }
        }
    }

}

export default Announcements;
