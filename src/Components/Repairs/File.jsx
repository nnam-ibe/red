import React, { Component } from 'react';

class File extends Component {

    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        return (
            <div className="file">
                <h3 className="mb-3">Request Repair</h3>
                <div>
                    <div><p className="font-weight-bold">What rooms are affected</p></div>
                    <div className="row">
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value=""/>
                                Half Bathroom
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value=""/>
                                Full Bathroom
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value=""/>
                                Living Room
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value=""/>
                                Kitchen
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value=""/>
                                Master Bedroom
                            </label>
                        </div>
                        <div className="form-check col-6 col-sm-4">
                            <label className="form-check-label">
                                <input className="form-check-input" type="checkbox" value=""/>
                                Second Bedroom
                            </label>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default File;
