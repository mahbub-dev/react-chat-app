import React from 'react'
import { useGlobalContext } from '../context'
import { Navigate } from 'react-router-dom'
const AuthRoutes = ({ children }) => {
    const { loggedUser } = useGlobalContext()
    if (loggedUser) {
        return <Navigate to={`/t/${localStorage.getItem('convId')}`} />
    }
    return children
}
const HomeRoutes = ({ children }) => {
    const { loggedUser } = useGlobalContext()
    if (loggedUser) {
        return children
    }
    return <Navigate to={`/auth`} />
}

export { AuthRoutes, HomeRoutes }