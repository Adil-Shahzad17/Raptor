import React, { useState, useRef } from 'react'
import homebg from "../Assets/homebg.jpg"
import { Photos } from "../Components/index"
import { ScanSearch } from 'lucide-react'
import pexels from '../Pexels/Pexels'
import { Link } from 'react-router-dom'
import { Bars } from 'react-loading-icons'

const Home = () => {

    const [searchQuery, setSearchQuery] = useState('random');
    const [page, setPage] = useState(1);
    const ref = useRef();

    const {
        isSuccess,
        isPending,
        isError,
        error,
        data,
        isFetching,
        isPlaceholderData
    } = pexels.usePexelsImages(searchQuery, page);

    const onSearch = () => {
        setSearchQuery(ref.current?.value ? ref.current.value.trim() : 'random');
        setPage(1);
    };



    return (
        <>
            <div className='bg-[#000] w-full h-2/3 pt-[75px] bg-cover text-white lg:h-[75%] xl:h-[85%]'
                style={{
                    backgroundImage: `url(${homebg})`, backgroundPosition: 'center 20%'
                }}
            >

                <div className='w-full h-full bg-[#000]/45 flex justify-center items-center flex-col'>
                    <h1 className='text-5xl font-bold md:text-7xl'>RAPTOR</h1>
                    <h2 className='capitalize px-7 text-center text-xl mt-4 md:text-3xl'>One touch of nature makes the whole world kin.</h2>

                    <div className="relative mt-6 w-[250px] sm:w-[300px] md:w-[500px]">
                        <input
                            className="w-full px-3 py-3 pl-14 sm:pl-20 rounded-xl tracking-[1px] outline-none 
                            bg-white hover:border-gray-300 focus:bg-gray-50 focus:border-gray-400
                            transition-all duration-200 border border-gray-200 text-black"
                            type="text"
                            id='#'
                            ref={ref}
                            placeholder="Search for photos"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                    onSearch();
                                }
                            }}
                        />

                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2">
                            <ScanSearch color='black' size={36} className='hover:cursor-pointer hover:scale-125
                            transition-transform duration-1000                   hover:rotate-[360deg]'
                                onClick={() => onSearch()}
                            />
                        </span>
                    </div>
                    <p className='mt-3 text-sm tracking-[2px]'>Powered by <Link to="https://www.pexels.com/" target='blank'>Pexels</Link> </p>
                    {
                        isError && <p className='mt-3 text-sm'>{error.message}</p>
                    }

                    {
                        (isPending || isFetching) && <Bars speed={.50} height="30px" width="30px" className='mt-3' />

                    }
                </div>
            </div>

            {
                isSuccess && <> <Photos photos={data} />

                    <div className='h-auto py-3 flex justify-center items-center bg-white'>
                        <div className='max-w-[760px] min-w-[300px] w-full flex flex-row justify-center items-center' >


                            {
                                data.page > 1 &&
                                <button
                                    onClick={() => setPage(old => Math.max(old - 1, 1))}
                                    disabled={page === 1 || isFetching}
                                    className='mx-auto my-2 rounded-lg text-base py-2 px-4 hover:cursor-pointer bg-black'>
                                    Previous Page
                                </button>
                            }

                            <p
                                className='mx-auto my-2 rounded-lg text-base py-2 px-4 hover:cursor-default  bg-button-color'>
                                {page}</p>

                            {
                                data.next_page &&
                                <button
                                    onClick={() => {
                                        if (!isPlaceholderData && data?.next_page) {
                                            setPage(old => old + 1)
                                        }
                                    }}
                                    disabled={isPlaceholderData || !data?.next_page || isFetching}
                                    className='mx-auto my-2 rounded-lg text-base py-2 px-4 hover:cursor-pointer bg-black'>
                                    Next Page
                                </button>
                            }

                        </div>

                    </div>
                </>
            }
        </>
    )
}

export default Home