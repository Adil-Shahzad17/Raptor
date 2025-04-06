import React, { useState } from 'react'
import { X, Menu } from "lucide-react"
import BoneRaptor from "../Assets/bone.png"
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ArrowLeftFromLine } from 'lucide-react'

const Header = () => {

    const [nav, setNav] = useState(true);
    const navigate = useNavigate()

    const auth = useSelector((state) => state.pexels.status)

    const raptorlogoHandle = () => {
        if (auth) {
            navigate('/home')
        } else {
            navigate('/guestPage')
        }
    }

    return (
        <nav className='w-full max-w-[1700px] mx-auto h-[75px] bg-white fixed flex justify-between border-b border-b-[#000300] z-50'>
            <div className="h-full w-[100px]  grid place-content-center">
                <img src={BoneRaptor} alt="Raptor" className='w-[55px] h-auto sm:w-[65px] md:w-[75px] lg:w-[95px] 
                xl:w-[105px] lg:pl-5 hover:cursor-pointer'
                    onClick={raptorlogoHandle} />
            </div>


            <ul className='gap-10 hidden sm:flex flex-row items-center justify-center h-full pr-4 font-semibold'>

                {
                    auth && <NavLink to='/home' className={({ isActive }) => `py-2 px-4 rounded-lg font-sans  text-md outline-none hover:bg-black hover:text-white ${isActive ? "bg-black " : "bg-button-color"}`}>
                        Home
                    </NavLink>
                }

                {
                    auth && <NavLink to='/contact' className={({ isActive }) => `py-2 px-4 rounded-lg font-sans  text-md outline-none hover:bg-black hover:text-white ${isActive ? "bg-black " : "bg-button-color"}`}>
                        Contact
                    </NavLink>
                }

                {
                    !auth && <Link to='/sign_in' className='px-4 py-2 bg-button-color rounded-lg text-white 
                    font-sans  text-md outline-none hover:bg-black'>
                        <p>Sign in</p>
                    </Link>
                }

                {
                    !auth && <Link to='/sign_up' className='px-4 py-2 bg-button-color rounded-lg text-white 
                    font-sans  text-md outline-none hover:bg-black'>
                        <p>Sign Up</p>
                    </Link>
                }

                {
                    auth && <Link to='/logoutbtn' className='px-4 py-2 bg-button-color rounded-lg text-white 
                    font-sans  text-md outline-none hover:bg-black'>
                        <p>Log Out</p>
                    </Link>
                }

            </ul>

            <div onClick={() => setNav(!nav)} className='text-black grid place-content-center px-4 hover:cursor-pointer sm:hidden'>
                {nav ?
                    <Menu size={26} /> : <X size={26} />
                }
            </div>


            <ul className={nav ? 'bg-black border-r border-r-button-color w-[250px] h-screen absolute left-[-180%] top-[75px] ease-in-out duration-1000' : 'bg-black border-r border-r-button-color/70 w-[250px] h-screen absolute left-0 top-[75px] ease-in-out duration-1000'}
                onClick={() => setNav(!nav)} >

                {
                    auth && <li className='p-5 border-b border-b-button-color/70 '><Link to='/home'>Home</Link></li>

                }

                {

                    auth && <li className='p-5 border-b border-b-button-color/70 '><Link to='/contact'>Contact</Link></li>
                }

                {
                    !auth && <li className='p-5 border-b border-b-button-color/70 '> <Link to='/sign_in' className='bg-button-color px-4 py-2 rounded-lg ' >Sign In</Link></li>
                }

                {
                    !auth && <li className='p-5 border-b border-b-button-color/70 '> <Link to='/sign_up' className='bg-button-color px-4 py-2 rounded-lg ' >Sign Up</Link></li>
                }

                {
                    auth && <li className='p-5 border-b border-b-button-color/70 '> <Link to='/logoutbtn' className='bg-button-color px-4 py-2 rounded-lg ' >Log Out</Link></li>
                }

                <li className='pl-6 pb-4 mt-3 text-button-color'>
                    <ArrowLeftFromLine />
                </li>

            </ul>

        </nav>
    )
}

export default Header