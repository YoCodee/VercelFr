import { Link } from 'react-router-dom';
import React, {useState} from 'react';
import './card.scss';
import { useSelector } from 'react-redux';
import axios from 'axios';

const Card = ({ item, onDelete }) => {
    const { user } = useSelector((state) => state.auth);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const deletePost = async () => {
        try {
            await axios.delete(`https://vercelhs.vercel.app/api/post/${item._id}`);
            onDelete(item.id);
            window.location.replace('/')
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error deleting the post", error);
        }
    };


    return (
        <div className='Card'>
            <Link to={`/${item._id}`} className='imageContainer'>
                {item.images && item.images.length > 0 ? (
                    <img src={item.images[0]} alt={item.title} />
                ) : (
                    <img src="/default-image.png" alt="Default" />
                )}
            </Link>
            <div className="textContainer">
                <h2 className='title'>
                    <Link to={`/${item._id}`}>{item.title}</Link>
                </h2>
                <p className='address'>
                    <img src="/pin.png" alt="" />
                    <span>{item.address}</span>
                </p>
                <p className='price'>Rp {item.price.toLocaleString('id-ID')}</p>
                <div className="bottom">
                    <div className="features"angka Tengah>
                        <div className="feature">
                            <img src="/bed.png" alt="" />
                            <span>{item.bedrooms} Bedroom</span>
                        </div>
                        <div className="feature">
                            <img src="/bath.png" alt="" />
                            <span>{item.bathrooms} Bathroom</span>
                        </div>
                    </div>
                    {user && user.role === "admin" ? 
                        <div className="icons">
                            <div className="icon">
                                <Link to={`/updatePost/${item._id}`}>Update</Link>
                            </div>
                            <div className="bg-red-500 text-white h-max px-3 py-3  border-none cursor-pointer" onClick={() => setIsModalOpen(true)}>
                <img src="/delete-32.png" alt="" />
            </div>
                        </div>
                    : null}
                    {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="text-center p-5 flex-auto justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 -m-1 flex items-center text-red-500 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 flex items-center text-red-500 mx-auto" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <h2 className="text-xl font-bold py-4">Are you sure?</h2>
              <p className="text-sm text-gray-500 px-8">Do you really want to delete this booking? This process cannot be undone.</p>
            </div>
            <div className="p-3 mt-2 text-center space-x-4 md:block">
              <button className="mb-2 md:mb-0 bg-white px-5 py-2 text-sm shadow-sm font-medium tracking-wider border text-gray-600 rounded-full hover:shadow-lg hover:bg-gray-100" onClick={() => setIsModalOpen(false)}>
                Cancel
              </button>
              <button className="mb-2 md:mb-0 bg-red-500 border border-red-500 px-5 py-2 text-sm shadow-sm font-medium tracking-wider text-white rounded-full hover:shadow-lg hover:bg-red-600 cursor-pointer" onClick={deletePost}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
                </div>
            </div>
        </div>
    );
};

export default Card;
