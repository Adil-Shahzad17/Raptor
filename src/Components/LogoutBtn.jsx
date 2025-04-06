import React from 'react'
import { Link } from 'react-router'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router'
import { logout } from "../Store/PexelSlice"
import authservice from '../Appwrite/auth'
import { TailSpin } from 'react-loading-icons'
import { useMutation } from '@tanstack/react-query'

const LogoutBtn = () => {

    const authdispatch = useDispatch()
    const navigate = useNavigate()

    const { isPending, isError, error, mutateAsync } = useMutation({
        mutationFn: async () => {
            await authservice.logOut()
        },
        onSuccess: () => {
            authdispatch(logout())
            navigate('/guestPage')
        },
        onError: () => {
            throw new Error("Unable to LogOut user")
        }
    })


    return (
        <div className='flex flex-col gap-5 justify-center items-center h-screen'>

            {
                isError && <p className='my-3 font-heading text-xl text-red-600'>{error.message}</p>
            }

            <div className='mx-3 p-5 border border-white/20 rounded-xl sm:p-8'>
                <h1 className='font-heading font-bold text-lg text-center sm:text-xl'>Are you sure you want to sign out?</h1>

                <div className='w-full flex justify-around mt-3'>
                    <Link to="/home">
                        <button
                            className="w-20 flex justify-center rounded-md bg-button-color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-button-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-color"
                        >

                            No
                        </button>
                    </Link>
                    <button onClick={mutateAsync} className="w-20 flex justify-center rounded-md bg-button-color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-button-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-color">
                        Yes

                    </button>

                </div>
            </div>

            {
                isPending &&
                <>
                    <div className='flex items-center gap-5 font-body'>

                        <TailSpin height="50px" width="50px" />
                        Logging Out...
                    </div>
                </>

            }

        </div>
    )
}

export default LogoutBtn