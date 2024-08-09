import { useEffect, useState } from "react";
import "./addBooking.scss";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { getMe } from "../../Features/authSlice";
import { useLoaderData, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux"; // Import useSelector to access user state

function AddBooking() {
    const [value, setValue] = useState("");
    const dispatch = useDispatch();
    const [selectedPackage, setSelectedPackage] = useState("");
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [numberOfPeople, setNumberOfPeople] = useState("");
    const [visitDate, setVisitDate] = useState("");
    const [TotalDays, setTotalDays] = useState("");
    const [totalPrice, setTotalPrice] = useState(0); // State for total price
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth); // Get user from Redux state
    const { postId } = useParams(); 
    const [postPrice, setPostPrice] = useState(0); // State for post price
    const { packages } = useLoaderData(); // Ensure this matches the loader function

    // Function to calculate total price
 console.log(user._id)
    useEffect(() => {
        axios.get(`https://vercelhs.vercel.app/api/post/${postId}`)
            .then(response => {
                setPostPrice(response.data.price);

            })
            .catch(error => {
                console.error(error);
            });
    })
    const calculateTotalPrice = () => {
        const selectedPkg = packages.find(pkg => pkg._id === selectedPackage); // Find the selected package
        
        if (selectedPkg) {
            const price = selectedPkg.price;
            const calculatedPrice = (price + postPrice) * numberOfPeople * TotalDays;
        
            setTotalPrice(calculatedPrice);
        } else {
            console.error('Selected package not found');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate form fields
        if (!selectedPackage || !name || !phone || !numberOfPeople || !visitDate || !TotalDays) {
            alert("Please fill out all fields.");
            return;
        }
        const userId = user._id;
        // Prepare booking data
        const bookingData = {
            userId,
            postId,
            packageId: selectedPackage,
            name,
            phone,
            visitDate,
            numberOfPeople,
            additionalNotes: value,
            TotalDays,
            totalPrice // Include totalPrice in the booking data
        };

        // Submit booking data
        axios.post('https://vercelhs.vercel.app/api/booking', bookingData,{ withCredentials: true })
            .then(response => {
                alert('Booking successfully created!');
                navigate('/'); // Navigate to the desired page after successful booking
            })
            .catch(error => {
                console.error('Error creating booking:', error);
                alert('Error creating booking.');
            });
    };

    return (
        <div className="newPostPage pl-8">
            <div className="formContainer mt-4">
                <h1 className="text-2xl pt-4 px-4 py-4 bg-cyan-500 max-w-fit text-white rounded-lg font-bold">Add New Booking</h1>
                <div className="wrapper">
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
                            <label htmlFor="totalDays">Total Days</label>
                            <input id="totalDays" name="totalDays" type="number" value={TotalDays} onChange={(e) => setTotalDays(e.target.value)} />
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
                                    <option key={pkg._id} value={pkg._id}>{pkg.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="item">
                            <label>Total Price</label>
                            <input type="text" readOnly value={`${totalPrice.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}`} />
                        </div>
                        <button type="button" onClick={calculateTotalPrice}>Calculate Price</button>
                        <button className="sendButton" type="submit">Add</button>
                    </form>
                </div>
            </div>
            <div className="chatContainer">
                <section className="section pt-48 px-3 flex flex-col justify-center">
                    <div className="grid grid-cols-2 gap-10 max-w-7xl mx-auto">
                        <div className="dalem -mt-32 flex justify-end relative">
                            <img className="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden" src="/37877254.jpg" />
                            <h1 className='absolute text-3xl font-bold xl:translate-x-72 2xl:translate-x-96 translate-y-1'>Buat Destinasi Nyaman <span>Bersama</span> Kami</h1>
                        </div>
                        <div className="flex justify-start">
                            <img className="rounded-lg object-cover overflow-hidden" src="/DJI_0707_1200-2.jpg" />
                        </div>
                        <div className="-mt-32 flex justify-start">
                            <img className="rounded-lg object-cover overflow-hidden" src="/943a2b33-65db-4171-bf76-76f52d18fa25.jpg" />
                        </div>
                        <div className="flex justify-start -mr-28 ml-28">
                            <img className="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden" src="/Tour-Bangka-Belitung-terbaik.jpg" />
                        </div>
                        <div className="-translate-y-[22rem] transform ml-28 -mr-28 p-8 shadow-xl rounded-xl overflow-hidden bg-white">
                            <div className="space-y-4">
                                <p className="text-3xl font-bold text-black tracking-tight">
                                    Terimakasih Telah memilih kami
                                </p>
                                <p className="text-xl text-black">
                                    Kami sangat senang dengan kepercayaan anda
                                </p>
                            </div>
                        </div>
                    </div>
                </section>   
            </div>
        </div>
    );
}

export default AddBooking;
