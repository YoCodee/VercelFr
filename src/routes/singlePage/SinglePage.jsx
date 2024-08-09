import React from 'react';
import "./SinglePage.scss";
import Slider from '../../components/slider/Slider';
import Map from '../../components/map/Map';
import Navbar from '../../components/navbar/Navbar';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import DOMPurify from 'dompurify';


const SinglePage = () => {
  const data = useLoaderData();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state)=> state.auth)


  if (!data) {
    return <div>Loading...</div>;
  }

  // Ensure images is an array
  const imagesArray = Array.isArray(data.images) ? data.images : [data.images];

  // Transform data to include lat and lng properties
  const mapData = {
    ...data,
    lat: data.Latitude,
    lng: data.Longitude,
  };

  return (
    <>
      <Navbar />
      <div className='singlePage pl-8'>
        <div className="details">
          <div className="wrapper">
            <Slider images={imagesArray} />
            <div className="info">
              <div className="top">
                <div className="post ">
                  <h1 className='font-extrabold text-3xl'> {data.title}</h1>
                  <div className="address">
                    <img src="/pin.png" alt="" />
                    <span>{data.address}</span>
                  </div>
                  <div className="price">Rp {data.price.toLocaleString('id-ID')}</div>
                </div>
                <div className="user">
                  {data.user && data.user.name && (
                    <>
                      <img src="/Admin-Profile-PNG-Clipart.png" alt={data.user.name} />
                      <span className='text-black'>{data.user.name}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="bottom"  dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(data.description),
              }}>
           
              </div>
            </div>
          </div>
        </div>
        <div className="features">
          <div className="wrapper">
            <p className='title'></p>
            <div className="listVertical">
              <div className="feature">
                <img src="/utility.png" alt="" />
                <div className="featureText">
                  <span>Keperluan</span>
                  <p>penyewa bertanggung jawab</p>
                </div>
              </div>
              <div className="feature">
                <img src="/pet.png" alt="" />
                <div className="featureText">
                  <span>Hewan Peliharaan </span>
                  <p>Diizinkan</p>
                </div>
              </div>
              <div className="feature">
                <img src="/fee.png" alt="" />
                <div className="featureText">
                  <span>Biaya Properti</span>
                  <p>penyewa bertanggung jawab</p>
                </div>
              </div>
            </div>
            <p className='title'>Fasilitas Kamar Hotel </p>
            <div className="sizes">
              <div className="size">
                <img src="/size.png" alt="" />
                <span>80sqft</span>
              </div>
              <div className="size">
                <img src="/bed.png" alt="" />
                <span>2 beds</span>
              </div>
              <div className="size">
                <img src="/bath.png" alt="" />
                <span>1 bathroom</span>
              </div>
            </div>
            <p className='title'>Paket (Kualitas sesuai dengan paket yang dipilih)</p>
            <div className="listHorizontal">
              <div className="feature">
                <img src="/image-removebg-preview (8).png" alt="" />
                <div className="featureText">
                  <span>Makan dan Minum</span>
                  <p>Disediakan</p>
                </div>
              </div>
              <div className="feature">
                <img src="/bus.png" alt="" />
                <div className="featureText">
                  <span>Kendaraan Bus</span>
                  <p>Disediakan</p>
                </div>
              </div>
              <div className="feature">
                <img src="/image-removebg-preview (9).png" alt="" />
                <div className="featureText">
                  <span>Hotel</span>
                  <p>Disediakan</p>
                </div>
              </div>
            </div>
            <p className='title'>Location</p>
            <div className="mapContainer">
              <Map items={[mapData]} />
            </div>
            <div className="buttons">
              {!user ? <button onClick={() => navigate('/login')}>Submit Pemesanan</button> 
              : 
              <button onClick={() => navigate(`/addBooking/${data._id}`)}>
                Submit Pemesanan
              </button>}
          
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SinglePage;
