import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../images/Logo1.png'

export const Loginnavbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light m-4 loginNav">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">
                    <img src={Logo} alt="Logo" />
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link active" aria-current="page" to="/studentregistration">Sign Up As a Student</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to="/teacherregistration">Sign Up As a Teacher</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
