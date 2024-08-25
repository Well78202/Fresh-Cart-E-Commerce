import React, { useContext } from 'react'
import { AuthContext } from '../../Contexts/AuthContext'
import Login from '../../Components/Login/Login'

export default function ProtectedRoutes({ children }) {
    const { userToken } = useContext(AuthContext)
    return (
        <>
            {
            userToken ? children : <Login/>
            }
        </>
    )
}
