import React from 'react'
import contactimage from "../Assets/contactimage.jpg"
import { Input } from "../Components/index"
import { useSelector } from 'react-redux'
import emailjs from '@emailjs/browser';
import config from '../Appwrite/config';
import { useMutation } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

const Contact = () => {

    const userInfo = useSelector((state) => state.pexels.userData)
    const { register, handleSubmit, formState: { errors }, } = useForm()

    const { isError, error, isSuccess, isPending, mutateAsync } = useMutation({
        mutationFn: async (data) => {

            const templateParams = {
                from_name: data.name,
                reply_to: data.email,
                message: data.msg,
                to_name: "Adil"
            };

            await emailjs.send(
                config.EMAIL_JS_SERVICE_ID,
                config.EMAIL_JS_TEMPLATE_ID,
                templateParams,
                config.EMAIL_JS_PUBLIC_KEY)
        },
        onError: () => {
            throw new Error("Failed to send the message.")
        }
    }
    )

    return (

        <div className='w-full pt-10 bg-cover '
            style={{ backgroundImage: `url(${contactimage})`, backgroundPosition: "center 5%" }}>

            <div className='w-full h-full bg-black/85 py-[75px] flex flex-col justify-center items-center
             '>

                <div className='w-auto h-auto flex flex-col gap-5 justify-center items-centers'>
                    <p className='text-white text-3xl sm:text-5xl font-bold'>
                        Contact Us<span className='text-button-color text-7xl'>.</span>
                    </p>
                </div>

                {
                    isSuccess && <p className="text-button-color block text-sm/6 font-medium">
                        Email Sent Successfully
                    </p>
                }
                {
                    isError && <p className="text-button-color block text-sm/6 font-medium">
                        {error.message}
                    </p>
                }

                <form className='bg-black/65 w-[90%] min-w-[300px] max-w-[500px] mt-5 rounded-lg p-2 flex flex-col gap-4'
                    onSubmit={handleSubmit((data) => mutateAsync(data))}>

                    {errors.name && (
                        <p className="text-red-500 block text-sm/6 font-medium">{errors.name.message}*</p>
                    )}

                    <Input label="Name" type="text" placeholder="Name"
                        className="w-[95%]  p-3 bg-transparent text-white outline-none focus:border-b focus:border-b-[#3c6e71]"
                        {...register("name", { required: "Name is required" })} />

                    {errors.email && (
                        <p className="text-red-500 block text-sm/6 font-medium">{errors.email.message}*</p>
                    )}

                    <Input label="Email" type="email" placeholder="Email"
                        defaultValue={userInfo?.email || ''}
                        className="w-[95%] p-3 bg-transparent text-white outline-none focus:border-b focus:border-b-[#3c6e71]"
                        {...register("email",
                            {
                                required: "Email is required", validate: {
                                    matchPatern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                                        "Email address must be a valid address",
                                }
                            })} />

                    {errors.msg && (
                        <p className="text-red-500 block text-sm/6 font-medium">{errors.msg.message}*</p>
                    )}

                    <textarea name="msg" id="msg" placeholder='Wrtie your message here | upto 1000 Characters...'
                        maxLength={1000}
                        className='border border-lightColor outline-none font-body max-w-[800px] h-[400px] text-black rounded-lg p-3 resize-none'
                        {...register("msg", { required: "Message is required" })} />

                    <button type='submit'
                        className=" w-[200px] mx-auto flex justify-center rounded-md bg-button-color px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-button-color focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-button-color"
                    >
                        {
                            isPending ? <>Sending Message...</> : <>Send Message</>
                        }
                    </button>

                </form>
            </div>

        </div>
    );
}

export default Contact