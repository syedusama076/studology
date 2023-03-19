import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserCookie } from '../helpers/BrowserCookies'
import Axios from "axios"

const AdminProtected = (props) => {
    const { Page } = props

    const navigate = useNavigate('')
    useEffect(() => {
        const UserToken = BrowserCookie()
        const token = UserToken.UserToken;
        if (!token) {
            return navigate('/login')
        }
        try {
            const UserToken = BrowserCookie()
            const token = UserToken.UserToken;
            Axios.get("http://localhost:3001/admin-dashboard",
                {
                    headers: {
                        'authorization': `${token}`,
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                }).then((response) => {
                    let userData = response.data;
                    if (userData.TeachingExperience) {
                        navigate("/teacherprofile")
                    } else if (userData.StudentClass) {
                        navigate("/myprofile")
                    } else if (userData.UserName) {
                        navigate("/dashboard")
                    }
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.error(error)
        }
    }, [])
    return (
        <div>
            <Page />
        </div>
    )
}

export default AdminProtected