import React, { useState, useEffect } from 'react';
import "./profilPage.scss";
import List from '../../components/list/List';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { LogOut, reset } from '../../Features/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { useLoaderData } from 'react-router-dom';
import Pagination from '../../components/Pagination/Pagination';
import axios from 'axios';
import Card from '../../components/card/Card';
import CardProfile from '../../components/CardProfile/CardProfile';

const ProfilPage = () => {
    const { postResponse } = useLoaderData();


   
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

    const handleLogout = () => {
        console.log('Logging out...');  // Tambahkan log
        dispatch(LogOut())
            .then(() => {
                dispatch(reset());
                navigate("/");
            })
            .catch((error) => {
                console.error('Logout error:', error);
            });
    };

    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [postPage, setPostPage] = useState(1)
    const itemsPerPage = 2;

    // State for bookings
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        if (user) {
            // Fetch bookings for the user
            axios.get(`https://vercelhs.vercel.app/api/booking/userBooking/${user._id}`)
                .then(response => {
                    setBookings(response.data);
                    console.log(response.data)
                })  
          
                .catch(error => {
                    console.error('Error fetching bookings:', error);
                });
        }
    }, [user]);

    // Pagination logic
    const indexOfLastPost = postPage * itemsPerPage;
    const indexOfFirstPost = indexOfLastPost - itemsPerPage;
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBookings = bookings.slice(indexOfFirstItem, indexOfLastItem);
    const currentPost = postResponse.slice(indexOfFirstPost, indexOfLastPost);
   

    return (
        <>
            <Navbar />
            <div className='profilPage pl-8'>
                <div className="details">
                    <div className="wrapper">
                        <div className="">
                            <div className="title mb-6">
                                <h1 className='font-black text-black text-3xl'>User Information</h1>
                            </div>
                            <div className="info mb-4">
                                <span className='font-bold text-xl'>Username: {user && user.name} </span>
                                <span className='font-bold text-xl'>E-mail: {user && user.email} </span>
                                <button onClick={handleLogout} className='text-white mt-4'>Logout</button>
                            </div>
                        </div>
                        <div className="title">
                            <h1 className='text-3xl font-bold'>Booking</h1>
                            {user && user.role === "admin" && (
                                <div className="flex gap-5">
                                    <Link to="/add">
                                    <button>Create New Post</button>
                                    </Link>
                                    <Link to="/BookingTable">
                                    <button>Bookings</button>
                                    </Link>

                                </div>
                            )}
                        </div>
                        <List bookings={currentBookings} />
                        <Pagination
                            currentPage={currentPage}
                            itemsPerPage={itemsPerPage}
                            totalItems={bookings.length}
                            onPageChange={setCurrentPage}
                        />
                        {user && user.role === "admin" && (
                            <>
                                <div className="title">
                                    <h1>Save List</h1>
                                </div>
                                <CardProfile post={currentPost}/>
                                <Pagination
                                    currentPage={postPage}
                                    itemsPerPage={itemsPerPage}
                                    totalItems={postResponse.length}
                                    onPageChange={setPostPage}
                                />
                            </>
                        )}
                    </div>
                </div>
                <div className="chatContainer">
                    <section className="section pt-48 px-3 flex flex-col justify-center">
                        <div className="grid grid-cols-2 gap-10 max-w-6xl mx-auto">
                            <div className="dalem -mt-32 flex justify-end relative">
                                <img className="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden" src="/public/37877254.jpg" />
                                <h1 className='absolute text-3xl font-bold xl:translate-x-72  2xl:translate-x-96 translate-y-1'>Buat Destinasi Nyaman <span>Bersama</span> Kami</h1>
                            </div>
                            <div className="flex justify-start">
                                <img className="rounded-lg object-cover overflow-hidden" src="/public/DJI_0707_1200-2.jpg" />
                            </div>
                            <div className="-mt-32 flex justify-start">
                                <img className="rounded-lg object-cover overflow-hidden" src="/public/943a2b33-65db-4171-bf76-76f52d18fa25.jpg" />
                            </div>
                            <div className="flex justify-start -mr-28 ml-28">
                                <img className="w-2/3 h-2/3 object-cover rounded-lg overflow-hidden" src="/public/Tour-Bangka-Belitung-terbaik.jpg" />
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
        </>
    );
};

export default ProfilPage;
