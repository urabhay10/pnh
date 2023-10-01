import React, { Component } from 'react'

export default class Home extends Component {
    render() {
        return (
            <div className="container mt-5 home-container">
                <div className="row">
                    <div className="col-lg-6">
                        <h1 className='fw-bolder'>Welcome to PassNotesHub</h1>
                        <p>
                            PassNotesHub is your go-to platform for managing and sharing your
                            class notes and study materials.
                        </p>
                        <p>
                            Whether you're a student looking to organize your notes or a
                            graduate wanting to share your knowledge with others, PassNotesHub
                            has you covered.
                        </p>
                        <p>
                            Join our community today to start managing your notes and connecting
                            with fellow students.
                        </p>
                        <a href="/register" className="btn btn-dark btn-lg" style={{borderRadius: "0"}}>
                            Get Started
                        </a>
                    </div>
                    {/* <div className="vertical-line"></div> */}
                    <div className="col-lg-6">
                        <img
                            src="/assets/savenotes.png"
                            alt="Savenotes"
                            className="w-25 h-50 mx-3"
                        />
                        <img
                            src="/assets/keeporganised.png"
                            alt="Organiseyourself"
                            className="img-fluid w-25 h-50 mx-3"
                        />
                        <p className='fw-bold'><span className='mx-2'>Save your notes</span> <span className='mx-4'>Organise your notes</span></p>
                        {/* <br /> */}
                        <img
                            src="/assets/graduate.png"
                            alt="Graduate"
                            className="img-fluid w-75 h-50"
                        />
                        <p className='mx-3 fw-bold'>Help your juniors by making your notes public, free or paid</p>
                    </div>
                </div>
            </div>
        )
    }
}
