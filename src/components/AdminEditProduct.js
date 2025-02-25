import React, { useState } from 'react'
import { CgClose } from 'react-icons/cg'
import productCategory from '../helpers/productCategory'
import { FaCloudUploadAlt } from 'react-icons/fa'
import uploadImage from '../helpers/uploadImage'
import DisplayImage from './DisplayImage'
import { MdDelete } from "react-icons/md";
import SummaryApi from '../common'
import { toast } from 'react-toastify'

const AdminEditProduct = ({ onClose, productData, fetchData }) => {

    const [data, setData] = useState({
        ...productData,
        productName: productData?.productName,
        brandName: productData?.brandName,
        category: productData?.category,
        productImage: productData?.productImage || [],
        description: productData?.description,
        price: productData?.price,
        sellingPrice: productData?.sellingPrice
    })
    const [openFullScreenImage, setOpenFullScreenImage] = useState(false)
    const [fullScreenImage, setFullScreenImage] = useState("")

    const [uploadProductImageInput, setUploadProductImageInput] = useState("")

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value
            }
        })

    };

    const handleUploadProduct = async (e) => {
        const file = e.target.files[0];
        setUploadProductImageInput(file.name)
        // console.log("file : ", file);
        const uploadImageCloudinary = await uploadImage(file)

        setData((prev) => {
            return {
                ...prev,
                productImage: [...prev.productImage, uploadImageCloudinary.url]
            }
        })

        // console.log("upload image , ", uploadImageCloudinary.url);
    };


    //delete image by clicking on delete button
    const handleDeleteProductImage = async (index) => {
        const newProductImage = [...data.productImage]
        newProductImage.splice(index, 1);

        setData((prev) => {
            return {
                ...prev,
                productImage: [...newProductImage]
            }
        })

    };


    // Upload Product 
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("data : ",data);

        const response = await fetch(SummaryApi.updateProduct.url, {
            method: SummaryApi.updateProduct.method,
            credentials: 'include',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })

        const responseData = await response.json();
        if (responseData.success) {
            toast.success(responseData?.message)
            onClose();
            fetchData();
        }

        if (responseData.error) {
            toast.error(responseData?.message)
        }

    };

    return (
        <div className='fixed w-full h-full bg-slate-200 bg-opacity-35 top-0 left-0 right-0 bottom-0 flex justify-center items-center'>
            <div className='bg-white p-4 rounded w-full max-w-2xl h-full max-h-[80%] overflow-hidden'>

                <div className='flex justify-between items-center pb-3'>
                    <h2 className='font-bold'>Edit Product</h2>
                    <div className='w-fit ml-auto text-2xl hover:text-red-600 cursor-pointer' onClick={onClose}>
                        <CgClose />
                    </div>
                </div>

                <form className='grid p-4 gap-2 overflow-y-scroll h-full pb-5' onSubmit={handleSubmit}>
                    <label htmlFor="productName">Product Name : </label>
                    <input
                        type="text"
                        id="productName"
                        name="productName"
                        placeholder='Enter Product Name'
                        value={data.productName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100'
                        required
                    />

                    <label htmlFor="brandName" className='mt-3'>Brand Name : </label>
                    <input
                        type="text"
                        id="brandName"
                        name="brandName"
                        placeholder='Enter Brand Name'
                        value={data.brandName}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100'
                        required
                    />

                    <label htmlFor="category" className='mt-3'>Category : </label>
                    <select required name="category" value={data.category} className='p-2 bg-slate-100' onChange={handleOnChange}>
                        <option value={data.category}>Select Category</option>
                        {
                            productCategory.map((cv, index, arr) => {
                                return (
                                    <option key={cv.value + index} value={cv.value}>{cv.label}</option>
                                )
                            })
                        }
                    </select>


                    <label htmlFor="productImage" className='mt-3'>Product Image : </label>
                    <label htmlFor="uploadImageInput">
                        <div className='p-2 bg-slate-100 border rounded h-32 w-full flex justify-center items-center cursor-pointer'>
                            <div className='text-slate-500 flex justify-center items-center flex-col gap-2'>
                                <span className='text-4xl'><FaCloudUploadAlt /></span>
                                <p className='text-sm'>Edit Product Image</p>
                                <input type="file" name="" id="uploadImageInput" className='hidden' onChange={handleUploadProduct} />
                            </div>
                        </div>
                    </label>

                    <div>
                        {
                            data?.productImage[0] ? (
                                <div className='flex items-center gap-2'>
                                    {
                                        data.productImage.map((cv, index, arr) => {
                                            return (
                                                <div className='relative group' key={index}>
                                                    <img
                                                        src={cv}
                                                        alt='cv'
                                                        width={80}
                                                        height={80}
                                                        className='bg-slate-100 border cursor-pointer'
                                                        onClick={() => {
                                                            setOpenFullScreenImage(true)
                                                            setFullScreenImage(cv)
                                                        }
                                                        }
                                                    />
                                                    <div className='absolute bottom-0 right-0 p-1 text-white bg-red-600 rounded-full hidden group-hover:block cursor-pointer' onClick={() => handleDeleteProductImage(index)}>
                                                        <MdDelete />
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            ) : (
                                <p className='text-red-600 text-xs'>*Please Upload Product Image</p>
                            )
                        }
                    </div>

                    <label htmlFor="price" className='mt-3'>Price : </label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder='Enter Price'
                        value={data.price}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100'
                        required
                    />

                    <label htmlFor="sellingPrice" className='mt-3'>Selling Price: </label>
                    <input
                        type="number"
                        id="sellingPrice"
                        name="sellingPrice"
                        placeholder='Enter Selling Price'
                        value={data.sellingPrice}
                        onChange={handleOnChange}
                        className='p-2 bg-slate-100'
                        required
                    />

                    <label htmlFor="description" className='mt-3'>Description : </label>
                    <textarea
                        className='h-28 bg-slate-100 border resize-none p-1'
                        placeholder='Enter Product Description'
                        rows={3}
                        onChange={handleOnChange}
                        name="description"
                        value={data.description}
                    ></textarea>

                    <button className='px-3 py-2 bg-red-600 text-white mb-10 hover:bg-red-700'>Edit Product</button>
                </form>

            </div >



            {/* Display image full screen  */}
            {
                openFullScreenImage && (
                    <DisplayImage onClose={() => setOpenFullScreenImage(false)} imgUrl={fullScreenImage} />
                )
            }

        </div >
    )
}

export default AdminEditProduct