import React from 'react'
import { Link } from 'react-router-dom'

const Footer = () => {
    let styling = {
        background_color: "rgba(0, 0, 0, 0.025)"
    }
    return (
        <>
            <div className="text-center text-lg-start bg-white text-muted">
                <section className="d-flex justify-content-center justify-content-lg-between p-4 border-bottom">
                    <div className="me-5 d-none d-lg-block">
                        <span>Get connected with us on social networks:</span>
                    </div>
                    <div>
                        <Link to="" className="me-4 Link-grayish">
                            <i className="fab fa-facebook-f"></i>
                        </Link>
                        <Link to="" className="me-4 Link-grayish">
                            <i className="fab fa-twitter"></i>
                        </Link>
                        <Link to="" className="me-4 Link-grayish">
                            <i className="fab fa-google"></i>
                        </Link>
                        <Link to="" className="me-4 Link-grayish">
                            <i className="fab fa-instagram"></i>
                        </Link>
                        <Link to="" className="me-4 Link-grayish">
                            <i className="fab fa-Linkedin"></i>
                        </Link>
                        <Link to="" className="me-4 Link-grayish">
                            <i className="fab fa-github"></i>
                        </Link>
                    </div>
                </section>

                <section className="">
                    <div className="container text-center text-md-start mt-5">
                        <div className="row mt-3">
                            <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">
                                    <i className="fas fa-gem me-3 text-grayish"></i>Studology
                                </h6>
                                <p>
                                    Studology.com is a free website, trusted by thousands of students and teachers, throughout the world.
                                    We are not the biggest, but we care the most.
                                </p>
                            </div>

                            <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Quik links</h6>
                                <p>
                                    <Link to="/" className="text-reset">
                                        Home
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/about" className="text-reset">
                                        About
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/contact" className="text-reset">
                                        Contact
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/login" className="text-reset">
                                        Login
                                    </Link>
                                </p>
                            </div>

                            <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Useful Links</h6>
                                <p>
                                    <Link to="/teacherslist" className="text-reset">
                                        Teachers
                                    </Link>
                                </p>
                                <p>
                                    <Link to="/myprofile" className="text-reset">
                                        My Profile
                                    </Link>
                                </p>
                            </div>

                            <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                                <p>
                                    <i className="fas fa-home me-3 text-grayish"></i> Lahore, Pakistan
                                </p>
                                <p>
                                    <i className="fas fa-envelope me-3 text-grayish"></i>
                                    info@studology.com
                                </p>
                                <p>
                                    <i className="fas fa-phone me-3 text-grayish"></i> (+92) 300 1234567
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div
                    className="text-center p-4"
                    style={styling}
                >
                    © 2022 Copyright:
                    <Link className="text-reset fw-bold" to="/">
                        Studology.com
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Footer

