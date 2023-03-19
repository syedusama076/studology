import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom'
import { Loginnavbar } from './Loginnavbar'

import Footer from './Footer'
const StudentRegistration = () => {
    const navigate = useNavigate()
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Phone, setPhone] = useState("");
    const [Age, setAge] = useState("");
    const [Address, setAddress] = useState("");
    const [Class, setClass] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    let studentData = {
        Name: FullName,
        Email: Email,
        Phone: Phone,
        Age: Age,
        Address: Address,
        StudentClass: Class,
        Password: Password,
        cPassword: cPassword
    }
    const addStudent = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/add-student", studentData).then((response) => {
            if (response.status === 200) {
                window.alert("Congratulations! You are successfully added as a new student!");
                navigate('/login')
            } else {
                window.alert("Sorry, something went wrong!");
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            {/* <div className="Lcontainer pt-4"> */}
            <div className="Lcontainer">
                <Loginnavbar />
                <div className="containers">
                    <div className="Auth-form-container py-4">
                        <form className="Auth-form ">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">Student Sign Up</h3>
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
                                        <div className="login__field">
                                            <i className="login__icon fa-regular fa-user"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="e.g Jane Doe"
                                                value={FullName}
                                                onChange={(event) => setFullName(event.target.value)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-regular fa-envelope"></i>
                                            <input
                                                type="email"
                                                className="login__input"
                                                placeholder="Email"
                                                value={Email}
                                                onChange={(event) => setEmail(event.target.value)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-phone"></i>
                                            <input
                                                type="Phone"
                                                className="login__input"
                                                placeholder="Phone Number"
                                                value={Phone}
                                                onChange={(event) => setPhone(event.target.value)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-person-cane"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="Age"
                                                value={Age} onChange={(event) => setAge(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mx-2">
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-map-pin"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="Address"
                                                value={Address} onChange={(event) => setAddress(event.target.value)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-landmark"></i>
                                            <input
                                                type="text"
                                                className="login__input"
                                                placeholder="Class"
                                                value={Class} onChange={(event) => setClass(event.target.value)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-lock"></i>
                                            <input
                                                type="Password"
                                                className="login__input"
                                                placeholder="Password"
                                                value={Password} onChange={(event) => setPassword(event.target.value)}
                                            />
                                        </div>
                                        <div className="login__field">
                                            <i className="login__icon fa-solid fa-lock"></i>
                                            <input
                                                type="password"
                                                className="login__input"
                                                placeholder="Confirm Password"
                                                value={cPassword} onChange={(event) => setcPassword(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3 mx-2">
                                    <button type="submit" className="formbtn" onClick={addStudent}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            {/* <Footer /> */}
            {/* </div> */}
        </>
    )
}

export default StudentRegistration