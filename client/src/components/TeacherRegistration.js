import React from 'react';
import { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import { Loginnavbar } from './Loginnavbar'
// import BG1 from '../images/2.png'
const TeacherRegistration = () => {
    const navigate = useNavigate()
    const [FullName, setFullName] = useState("")
    const [Email, setEmail] = useState("")
    const [Phone, setPhone] = useState('')
    const [Age, setAge] = useState('')
    const [Gender, setGender] = useState("")
    const [Address, setAddress] = useState("")
    const [City, setCity] = useState("")
    const [Education, setEducation] = useState("")
    const [TeachingExperience, setTeachingExperience] = useState("")
    const [OTExperience, setOTExperience] = useState("")
    const [TeachingSubject, setTeachingSubject] = useState("")
    const [Password, setPassword] = useState("")
    const [cPassword, setcPassword] = useState("")
    const [Description, updatedDescription] = useState("");
    let teacherData = {
        Name: FullName,
        Email: Email,
        Phone: Phone,
        Age: Age,
        Gender: Gender,
        Address: Address,
        City: City,
        Education: Education,
        TeachingExperience: TeachingExperience,
        OnlineTeachingExperience: OTExperience,
        TeachingSubject: TeachingSubject,
        Description: Description,
        Password: Password,
        cPassword: cPassword
    }
    console.log(teacherData)
    const addTeacher = async (e) => {
        e.preventDefault();
        Axios.post("http://localhost:3001/add-teacher", teacherData).then((response) => {
            if (response.status === 200) {
                window.alert("Congratulations! You are successfully added as a new teacher!");
                navigate('/login')
            } else {
                window.alert("Sorry, Something went wrong!");
            }
        }).catch((error) => {
            console.log(error)
        })
    }
    return (
        <>
            {/* <Navbar /> */}
            <div className="Rcontainer">
                <Loginnavbar />
                <div className="Auth-form-container py-4">
                    <form className="Auth-form1">
                        <div className="Auth-form-content">
                            <h3 className="Auth-form-title">Teacher Sign Up</h3>
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
                                            type="number"
                                            className="login__input"
                                            placeholder="Phone"
                                            value={Phone}
                                            onChange={(event) => setPhone(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-person-half-dress"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Gender"
                                            value={Gender} onChange={(event) => setGender(event.target.value)}
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
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-map-pin"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Address"
                                            value={Address} onChange={(event) => setAddress(event.target.value)}
                                        />
                                    </div>
                                </div>
                                <div className="mx-2">
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-map-pin"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="City"
                                            value={City} onChange={(event) => setCity(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-landmark"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Education"
                                            value={Education} onChange={(event) => setEducation(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-chalkboard-user"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Online Teaching Experience"
                                            value={OTExperience} onChange={(event) => setOTExperience(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-chalkboard-user"></i>
                                        <input
                                            type="text"
                                            className="login__input"
                                            placeholder="Physical Teaching Experience"
                                            value={TeachingExperience} onChange={(event) => setTeachingExperience(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-book"></i>
                                        <input className='login__input' type="textarea" placeholder='Teaching Suject'
                                            name="Description" rows="5"
                                            value={TeachingSubject}
                                            onChange={(event) => setTeachingSubject(event.target.value)}
                                        />
                                    </div>
                                    <div className="login__field">
                                        <i className="login__icon fa-solid fa-biohazard"></i>
                                        <input className='login__input' type="text" placeholder='Bio' name="Description" value={Description} onChange={(event) => updatedDescription(event.target.value)} />
                                    </div>
                                </div>
                            </div>
                            <div className="mx-2">
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
                            <div className="d-grid gap-2 mt-3 mx-2">
                                <button type="submit" className="formbtn" onClick={addTeacher}>
                                    Register
                                </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            {/* <Footer /> */}
        </>
    )
}

export default TeacherRegistration