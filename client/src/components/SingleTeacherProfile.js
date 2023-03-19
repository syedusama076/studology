import React, { useEffect, useState, useContext } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import Axios from 'axios'
import { useCookies } from "react-cookie";
import { BrowserCookie } from '../helpers/BrowserCookies'
import { UserContext } from '../App';
import UpdatePopup from './UpdatePopup';
import Navbar from './Navbar'
import Footer from './Footer'
const SingleTeacherProfile = () => {
    const { _id } = useParams()
    const [userData, setUserData] = useState({});

    useEffect(() => {
        callMyprofile()
    }, [])

    const callMyprofile = function () {
        try {
            Axios.get(`http://localhost:3001/single-teacher-profile/${_id}`,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                let Data = response.data;
                setUserData(Data);
            }).catch((err) => {
                console.log(err)
            })
        } catch (err) {
            console.log(err);
        }
    };



    return (
        <>
            <Navbar />
            <div className="ProfilePage">
                <div className="navbar-top">
                    <div className="title">
                        <h1>Profile</h1>
                    </div>
                </div>
                <div className="SideMain">
                    <div className="sidenav">
                        <div className="profile">
                            {
                                userData.Image?.url ?
                                    <img src={userData.Image.url} alt="" width="200" height="200" />
                                    :
                                    <img src={userData.Image} alt="" width="200" height="200" />
                            }
                            <div>

                            </div>
                            <div className="name">
                                {userData.Name}
                            </div>
                            <div className="job">
                                Teacher
                            </div>
                        </div>

                    </div>
                    <div className="main">
                        <h2>IDENTITY</h2>
                        <div className="card">
                            <div className="card-body">
                                <table>
                                    <tbody>
                                        <tr>
                                            <td className="fw-bold">Full Name</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Name}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Email</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Email}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Phone</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Phone}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Age</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Age}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Gender</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Gender}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Address</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Address}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">City</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.City}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Education</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Education}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Teaching Experience</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.TeachingExperience}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Online Teaching Experience</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.OnlineTeachingExperience}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Bio</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Description}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div>
            </div>
            <Footer />
        </>
    )
}

export default SingleTeacherProfile