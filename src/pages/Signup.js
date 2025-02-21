import React, { useState } from 'react'
import loginIcons from '../assest/signin.gif'
import { FaEye } from 'react-icons/fa'
import { FaEyeSlash } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import { ImageToBase64 } from '../helpers/imageToBase64'
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const Signup = () => {
    //Hooks
    const [showPassword, setshowPassword] = useState(false);
    const [showConfirmPassword, setshowConfirmPassword] = useState(false);
    const [data, setData] = useState({
        email: "",
        password: "",
        name: "",
        confirmPassword: "",
        profilePic: ""
    })
    const navigate = useNavigate();


    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    const handleUploadPic = async (e) => {
        const file = e.target.files[0];
        // console.log("file",file);
        const imagePic = await ImageToBase64(file);
        // console.log("imagePic",imagePic);
        setData((prev) => {
            return {
                ...prev,
                profilePic: imagePic
            }
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.password === data.confirmPassword) {
            const dataResponse = await fetch(SummaryApi.signUP.url, {
                method: SummaryApi.signUP.method,
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            })
            const dataApi = await dataResponse.json();

            if (dataApi.success) {
                toast.success(dataApi.message)
                navigate("/login")
            }
            if (dataApi.error) {
                toast.error(dataApi.message)
            }
            // console.log("dataApi : ", dataApi);
        }
        else {
            toast.error("Please check password and confirm password");
        }
    }

    // console.log("Sign up : ", data);



    return (
        <>
            <section id="signup">
                <div className='mx-auto container p-4'>

                    <div className="bg-white  p-5 w-full max-w-sm mx-auto">

                        <div className='w-20 h-20 mx-auto relative overflow-hidden rounded-full'>
                            <div>
                                <img src={data.profilePic || loginIcons} alt="login icons" />
                            </div>

                            <form >
                                <label>

                                    <div className='text-xs bg-slate-200 bg-opacity-80 pb-4 pt-2 cursor-pointer text-center absolute bottom-0 w-full'>
                                        Upload Photo
                                    </div>
                                    <input type="file" name="" id="" className='hidden' onChange={handleUploadPic} />

                                </label>
                            </form>

                        </div>

                        <form className='pt-6 flex flex-col gap-2' onSubmit={handleSubmit}>
                            <div className='grid'>
                                <label>Name : </label>

                                <div className='bg-slate-100 p-2'>
                                    <input type="text"
                                        name="name" value={data.name}
                                        placeholder='Enter Name'
                                        className='w-full h-full outline-none'
                                        onChange={handleOnChange} required />
                                </div>

                            </div>


                            <div className='grid'>
                                <label>Email : </label>

                                <div className='bg-slate-100 p-2'>
                                    <input type="email"
                                        name="email" value={data.email}
                                        placeholder='Enter Email'
                                        className='w-full h-full outline-none'
                                        onChange={handleOnChange} required />
                                </div>

                            </div>

                            <div>
                                <label>Password : </label>

                                <div className='bg-slate-200 flex'>

                                    <input type={showPassword ? "text" : "password"}
                                        name="password" value={data.password}
                                        placeholder='Enter Password'
                                        className='w-full h-full outline-none'
                                        onChange={handleOnChange} required />
                                    <div className='cursor-pointer text-xl' onClick={() => setshowPassword((prev) => !prev)}>
                                        <span>
                                            { 
                                                showPassword ? (
                                                    <FaEyeSlash />
                                                )
                                                    :
                                                    (
                                                        <FaEye />
                                                    )
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <label>Confirm Password : </label>

                                <div className='bg-slate-200 flex'>

                                    <input type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword" value={data.confirmPassword}
                                        placeholder='Enter Confirm Password'
                                        className='w-full h-full outline-none'
                                        onChange={handleOnChange} required />
                                    <div className='cursor-pointer text-xl' onClick={() => setshowConfirmPassword((prev) => !prev)}>
                                        <span>
                                            {
                                                showConfirmPassword ? (
                                                    <FaEyeSlash />
                                                )
                                                    :
                                                    (
                                                        <FaEye />
                                                    )
                                            }
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <button className='bg-red-600 text-white px-6 py-2 w-full max-w-[150px] rounded-full hover:scale-110 transition-all mx-auto block mt-6 hover:bg-red-700'>Sign up</button>

                        </form>
                        <p className='my-5'>Already have an account ? <Link to={"/login"} className='text-red-600 hover:text-red-700 hover:underline'>Login</Link></p>
                    </div>

                </div>
            </section>
        </>

    )
}

export default Signup