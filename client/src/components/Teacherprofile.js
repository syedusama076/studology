import React, { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { useCookies } from "react-cookie";
import { BrowserCookie } from '../helpers/BrowserCookies';
import { UserContext } from '../App';
import UpdatePopup from './UpdatePopup';
import Navbar from './Navbar';
import Footer from './Footer';
const TeacherProfile = () => {
    const [userData, setUserData] = useState({});
    const navigate = useNavigate();

    const { state, dispatch } = useContext(UserContext);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    useEffect(() => {
        callMyprofile();
    }, []);
    const [trigger, setTrigger] = useState();
    // const [triggerD, setTriggerD] = useState();
    const [Image, setImage] = useState();
    const [updatedName, setUpdatedName] = useState("");
    // const [updatedEmail, setUpdatedEmail] = useState("")
    const [updatedPhone, setUpdatedPhone] = useState("");
    const [updatedAddress, setUpdatedAddress] = useState("");
    const [updatedCity, setUpdatedCity] = useState("");
    const [updatedEducation, setUpdatedEducation] = useState("");
    const [updatedOnlineTeachingExperience, setUpdatedOnlineTeachingExperience] = useState("");
    const [updatedTeachingExperience, setUpdatedTeachingExperience] = useState("");
    const [updatedAge, setUpdatedAge] = useState("");
    const [Description, updatedDescription] = useState("");
    const UpdatedData = {
        _id: userData._id,
        Name: updatedName,
        Email: userData.Email,
        Phone: updatedPhone,
        Age: updatedAge,
        Address: updatedAddress,
        City: updatedCity,
        Education: updatedEducation,
        TeachingExperience: updatedTeachingExperience,
        OnlineTeachingExperience: updatedOnlineTeachingExperience,
        Description: Description
    };
    const callMyprofile = function () {
        try {
            const UserToken = BrowserCookie();
            const token = UserToken.UserToken;
            Axios.get("http://localhost:3001/my-profile",
                {
                    headers: {
                        'authorization': `${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                let Data = response.data;
                setUserData(Data);
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };
    async function handleRemoveCookie() {
        try {
            var cookies = document.cookie;
            await removeCookie(cookies);
            navigate("/login");
            dispatch({ type: 'Teacher', payload: false });

        } catch (err) {
            console.log(err + "Error is");
        }
    }
    const editHandler = function () {
        return (
            setTrigger(true)
        );
    };
    // console.log(userData)
    async function UpdateData(e) {
        // e.preventDefault();
        if (!userData._id || !updatedName || !userData.Email || !updatedPhone || !updatedAge || !updatedAddress || !updatedCity || !updatedEducation || !updatedTeachingExperience || !updatedOnlineTeachingExperience || !Description) {
            return window.alert("Please Enter all the fields below");
        } else {
            try {
                Axios.put("http://localhost:3001/update-teacher", UpdatedData).then((response) => {
                    if (response.status === 200) {
                        let Data = response.data;
                        setUserData(Data);
                    } else {
                        return window.alert("Your Data Didn't Update!");
                    }
                    console.log(response);
                }).catch((err) => {
                    console.log(err);
                });
            } catch (err) {
                console.error(err);
            }
        }
    }
    const styleinput = {
        visibility: 'hidden'
    };

    const save = () => {
        const imageData = new FormData();
        imageData.append("_id", userData._id);
        imageData.append("file", Image);
        if (Image) {
            try {
                Axios.post("http://localhost:3001/update-img", imageData).then((response) => {
                    navigate('/teacherprofile');
                    if (response.status === 200) {
                        let Data = response.data;
                        setUserData(Data);
                        navigate("/teacherprofile");
                    } else {
                        return window.alert("Your Data Didn't Update!");
                    }
                }
                ).catch((error) => {
                    console.error(error);
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            window.alert("Please Upload Your Profile Pic");
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
                                <form>
                                    <label htmlFor="files" className="btn">Edit</label>
                                    <input type="submit" value="Save" onClick={save} id="savebtn" />
                                    <input id="files" style={styleinput} type="file" name='file'
                                        // value={Image}
                                        onChange={(event) => { setImage(event.target.files[0]); }}
                                    // onChange={handleImage}
                                    />
                                </form>
                            </div>
                            <div className="name">
                                {userData.Name}
                            </div>
                            <div className="job">
                                Teacher
                            </div>
                        </div>
                        <div className="sidenav-url">
                            <div className="url">
                                <Link to="" className="active">Profile</Link>
                                <hr align="center" />
                            </div>
                        </div>
                        <div className="sidenav-url">
                            <div className="url">
                                <Link to="" className="active"><button className='btn' onClick={handleRemoveCookie}>Logout</button></Link>
                            </div>
                        </div>
                    </div>
                    <div className="main">
                        <h2>IDENTITY</h2>
                        <div className="card">
                            <div className="card-body">
                                <i className="fa fa-pen fa-xs edit" onClick={editHandler}></i>
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
                <UpdatePopup trigger={trigger} setTrigger={setTrigger}>
                    <div className="Auth-form-container py-4">
                        <form className="Auth-form">
                            <div className="Auth-form-content">
                                <h3 className="Auth-form-title">UPDATE YOUR INFO</h3>
                                <p className="text-center">Email Will not be Update</p>
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
                                        <div className="form-group mt-3">
                                            <label>Full Name</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="e.g Jane Doe"
                                                value={updatedName}
                                                onChange={(event) => setUpdatedName(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Address</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="address"
                                                value={updatedAddress}
                                                onChange={(event) => setUpdatedAddress(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>City</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="address"
                                                value={updatedCity}
                                                onChange={(event) => setUpdatedCity(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Phone</label>
                                            <input
                                                type="number"
                                                className="form-control mt-1"
                                                placeholder="Phone Number"
                                                value={updatedPhone}
                                                onChange={(event) => setUpdatedPhone(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                    <div className="mx-2">
                                        <div className="form-group mt-3">
                                            <label>Education</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="Education"
                                                value={updatedEducation}
                                                onChange={(event) => setUpdatedEducation(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Online Teaching Experience</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="Online Teaching Experience"
                                                value={updatedOnlineTeachingExperience}
                                                onChange={(event) => setUpdatedOnlineTeachingExperience(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Teaching Experience	</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="Teaching Experience"
                                                value={updatedTeachingExperience}
                                                onChange={(event) => setUpdatedTeachingExperience(event.target.value)}
                                            />
                                        </div>
                                        <div className="form-group mt-3">
                                            <label>Age</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="Age"
                                                value={updatedAge}
                                                onChange={(event) => setUpdatedAge(event.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mx-2">
                                    <div className="form-group mt-3">
                                        <label>Bio</label>
                                        <textarea className="form-control mt-1" placeholder="Your Bio" name="Bio" id="" cols="65" rows="2" value={Description}
                                            onChange={(event) => updatedDescription(event.target.value)}></textarea>
                                    </div>
                                </div>
                                <div className="d-grid gap-2 mt-3 mx-2">
                                    <button type="submit" className="formbtn"
                                        onClick={UpdateData}
                                    >
                                        Update
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </UpdatePopup>
            </div>
            <Footer />
        </>
    );
};

export default TeacherProfile;