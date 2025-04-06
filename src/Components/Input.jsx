import React, { forwardRef, useId } from 'react'

function Input({ label, type, classname = "", ...props }, ref) {

    const id = useId()

    return (
        <div className={`block text-sm/6 font-medium text-white ${classname}`}>
            {label && <label
                className='inline-block'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-[#1fa77e] sm:text-sm/6" ${classname}`}
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
}

export default forwardRef(Input)