import React , {useState,useEffect} from 'react'
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "../addBooking/addBooking.scss";
import { useSelector } from "react-redux";


const UpdateBooking = () => {
    const [value, setValue] = useState("");
    const [packages, setPackages] = useState([]);
    const [selectedPackage, setSelectedPackage] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [TotalDays, setTotalDays] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get user from Redux state
    const query = new URLSearchParams(location.search);
    const postId = query.get('postId');

    console.log(postId)
    useEffect(() => {
        // Fetch packages from API
        axios.get('https://vercelhs.vercel.app/api/package')
            .then(response => {
                setPackages(response.data);
            })
            .catch(error => {
                console.error('Error fetching packages:', error);
            });
    }, []);

    useEffect(() => {
        // Fetch the post data by id to populate the form for editing
        const fetchPost = async () => {
            try {
                const response = await axios.get(`https://vercelhs.vercel.app/api/booking/${id}`);
                const post = response.data;
                const formattedDate = new Date(post.visitDate).toISOString().split('T')[0];
                setName(post.name);
                setPhone(post.phone);
                setNumberOfPeople(post.numberOfPeople);
                setVisitDate(formattedDate);
                setTotalDays(post.TotalDays);
                setSelectedPackage(post.packageId);
                setValue(post.additionalNotes);
                setImages(post.images || []);
                console.log(post.name)
            } catch (error) {
                console.error("Error fetching the post data", error);
            }
        };
        fetchPost();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const updatedPost = {
            postId,
            name,
            phone,
            numberOfPeople,
            visitDate,
            TotalDays,
            packageId: selectedPackage,
            additionalNotes: value
        };
        try {
            await axios.put(`https://vercelhs.vercel.app/api/booking/${id}`, updatedPost);
            navigate('/');
        } catch (error) {
            console.error('Error updating the post:', error);
        }
    }
  return (
    <div className="newPostPage pl-8">
    <div className="formContainer mt-4">
        <h1 className="text-2xl pt-4 px-4 py-4 bg-cyan-500 max-w-fit text-white rounded-lg font-bold">Add New Booking</h1>
        <div className="wrapper ">
            <form onSubmit={handleSubmit}>
                <div className="item">
                    <label htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div className="item">
                    <label htmlFor="phone">Phone</label>
                    <input id="phone" name="phone" type="number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                </div>
                <div className="item">
                    <label htmlFor="numberOfPeople">Number of People</label>
                    <input id="numberOfPeople" name="numberOfPeople" type="number" value={numberOfPeople} onChange={(e) => setNumberOfPeople(e.target.value)} />
                </div>
                <div className="item description">
                    <label htmlFor="desc">Additional Notes</label>
                    <ReactQuill theme="snow" onChange={setValue} value={value} />
                </div>
                <div className="item">
                    <label htmlFor="TotalDays">Total Days</label>
                    <input id="TotalDays" name="TotalDays" type="number" value={TotalDays} onChange={(e) => setTotalDays(e.target.value)} />
                </div>
                <div className="item">
                    <label htmlFor="bookingDate">Booking Date</label>
                    <input id="bookingDate" name="bookingDate" type="date" value={visitDate} onChange={(e) => setVisitDate(e.target.value)} />
                </div>
                <div className="item">
                    <label htmlFor="package">Package</label>
                    <select id="package" name="package" value={selectedPackage} onChange={(e) => setSelectedPackage(e.target.value)}>
                        <option value="">Select a package</option>
                        {packages.map(pkg => (
                            <option key={pkg.id} value={pkg.id}>{pkg.name}</option>
                        ))}
                    </select>
                </div>
                <button className="sendButton" type="submit">Update</button>
            </form>
        </div>
    </div>
    <div className="sideContainer">
        
        
    </div>
</div>
  )
}

export default UpdateBooking