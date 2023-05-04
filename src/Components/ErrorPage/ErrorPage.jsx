import React from 'react'
import './errorpage.scss'
import { Link, useRouteError } from 'react-router-dom'
const ErrorPage = () => {
    const error = useRouteError()
    console.error(error)
    return (
        <div id="error-page">
            <h1 className='h1'>404</h1>
            <div className="cloak__wrapper">
                <div className="cloak__container">
                    <div className="cloak"></div>
                </div>
            </div>
            <div className="info">
                <h2>We can't find that page</h2>
                <p>We're fairly sure that page used to be here, but seems to have gone missing. We do apologise on it's behalf.</p><Link to={'/'}>Go Back</Link>Home
            </div></div>
    )
}

export default ErrorPage