import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import { CookieFunction } from '../helpers/index';
import { UserContext } from '../App';
// import Navbar from './Navbar'
import { Loginnavbar } from './Loginnavbar';
// import Footer from './Footer'
// import aboutus from '../images/aboutus.png'
import { Loginfooter } from './Loginfooter';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
    const alert = (text) => toast(text);
    const { state, dispatch } = useContext(UserContext);
    const Navigate = useNavigate();
    const [Email, setEmail] = useState('');
    const [Password, setPassword] = useState('');
    const userLogin = {
        Email: Email,
        Password: Password
    };
    const loginUser = async (e) => {

        e.preventDefault();
        if (!userLogin.Email || !userLogin.Password) {
            alert("Please Enter All the Fields!");
        } else {
            Axios.post("http://localhost:3001/signin", userLogin).then((response) => {
                // console.log("User logged in successfully!")
                const StatusCodeRes = response.status;
                if (StatusCodeRes === 200) {
                    alert("Congratulations! You Login successfully!");
                    const result = response.data;
                    if (result.data.TeachingExperience) {
                        dispatch({ type: 'Teacher', payload: true });
                        Navigate("/teacherprofile");
                        window.alert("Congratulations! You Login successfully!");
                    }
                    else {
                        debugger;
                        dispatch({ type: 'User', payload: true });
                        Navigate('/myprofile');
                        window.alert("Congratulations! You Login successfully!");

                    }
                    CookieFunction(response);
                } else {
                    alert("Login failed!");
                }
            }).catch((err) => {
                console.log(err);
            });
        }
    };
    return (
        <>
            <ToastContainer />
            <div className="Lcontainer">
                <Loginnavbar />
                <div className="screen">
                    <div className="screen__content">
                        <form className="login">
                            <h3 className="Auth-form-title">Log In</h3>
                            <div className="login__field">
                                <i className="login__icon fa-regular fa-envelope"></i>
                                <input
                                    type="email" className="login__input" placeholder="Email" value={Email} onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="login__field">
                                <i className="login__icon fas fa-lock"></i>
                                <input
                                    type="password" className="login__input" placeholder="Password" value={Password} onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                            <div className="d-grid gap-2 mt-3">
                                <button type="submit" className="formbtn"
                                    onClick={loginUser}
                                >
                                    LOGIN
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="screen__background">
                        <span className="screen__background__shape screen__background__shape4"></span>
                        <span className="screen__background__shape screen__background__shape3"></span>
                        <span className="screen__background__shape screen__background__shape2"></span>
                        <span className="screen__background__shape screen__background__shape1"></span>
                    </div>
                </div>
                <Loginfooter />
            </div>

        </>
    );
};

export default Login;