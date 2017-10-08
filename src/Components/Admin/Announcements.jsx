import React, { Component } from 'react';
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import { firestore } from  '../../fire';

class Announcements extends Component {

    constructor(props) {
        super(props);
        this.state = {
            anncWTags: [],
            deleteModal: false,
            docToDel: null,
        };
    }

    render() {
        return (
            <div className="announcements">
                <Modal isOpen={this.state.deleteModal} toggle={this.toggledeleteModal} size="sm" className="mt-5">
                    <ModalBody>
                        <div className="">
                            <p>Delete announcement?</p>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <div className="px-2">
                            <button type="button" className="btn btn-outline-secondary" onClick={this.toggledeleteModal}>Cancel</button>
                            <button type="button" className="btn btn-outline-danger ml-1" onClick={this.deleteAnnouncement}>Delete</button>
                        </div>
                    </ModalFooter>
                </Modal>
                <div className="card mb-3" key="new_annc">
                    <div className="card-body container">
                        <h6 className="card-title">
                            <input id="new_title" type="text" placeholder="Enter title"/>
                        </h6>
                        <p className="card-text">
                            <textarea id="new_text" rows="4" type="text" placeholder="Enter description"/>
                        </p>
                        <button id="new_button" onClick={this.postAnnouncememt} type="button" className="btn btn-outline-primary">Post Announcement</button>
                    </div>
                </div>
                {this.state.anncWTags}
            </div>
        )
    }

    componentWillMount() {
        firestore.collection("announcements").onSnapshot((snapShot) => {
            var anncWTags = [];
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
                                <h6 className="card-title">
                                    <input id={`${doc.id}_title`} type="text" onChange={this.handleTextChange} defaultValue={doc.data().title}/>
                                </h6>
                                <p className="card-text">
                                    <textarea id={`${doc.id}_text`} rows="4" type="text" onChange={this.handleTextChange} defaultValue={doc.data().desc}/>
                                </p>
                                <button id={`${doc.id}_button`} type="button" className="btn btn-outline-primary" disabled>Save Changes</button>
                                <button id={`${doc.id}_delete`} type="button" className="btn btn-outline-danger  ml-1" onClick={this.promptDelAnnc}>Delete Announcement</button>
                            </div>
                        </div>
                    )
                    anncWTags.push(annc);
                }
            })
            this.setState({anncWTags: anncWTags})
        });
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

    promptDelAnnc = (event) => {
        if (event) {
            this.toggledeleteModal();
            var docId = event.target.id.substring(0, event.target.id.indexOf("_"));
            this.setState({
                docToDel: docId
            })
        }
    }

    deleteAnnouncement = (event) => {
        var docId = this.state.docToDel;
        this.setState({
            docToDel: null,
        });
        this.toggledeleteModal();
        if (docId) {
            firestore.collection('announcements').doc(docId).delete()
                .catch((error) => {
                    console.error("Error removing doc", error);
                })
        } else {
            console.log("There is no doc to delete");
        }
    }

    toggledeleteModal = () => {
        this.setState({
            deleteModal: !this.state.deleteModal,
        });
    }

}

export default Announcements;
