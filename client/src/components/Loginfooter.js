import React from 'react'
import { Link } from 'react-router-dom'
export const Loginfooter = () => {
    let styling = {
        background_color: "rgba(0, 0, 0, 0.025)"
    }
    return (
        <div
            className="text-center p-4"
            style={styling}
        >
            © 2022 Copyright:
            <Link className="text-reset fw-bold" to="/">
                Studology.com
            </Link>
        </div>
    )
}
