import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserCookie } from '../helpers/BrowserCookies'
import Axios from "axios"

const AdminProtect2 = (props) => {
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

export default AdminProtect2