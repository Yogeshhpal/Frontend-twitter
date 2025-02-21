import SummaryApi from "../common";
import { toast } from 'react-toastify';

const addToCart = async (e, id) => {
    e?.stopPropagation();
    e?.preventDefault();

    try {
        const response = await fetch(SummaryApi.addToCartProduct.url, {
            method: SummaryApi.addToCartProduct.method,
            credentials: 'include',
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify({ productId: id })
        });

        const responseData = await response.json();

        if (response.ok) {
            if (responseData.success) {
                // console.log("ResponseData : ",responseData)
                toast.success(responseData.message);
            } else {
                toast.error(responseData.message);
            }
        } else {
            toast.error('Network response was not ok');
        }

        // console.log("responseData---------> : ", responseData);
        return responseData;
    } catch (error) {
        toast.error('There was a problem with the fetch operation');
        // console.error('Fetch error: ', error);
    }
};

export default addToCart;
