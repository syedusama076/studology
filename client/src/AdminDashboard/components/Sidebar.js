import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Logo from '../../images/Logo1.png';
import { useCookies } from "react-cookie";
import Axios from 'axios';
import { BrowserCookie } from '../../helpers/BrowserCookies';


export const Sidebar = () => {
    const [adminData, setAdminData] = useState('');
    const navigate = useNavigate();
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    useEffect(() => {
        try {
            const UserToken = BrowserCookie();
            const token = UserToken.UserToken;
            Axios.get("http://localhost:3001/admin-dashboard",
                {
                    headers: {
                        'authorization': `${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }
            ).then((response) => {
                let Data = response.data;
                setAdminData(Data);
            }).catch((err) => {
                console.log(err);
            });
        } catch (err) {
            console.log(err);
        }
    }, []);
    async function handleRemoveCookie() {
        try {
            var cookies = document.cookie;
            await removeCookie(cookies);
            navigate("/admin-login");
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <div className="Adminsidebar d-flex">
                <div className="container d-flex flex-column align-items-center">
                    <div>
                        <img src={Logo} alt="" className="Adminlogo" />
                    </div>
                    <div className="adminMenu d-flex flex-column align-items-center my-3">
                        <div>
                            <h5>{adminData.Name}</h5>
                        </div>
                        {/* <div>
                            <h6>
                                {adminData.UserName}
                            </h6>
                        </div> */}
                        {/* <input className="formbtn mt-1 mx-1  type="button" value="Student" /> */}
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-left">
                        <Link to="/" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-solid fa-globe"></i> Website</Link>
                        <Link to="/dashboard/profile" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-solid fa-user"></i> Profile</Link>
                        <Link to="/dashboard/studentslist" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-sharp fa-solid fa-graduation-cap"></i> Students</Link>
                        <Link to="/dashboard/teacherslist" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-sharp fa-solid fa-person-chalkboard"></i> Teachers</Link>
                        <Link to="/dashboard/teacherslist" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-solid fa-camera"></i> Zoom Meeting</Link>
                        {/* <Link className="nav-link" to="/line-chart">Line Chart</Link> */}
                        <div className="dropdown nav-item">
                            {/* <ul className="dropdown-menu">
                                </ul> */}
                            <div class="accordion" id="accordionExample">
                                <div class="accordion-item">
                                    {/* <h2 class="accordion-header" id="headingOne"> */}
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                        <Link to="/dashboard/teacherslist" className="text-white"> <i className="fa-solid fa-people-group"></i> Charts
                                        </Link>
                                    </button>
                                    {/* </h2> */}
                                    <div id="collapseOne" class="accordion-collapse collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
                                        <div class="accordion-body">
                                            <Link className="dropdown-item" to="/line-chart">Line Chart</Link>
                                            <Link className="dropdown-item" to="/bar-chart">Bar Chart</Link>
                                            <Link className="dropdown-item" to="/stackedbar-chart">StackedBar Chart</Link>
                                            <Link className="dropdown-item" to="/pie-chart">Pie Chart</Link>
                                            <Link className="dropdown-item" to="/area-chart">Area Chart</Link>
                                            <Link className="dropdown-item" to="/stackedarea-chart">StackedArea Chart</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <Link to="/dashboard/library" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-solid fa-book"></i> Library</Link>
                        <Link to="/dashboard/teacherslist" className="Sidebarbtn justify-content-center text-white mt-2"><i className="fa-solid fa-gear"></i> Setting</Link>
                        <div className="url d-flex justify-content-start align-items-left">
                            <button className='btn Sidebarbtn text-white mt-2' onClick={handleRemoveCookie}><i className="fa-solid fa-right-from-bracket"></i> Logout</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
