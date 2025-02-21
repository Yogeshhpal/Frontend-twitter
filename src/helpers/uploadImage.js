
const uploadImage = async (image) => {
    const url = `https://api.cloudinary.com/v1_1/dwilc78qs/image/upload`;
    const formData = new FormData();

    formData.append("file", image);
    formData.append("upload_preset", "mern_product");

    try {
        const dataResponse = await fetch(url, {
            method: "POST",
            body: formData,
        });

        if (!dataResponse.ok) {
            throw new Error(`HTTP error! status: ${dataResponse.status}`);
        }

        const data = await dataResponse.json();
        // console.log("upload image , ", data);
        return data;
    } catch (error) {
        console.error("Error uploading image:", error);
        return null;  // or handle the error as needed
    }
};

export default uploadImage;
