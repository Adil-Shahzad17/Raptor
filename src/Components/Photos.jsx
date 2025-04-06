import React, { useEffect, useRef } from 'react'
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry"
import { saveAs } from "file-saver"
import { CloudDownload } from 'lucide-react'
import '../index.css'

const Photos = ({ photos }) => {

    const photo = photos.photos;


    const downloadImage = (url, filename) => {
        saveAs(url, filename);
    };


    return (
        <div className='w-full h-auto p-4 mm:px-6 sm:px-8 md:px-10 bg-white text-black overflow-auto'>

            {
                photo.length > 0 ?
                    <ResponsiveMasonry
                        columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}
                        gutterBreakpoints={{ 350: "12px", 750: "16px", 900: "24px" }}
                    >
                        <Masonry>
                            {
                                photo.map((photo) => (
                                    <div key={photo.id} className='relative'>
                                        <div className='absolute w-full h-full rounded-lg bg-black/70 flex justify-center items-center opacity-0 hover:opacity-100 transition duration-300'>
                                            <CloudDownload size={70} color='white'
                                                onClick={() => downloadImage(photo.src.original, `${photo.alt}-${photo.id}.jpg`)}
                                                className='cursor-pointer' />
                                        </div>

                                        <div className='rounded-lg bg-gray-500 animate-pulse'>
                                            <img
                                                src={photo.src.large}
                                                loading='lazy'
                                                alt='Image'
                                                className='rounded-lg opacity-0 transition-opacity duration-300'
                                                onLoad={(e) => {
                                                    e.target.classList.remove('opacity-0');
                                                    e.target.parentElement.classList.remove('bg-gray-200', 'animate-pulse');
                                                }}
                                            />
                                        </div>
                                    </div>
                                ))
                            }
                        </Masonry>

                    </ResponsiveMasonry>
                    : (
                        <div>No results found.</div>
                    )}

        </div>
    );


}

export default Photos