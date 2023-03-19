import React, { useEffect, useState, useContext } from 'react';
import Axios from 'axios';
import { BrowserCookie } from '../helpers/BrowserCookies';
import { useCookies } from "react-cookie";
import { UserContext } from '../App';
import { Link, useNavigate } from 'react-router-dom';
import UpdatePopup from './UpdatePopup';
import Navbar from './Navbar';
import Footer from './Footer';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const MyProfile = () => {
    useEffect(() => {
        callMyprofile();
    }, []);
    const alert = (text) => toast(text);
    const { state, dispatch } = useContext(UserContext);
    const navigate = useNavigate();
    const [userData, setUserData] = useState({});
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const [trigger, setTrigger] = useState();
    const [updatedName, setUpdatedName] = useState("");
    const [Image, setImage] = useState();
    // const [updatedEmail, setUpdatedEmail] = useState("")
    const [updatedPhone, setUpdatedPhone] = useState("");
    const [updatedAddress, setUpdatedAddress] = useState("");
    const [updatedStudentClass, setUpdatedStudentClass] = useState("");
    const [updatedAge, setUpdatedAge] = useState("");
    const UpdatedData = {
        _id: userData._id,
        Name: updatedName,
        Email: userData.Email,
        Phone: updatedPhone,
        Address: updatedAddress,
        StudentClass: updatedStudentClass,
        Age: updatedAge
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
                // console.log(response);
                let Data = response.data;
                if (state === "Teacher") {
                    navigate("/teacherprofile");
                } else if (Data.UserName) {
                    return navigate('/dashboard');
                }
                else {
                    navigate("/myprofile");
                }
                setUserData(Data);
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    };
    const editHandler = function () {
        return (
            setTrigger(true)
        );
    };
    async function handleRemoveCookie() {
        // try {
        var cookies = document.cookie;
        await removeCookie(cookies);
        navigate("/login");
        localStorage.removeItem("role");
        dispatch({ type: state, payload: false });
        // } catch (err) {
        //     console.log(err + "Error is")
        // }
    }
    async function UpdateData(e) {
        // e.preventDefault();
        if (!updatedName || !updatedPhone || !updatedAddress || !updatedStudentClass || !updatedAge) {
            e.preventDefault();
            return alert("Please Enter all the fields below");
        } else {
            try {
                Axios.put("http://localhost:3001/update-student", UpdatedData).then((response) => {
                    // console.log(response);
                    if (response.status === 200) {
                        alert("Success!");
                        let Data = response.data;
                        setUserData(Data);
                        setTrigger(false);

                    } else {
                        alert("Error!");
                    }
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
                    navigate('/myprofile');
                    if (response.status === 200) {
                        let Data = response.data;
                        setUserData(Data);
                        navigate("/myprofile");
                    } else {
                        return alert("Your Data Didn't Update!");
                    }
                }
                ).catch((error) => {
                    console.error(error);
                });
            } catch (e) {
                console.error(e);
            }
        } else {
            alert("Please Upload Your Profile Pic");
        }
    };
    return (
        <>
            <ToastContainer />
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
                                Student
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
                                            <td className="fw-bold">Address</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Address}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Age</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Age}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Class</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.StudentClass}</td>
                                        </tr>
                                        <tr>
                                            <td className="fw-bold">Phone</td>
                                            <td>:</td>
                                            <td className='fst-italic'>{userData.Phone}</td>
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
                                <div className="form-group mt-3 mx-2">
                                    <label>Full Name</label>
                                    <input
                                        type="text"
                                        className="form-control mt-1"
                                        placeholder="e.g Jane Doe"
                                        value={updatedName}
                                        onChange={(event) => setUpdatedName(event.target.value)}
                                    />
                                </div>
                                <div className="d-flex justify-content-between">
                                    <div className="mx-2">
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
                                            <label>Class</label>
                                            <input
                                                type="text"
                                                className="form-control mt-1"
                                                placeholder="Class"
                                                value={updatedStudentClass}
                                                onChange={(event) => setUpdatedStudentClass(event.target.value)}
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

export default MyProfile; 