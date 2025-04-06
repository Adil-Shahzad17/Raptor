import React from 'react'
import { Bars } from 'react-loading-icons'

const Loading = () => {
    return (
        <div className='bg-black text-white text-3xl h-screen grid place-content-center'>
            <Bars speed={.90} height="60px" width="60px" className='mx-auto' />
        </div>
    )
}

export default Loading