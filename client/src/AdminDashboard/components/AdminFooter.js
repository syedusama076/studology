import React from 'react'
import { Link } from 'react-router-dom'

export const AdminFooter = () => {

    return (
        <div
            className="text-center text-white bg-dark p-4 Afooter">
            © 2022 Copyright:
            <Link className="text-reset fw-bold" to="/">
                Studology.com
            </Link>
        </div>
    )
}
