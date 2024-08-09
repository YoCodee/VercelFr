import { useState } from "react";
import "./newPostPage.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function NewPostPage() {
  const [value, setValue] = useState("");
  const [images, setImages] = useState([]);
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();
  const {user} = useSelector((state)=> state.auth)


  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);
    const userId = user._id
    console.log(userId)
    try {
      await axios.post("https://vercelhs.vercel.app/api/post", {
        ...inputs,
        images,
        description: value,
        userId,
      });
      setShowAlert(true); // Show the success alert
      setTimeout(() => {
        navigate("/"); // Redirect after 3 seconds
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="newPostPage pl-8">
      <div className="formContainer mt-4">
        <h1 className="text-2xl pt-4 px-4 py-4 bg-cyan-500 max-w-fit text-white rounded-lg">
          Add New Post
        </h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" />
            </div>
            <div className="item">
              <label htmlFor="price">Price</label>
              <input id="price" name="price" type="number" />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" />
            </div>
            <div className="item description">
              <label htmlFor="description">Description</label>
              <ReactQuill theme="snow" id="description" name="description" onChange={setValue} value={value} />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" />
            </div>
            <div className="item">
              <label htmlFor="Latitude">Latitude</label>
              <input id="Latitude" name="Latitude" type="text" />
            </div>
            <div className="item">
              <label htmlFor="Longitude">Longitude</label>
              <input id="Longitude" name="Longitude" type="text" />
            </div>
            <button className="sendButton">Add</button>
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="" />
        ))}
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
      {showAlert && (
        <div className="flex w-96 shadow-lg rounded-lg fixed bottom-4 right-4">
          <div className="bg-green-600 py-4 px-6 rounded-l-lg flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="text-white fill-current" viewBox="0 0 16 16" width="20" height="20">
              <path fillRule="evenodd" d="M13.78 4.22a.75.75 0 010 1.06l-7.25 7.25a.75.75 0 01-1.06 0L2.22 9.28a.75.75 0 011.06-1.06L6 10.94l6.72-6.72a.75.75 0 011.06 0z"></path>
            </svg>
          </div>
          <div className="px-4 py-6 bg-white rounded-r-lg flex justify-between items-center w-full border border-l-transparent border-gray-200">
            <div>Success alert</div>
            <button onClick={() => setShowAlert(false)}>
              <svg xmlns="http://www.w3.org/2000/svg" className="fill-current text-gray-700" viewBox="0 0 16 16" width="20" height="20">
                <path fillRule="evenodd" d="M3.72 3.72a.75.75 0 011.06 0L8 6.94l3.22-3.22a.75.75 0 111.06 1.06L9.06 8l3.22 3.22a.75.75 0 11-1.06 1.06L8 9.06l-3.22 3.22a.75.75 0 01-1.06-1.06L6.94 8 3.72 4.78a.75.75 0 010-1.06z"></path>
              </svg>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default NewPostPage;
