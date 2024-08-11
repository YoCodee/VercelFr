import { useState, useEffect } from "react";
import "../newPostPage/newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate, useParams } from "react-router-dom";

function UpdatePost() {
    const [value, setValue] = useState("");
    const [images, setImages] = useState([]);
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [Latitude, setLatitude] = useState("");
    const [Longitude, setLongitude] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch the post data by id to populate the form for editing
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://vercelhs.vercel.app/api/post/${id}`);
                const post = response.data;
                setTitle(post.title);
                setPrice(post.price);
                setAddress(post.address);
                setCity(post.city);
                setLatitude(post.Latitude);
                setLongitude(post.Longitude);
                setValue(post.description);
                setImages(post.images || []);
            } catch (error) {
                console.error("Error fetching the post data", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = {
            title,
            price,
            address,
            city,
            Latitude,
            Longitude,
            description: value,
            images
        };

        try {
            await axios.put(`https://vercelhs.vercel.app/api/post/${id}`, updatedPost);
            navigate(`/`);
        } catch (error) {
            console.error("Error updating the post", error);
        }
    };

    const handleDelete = (index) => {
        setImages(prevImages => prevImages.filter((_, i) => i !== index));
    };

    return (
        <div className="newPostPage pl-8">
            <div className="formContainer mt-4">
                <h1 className="text-2xl pt-4 px-4 py-4 bg-cyan-500 max-w-fit text-white rounded-lg">Update Post</h1>
                <div className="wrapper">
                    <form onSubmit={handleSubmit}>
                        <div className="item">
                            <label htmlFor="title">Title</label>
                            <input
                                id="title"
                                name="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="price">Price</label>
                            <input
                                id="price"
                                name="price"
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="address">Address</label>
                            <input
                                id="address"
                                name="address"
                                type="text"
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="item description">
                            <label htmlFor="description">Description</label>
                            <ReactQuill
                                theme="snow"
                                id="description"
                                name="description"
                                onChange={setValue}
                                value={value}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="city">City</label>
                            <input
                                id="city"
                                name="city"
                                type="text"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="Latitude">Latitude</label>
                            <input
                                id="Latitude"
                                name="Latitude"
                                type="text"
                                value={Latitude}
                                onChange={(e) => setLatitude(e.target.value)}
                            />
                        </div>
                        <div className="item">
                            <label htmlFor="Longitude">Longitude</label>
                            <input
                                id="Longitude"
                                name="Longitude"
                                type="text"
                                value={Longitude}
                                onChange={(e) => setLongitude(e.target.value)}
                            />
                        </div>
                        <button className="sendButton">Update</button>
                    </form>
                </div>
            </div>
            <div className="sideContainer">
            {images && images.length > 0 ? (
                    images.map((image, index) => (
                        <div className="wrapperimage" key={index}>
                        <img src={image}alt="" />
                            <button onClick={() => handleDelete(index)}>Delete</button>
                        </div>
                    ))
                ) : (
                    <p>No images available</p>
                )}
                <UploadWidget
                    uwConfig={{
                        multiple: true,
                        cloudName: "lamadev",
                        uploadPreset: "estate",
                        folder: "posts",
                    }}
                    setState={setImages}
                />
            </div>
        </div>
    );
}

export default UpdatePost;
