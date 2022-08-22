import React from 'react'
const SettingPage: React.FC = () => {
    return (
        <div className="container-fluid mt-5">
            <div className="row justify-content-center">
                <div className="col-md-auto"><h4>Profile Setting</h4></div>
            </div>
            <div className="container-fluid mt-3">
                <div className="row">
                    <div className="col-6">
                        <div className="container-fluid">
                            <div className='row justify-content-end mb-3'>
                                <div className="col-6">
                                    <label htmlFor="nameProfileInput" className="form-label">Name</label>
                                    <input className="form-control" id="nameProfileInput" placeholder="Name" />
                                </div>
                            </div>
                            <div className='row justify-content-end'>
                                <div className="col-6">
                                    <label htmlFor="bioProfileInput" className="form-label">Bio</label>
                                    <textarea className="form-control" id="bioProfileInput" placeholder="Bio" />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="container-fluid">
                        <div className='row'><h5>Social Links</h5></div>
                            <div className='row'>
                                <div className="col-6 mb-3">
                                    <label htmlFor="TwitterProfileInput" className="form-label">Twitter</label>
                                    <input className="form-control" id="TwitterProfileInput" placeholder="Twitter" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-6 mb-3">
                                    <label htmlFor="InstagramProfileInput" className="form-label">Instagram</label>
                                    <input className="form-control" id="InstagramProfileInput" placeholder="Instagram" />
                                </div>
                            </div>
                            <div className='row'>
                                <div className="col-6 mb-3">
                                    <label htmlFor="contactProfileInput" className="form-label">Contact</label>
                                    <input className="form-control" id="contactProfileInput" placeholder="Contact" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default SettingPage;