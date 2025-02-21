import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import SummaryApi from '../common'
import VerticalCard from '../components/VerticalCard'

const SearchProduct = () => {
    // https://medium.com/@neeleshjoshi001/useparams-usesearchparams-uselocation-07076d6a3521#:~:text=In%20summary%3A,information%20about%20the%20current%20URL.
    const query = useLocation()
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    // console.log("query : ", query.search)


    const fetchProduct = async () => {
        setLoading(true)
        const response = await fetch(SummaryApi.searchProduct.url + query.search);
        const dataResponse = await response.json();
        setLoading(false)

        setData(dataResponse?.data);
        // console.log("dataReponse from searchproduct.js : ", dataResponse);

    }

    useEffect(() => {
        fetchProduct()
    }, [query]) //gives query in dependency array , means whenever query change then we need to call fetchProduct() apis

    return (
        <div className='container mx-auto p-4'>
            {
                loading && (
                    <p className='text-lg text-center'>Loading.... </p>
                )
            }
            <p className='text-lg font-semibold my-3'>Search Results : {data.length} </p>
            {
                data.length === 0 && !loading && (
                    <p className='bg-white text-lg text-center p-4'>No Data Found...</p>
                )
            }

            {
                data.length !== 0 && !loading && (
                    <VerticalCard loading={loading} data={data} />
                )
            }

        </div>
    )
}

export default SearchProduct