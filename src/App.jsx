import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { Header } from "./Components/index"
import { useDispatch } from 'react-redux'
import authservice from './Appwrite/auth'
import { login, logout } from "./Store/PexelSlice"
import { useQuery } from '@tanstack/react-query'
import { Bars } from 'react-loading-icons'

const App = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const checkingUser = async () => {

        try {
            const userdata = await authservice.getCurrentUser()

            if (userdata) {
                dispatch(login({ userData: userdata }))
                navigate('/home')
            } else {
                dispatch(logout());
                navigate('/guestPage')
            }
            return userdata
        } catch (error) {
            throw new Error(error.message)
        }
    }

    const getCurrentUser = useQuery({
        queryKey: ["getUser"], queryFn: checkingUser, enabled: false, staleTime: 1000 * 60 * 10,
    });

    React.useEffect(() => {
        if (localStorage.getItem("cookieFallback") === '[]' || localStorage.getItem("cookieFallback") === null) {
            navigate('guestPage')
        }
        else {
            getCurrentUser.refetch()
        }
    }, []);

    return (
        getCurrentUser.isFetching ?
            <div className='bg-black text-white text-3xl h-screen grid place-content-center'>
                <Bars speed={.90} height="60px" width="60px" className='mx-auto' />
            </div>
            : <div className='bg-black w-full max-w-[1700px] mx-auto h-full'>
                <Header />
                <Outlet />
            </div>

    )
}

export default App