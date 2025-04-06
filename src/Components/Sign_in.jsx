import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import { useForm } from 'react-hook-form'
import authservice from '../Appwrite/auth'
import { useDispatch } from 'react-redux'
import { login } from '../Store/PexelSlice'
import { Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

const Sign_in = () => {

    const [showpassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors } } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, isError, isPending, mutateAsync } = useMutation({
        mutationFn: async (data) => {
            const loggingIn = await authservice.login(data);

            if (loggingIn instanceof Error) {
                throw error
            } else {
                dispatch(login(loggingIn))
            }
        },
        onSuccess: () => navigate('/home')
        ,
        onError: () => {
            throw new Error("Sign In failed, please try again.")
        }
    })

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Sign in to your account
                    </h2>


                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    {
                        isError && <p className="text-red-500 text-sm capitalize pb-2">{error.message}</p>
                    }

                    <form action="#" className="space-y-6"
                        onSubmit={handleSubmit((data) => mutateAsync(data))}
                    >
                        <div>
                            <label htmlFor="email" className="block text-sm/6 font-medium text-white">
                                Email address
                            </label>

                            {errors.email && (
                                <p className="text-red-500 block text-sm/6 font-medium">{errors.email.message}*</p>
                            )}

                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder='Enter your email'
                                    autoComplete="email"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1fa77e] sm:text-sm/6"

                                    {...register("email", {
                                        required: true,
                                        validate: {
                                            matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                                "Email address must be a valid address",
                                        }
                                    })}
                                />
                            </div>
                        </div>

                        <div className='relative'>
                            <div onClick={() => setShowPassword(!showpassword)}
                                className='absolute right-0 bottom-1'>
                                {
                                    !showpassword ? <Eye className='mr-2 hover:cursor-pointer text-black' /> : <EyeOff className='mr-2 hover:cursor-pointer text-black' />
                                }
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm/6 font-medium text-white">
                                    Password
                                </label>

                                {errors.password && (
                                    <p className="text-red-500 block text-sm/6 font-medium">
                                        {errors.password.message}*</p>
                                )}
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type={showpassword ? "text" : "password"}
                                    placeholder='Enter your password'
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-button-color sm:text-sm/6"
                                    {...register("password", {
                                        required: true,
                                        validate: {
                                            minLength: (value) =>
                                                value.length >= 8 || "Password must be at least 8 characters long",
                                            hasNumber: (value) =>
                                                /\d/.test(value) || "Password must contain at least one number",
                                            hasCharacter: (value) =>
                                                /[a-zA-Z]/.test(value) || "Password must contain at least one letter",
                                        },
                                    })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-button-color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-button-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-color"
                            >
                                {
                                    isPending ? <>
                                        Signing In...
                                    </> : <>
                                        Sign In
                                    </>
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Not a member?{' '}
                        <Link to='/sign_up' className="font-semibold text-button-color hover:text-button-color">
                            Sign Up
                        </Link>

                    </p>
                </div>
            </div>
        </>
    )
}



export default Sign_in
