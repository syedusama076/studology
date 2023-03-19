import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { BrowserCookie } from '../helpers/BrowserCookies'

const Protected = (props) => {
    const { Page } = props

    const navigate = useNavigate('')
    useEffect(() => {
        const verifiedToken = BrowserCookie()
        if (!verifiedToken.UserToken) {
            navigate('/login')
        }
    }, [])
    return (
        <div>
            <Page />
        </div>
    )
}

export default Protected