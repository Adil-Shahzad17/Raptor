import React, { useState } from 'react'
import { useForm } from "react-hook-form"
import authservice from "../Appwrite/auth"
import { login } from "../Store/PexelSlice"
import { useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useMutation } from '@tanstack/react-query'

const Sign_up = () => {

    const [showpassword, setShowPassword] = useState(false)

    const { register, handleSubmit, formState: { errors }, } = useForm()
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const { error, isError, isPending, mutateAsync } = useMutation({
        mutationFn: async (data) => {

            if (data.password !== data.confirm_password) {
                throw new Error("Passwords do not match")
            }

            const accountCreated = await authservice.createAccount(data);

            if (accountCreated instanceof Error) {
                throw error
            } else {
                dispatch(login(accountCreated))
            }
        },
        onSuccess: () => navigate("/home")
        ,
        onError: () => {
            throw new Error("Sign Up Failed, please try again.")
        }
    })

    return (

        <>
            <div className="min-w-[320px]flex flex-1 flex-col justify-center px-6 py-10 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm pt-6">
                    <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-white">
                        Create Your Account Today
                    </h2>


                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
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
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1fa77e] sm:text-sm/6"
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
                            <div className='mt-5'>
                                <label htmlFor="confirm_password" className="block text-sm/6 font-medium text-white">
                                    Confirm Password
                                </label>

                                {errors.confirm_password && (
                                    <p className="text-red-500 block text-sm/6 font-medium">
                                        {errors.confirm_password.message}*</p>
                                )}

                            </div>
                            <div className="mt-2">
                                <input
                                    id="confirm_password"
                                    name="confirm_password"
                                    type={showpassword ? "text" : "password"}
                                    placeholder='Confirm your password'
                                    autoComplete="current-password"
                                    className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1fa77e] sm:text-sm/6"
                                    {...register("confirm_password", {
                                        required: true,
                                    })}
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-[#1fa77e] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-[#1fa77e] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1fa77e]"
                            >
                                {
                                    isPending ? <>
                                        Signing Up...
                                    </> : <>
                                        Sign Up
                                    </>
                                }
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm/6 text-gray-500">
                        Already have an account?{' '}
                        <Link to='/sign_in' className="font-semibold text-[#1fa77e] hover:text-[#1fa77e]">
                            Sign In
                        </Link>

                    </p>
                </div>
            </div>
        </>
    )
}

export default Sign_up