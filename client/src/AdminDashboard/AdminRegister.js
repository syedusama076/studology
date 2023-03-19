import React from 'react';
import { useState } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { Sidebar } from '../AdminDashboard/components/Sidebar';
import { AdminFooter } from '../AdminDashboard/components/AdminFooter';

const AdminRegister = () => {
    debugger;
    const navigate = useNavigate();
    const [Name, setName] = useState("");
    const [Email, setEmail] = useState("");
    const [UserName, setUserName] = useState("");
    const [Phone, setPhone] = useState("");
    const [Password, setPassword] = useState("");
    const [cPassword, setcPassword] = useState("");
    let AdminData = {
        Name: Name,
        Email: Email,
        Phone: Phone,
        UserName: UserName,
        Password: Password,
        cPassword: cPassword
    };
    const addAdmin = async (e) => {
        e.preventDefault();
        if (!Name || !Email || !Phone || !UserName || !Password || !cPassword) {
            window.alert("Please enter all the required fields");
        }
        Axios.post("http://localhost:3001/admin-signup", AdminData).then((response) => {
            if (response.status === 200) {
                window.alert("Congratulations! You are successfully added as a new Admin!");
                navigate("/dashboard/profile");
            } else if (response.status === 201) {
                window.alert("Please Enter Valid Credentials.");
            } else if (response.status === 202) {
                window.alert(" Please Fill all the fields. Sorry, something went wrong!");
            }
        }).catch((error) => {
            console.log(error);
        });
    };
    function back() {
        return navigate("/dashboard/profile");
    }
    return (
        <>
            <div className="d-flex">
                <Sidebar />
                <div style={{
                    width: "100%",
                    height: "123vh"
                }}>
                    <div className="Scontainer">
                        <button className='backBtn' onClick={() => back()}><i className="fa-solid fa-backward"></i> Back to Profile</button>
                        <div className="containers">
                            <div className="Auth-form-container py-4">
                                <form className="Auth-form ">
                                    <div className="Auth-form-content">
                                        <h3 className="Auth-form-title">Admin Sign Up</h3>
                                        <div className="d-flex justify-content-between">
                                            <div className="mx-2">
                                                <div className="login__field">
                                                    <i className="login__icon fa-regular fa-user"></i>
                                                    <input
                                                        type="text"
                                                        className="login__input"
                                                        placeholder="e.g Jane Doe"
                                                        value={Name}
                                                        onChange={(event) => setName(event.target.value)}
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
                                            </div>
                                            <div className="mx-2">
                                                <div className="login__field">
                                                    <i className="login__icon fa-regular fa-user"></i>
                                                    <input
                                                        type="text"
                                                        className="login__input"
                                                        placeholder="Username"
                                                        value={UserName} onChange={(event) => setUserName(event.target.value)}
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
                                            <button type="submit" className="formbtn" onClick={addAdmin}>
                                                Register
                                            </button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AdminFooter />
        </>
    );
};

export default AdminRegister;