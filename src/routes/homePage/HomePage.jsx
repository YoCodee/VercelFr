import React, {useEffect, useState} from 'react'
import './HomePage.scss'
import CardHome from '../../components/cardHome/CardHome'
import { PostData } from '../../lib/dummyData'
import Paket from '../../components/Paket/Paket'
import { useDispatch, useSelector, } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { getMe } from '../../Features/authSlice'
import { Link } from 'react-router-dom'
import { useLoaderData } from 'react-router-dom'

const HomePage = () => {
  const { postResponse } = useLoaderData();
  const [open, setOpen] = useState(false);
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (open) {
      document.body.classList.add('body');
    } else {
      document.body.classList.remove('body');
    }
  }, [open]);

  const handleSearch = () => {
    navigate(`/list?location=${location}&date=${date}`);
  };

  useEffect(() => {
    const links = document.querySelectorAll('a[href^="#"]');

    const smoothScroll = (event) => {
      event.preventDefault();
      const targetId = event.currentTarget.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    };

    links.forEach((link) => {
      link.addEventListener('click', smoothScroll);
    });

    return () => {
      links.forEach((link) => {
        link.removeEventListener('click', smoothScroll);
      });
    };
  }, []);
  console.log(postResponse);
  const {user} = useSelector((state) => state.auth);
  console.log(user)

  return (
    <>
    <div className='homePage flex  h-screen overflow-x-hidden  pl-[3%]'>
    <div className="textContainer flex-[3] ">

        <div className="wrapper mdpr-24 flex flex-col  gap-12 h-full">
          <div className="flex flex-col justify-between h-[48%] ">
          <div className="left flex mt-5 gap-32 md:justify-between ">
     
            <a href="" className="Logo">
                 <img className="  lg:flex w-24 h-24" src="/Untitled design (7).png" alt=""/>
            </a>
            <div className="flex mb-5 mt-10 md:mt-10 justify-betweend gap-4 md:gap-8 xl:gap-16  md:pr-28">
        
            <a href="#destinasi" className="hidden sm:block text-lg xl:text-xl">Destinasi</a>
            <a href="#about" className="hidden sm:block text-lg xl:text-xl">About</a>
            <a href="#package" className="hidden sm:block text-lg xl:text-xl">Package</a>
            <a href="#galery" className="hidden sm:block text-lg xl:text-xl">Galery</a>



 
          </div>
          <div className="mt-7 flex  ">
          <div className={open ? "menuIcon active z-50" : "menuIcon  sm:hidden flex    z-50"}>
          <img src="/menu.png" className='w-10 z-50 h-10 cursor-pointer' alt="Menu Icon" onClick={() => setOpen(prev => !prev)} />
        </div>
        <div className={open ? "menu active z-10  bg-black flex flex-col text-white absolute w-[50%] text-xl justify-center items-center gap-24 right-0 bottom-0 top-0 h-screen overflow-hidden" : "menus bg-black flex-col absolute top-0 right-[-90%] h-full text-white w-[50%] flex transition-all ease-in-out justify-center items-center text-xl z-10"}>

          <a href="/" className='cursor-pointer'>Home</a>
          <a href="/" className='cursor-pointer'>About</a>
          <a href="/" className='cursor-pointer'>Contact</a>
          <a href="/" className='cursor-pointer'>Agents</a>
          {user ? (
            <div className='bg-cyan-500 p-2 rounded-md text-black'>
              <Link to="/profile" className='profile'>
              <span className='text-xl font-bold'> {user.name}</span>
              </Link>
            </div>
          ) : (
            <>
            <a href="/" className='cursor-pointer'>Sign in</a>
            <a href="/" className='cursor-pointer'>Sign Up</a>
            </>
          )}
         
        </div>
        </div>
          </div>
          <div className="">

            <h1 className='title text-3xl md:text-6xl max-w-80 md:max-w-xl font-extrabold font-serif' >Nikmati Liburan Impian Anda</h1>
            <p className="max-w-80 md:max-w-3xl mt-6">Bangka Belitung Memiliki banyak Wisata Liburan yang belum anda temukan dimanapun.Kami menjamin anda akan menikmati perjalanan kalian.Nikmati Perjalananmu Bersama kami.</p>
          </div>
          </div>
            <div className="boxes w-[80%] flex justify-between">
                <div className="box">
                    <h1 className="text-4xl font-extrabold text-cyan-600">10+</h1>
                    <h2 className="text-lg md:text-2xl">Tahun Pengalaman</h2>
                </div>
                <div className="box ">
                    <h1 className="text-4xl font-extrabold text-cyan-600">40</h1>
                    <h2 className="md:text-2xl">Penghargaan Diperoleh</h2>
            
                </div>
                <div className="box ">
                    <h1 className="text-4xl font-extrabold text-cyan-600">50+</h1>
                    <h2 className="md:text-2xl">Lokasi</h2>
                </div>
            </div>
            <div className="searchBar  w-full">
              <div className="wrapper flex   w-[85%] px-6 py-4 shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)] gap-20">
                <div className="left w-[17%] md:w-[60%] border-r-2  flex  md:gap-10 ">
                  <div className="logo justify-center flex items-center ">
                    <i className="fa-solid fa-search fa-lg text-blue-400" ></i>
                  </div>
                  <div className="textwarapper">
                    <label for="">Location</label>
                    <select name="location" id="location" className='pl-2' value={location} onChange={(e) => setLocation(e.target.value)}>
              <option value="">...</option>
              <option value="Pangkalpinang">Pangkalpinang</option>
              <option value="Bangka">Bangka</option>
              <option value="Bangka Barat">Bangka Barat</option>
              <option value="Bangka Tengah">Bangka Tengah</option>
              <option value="Bangka Selatan">Bangka Selatan</option>
              <option value="Belitung Timur">Belitung Timur</option>
              <option value="Belitung">Belitung</option>

            </select>
                    
                    <h1>Bangka Belitung</h1>
                  </div>
                </div>
                <div className="right  w-full flex justify-between    ">
                  <div className="textwarapper ">
                    <label for="">Date</label> 
                    <input type="date" id="date" className='pl-2' value={date} onChange={(e) => setDate(e.target.value)} />
                    
                    <h1>Tanggal</h1>
                  </div>
                  <div className="logo max-h-max max-w-max p-2 flex items-center l rounded-full bg-cyan-600 " onClick={handleSearch}>
                    <img className="" src="/search.png" alt=""/>
                  </div>
                </div>

              </div>
            </div>
            <div className="TextContainer max-w-80 md:max-w-3xl">
              <h1 className="text-xl font-bold">Popular Search : <span className="text-cyan-600">Pulau lengkuas, Puri Tri Agung, Danau Kaolin</span></h1>
            </div>
        </div>
    </div>
    
    <div className="imgContainer  hidden flex-[2] bg-[#fcf5f3] relative lg:flex items-center" >
      <div className="h-full w-full ">
      <div className="right w-full self-end mt-5 gap-16 flex items-center justify-end pr-8 h-24 text-white">

       {user ? (
              <div className='user'>
        <Link to="/profile" className='profile'>
 
          <span>{user.name}</span>
          </Link>
          </div>
       ) : (
        <>
        <a href="/login" className="text-xl">Login</a>
        <a href="/register" className="text-xl px-8 py-6 bg-cyan-500 font-bold">Register</a>
        </>
       )}
     
      
    </div>
  </div>
      <img className="  lg:w-[900px] xl:w-[1000px] absolute lg:left-[-36%] bottom-0" src="/Untitled design (6).png" alt="" />
      <div className="absolute text-black right-44 -bottom-8">
        <div className="box bg-white p-2 rounded-xl shadow-[0_4px_8px_0_rgba(0,0,0,0.2),0_6px_20px_0_rgba(0,0,0,0.19)]">
          <div className="imgContainer w-[250px] rounded-xl">
            <img className="w-full h-full rounded-xl" src="/16781256423_41fcef3f9b_b.jpg" alt=""/>
          </div>
          <div className="textContainer">
            <h1 className="text-xl font-semibold mt-4">Pulau lengkuas</h1>
            <p className="text-sm font-light text-gray-400">Bangka belitung, Belitung</p>
            

<div className="flex items-center">
  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
  </svg>
  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
  </svg>
  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
  </svg>
  <svg className="w-4 h-4 text-yellow-300 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
  </svg>
  <svg className="w-4 h-4 text-gray-300 me-1 dark:text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 22 20">
      <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z"/>
  </svg>
  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">4.95</p>
  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">out of</p>
  <p className="ms-1 text-sm font-medium text-gray-500 dark:text-gray-400">5</p>
</div>

          </div>
        </div>
      </div>
    </div>
</div>

{/* Explore Destination */}
<div class="heroSection p-3  " id="destinasi">
  <div class="Wrapper mt-20">
    <h1 class="text-5xl font-bold text-center">Explore Destination</h1>

    <div class="boxes   gap-3 mt-12">
      <div class="flex justify-center flex-wrap gap-10">
        
        {postResponse.map((post) => (
          <CardHome key={post.id} item={post}/>
        ))}
        
    
        </div>
       </div>
    </div>
  </div>

  <section className="bg-cyan-500 text-black px-[7%] mt-36 " id='about'>

  <div className="container2 px-6 py-12 mx-auto">
      <div className="grid items-center gap-4 xl:grid-cols-5">
          <div className="max-w-2xl mx-auto my-8 space-y-4 text-center xl:col-span-2 xl:text-left">
              <h2 className="text-5xl text-white font-bold">Apa yang pelanggan kami katakan ?</h2>
              <p className="text-white">Data-data ini diambil dari data yang sudah beredar di Internet dan Warga Sekitar</p>
          </div>
          <div className="p-0 lg:p-6 xl:col-span-3">
              <div className="grid gap-4 md:grid-cols-2">
                  <div className="grid content-center gap-4">
                      <div className=" p-6 rounded shadow-md bg-white ">
                          <p>"Website ini benar-benar luar biasa! Sebagai seseorang yang sering bepergian, saya selalu mencari sumber informasi yang dapat diandalkan untuk merencanakan perjalanan saya. Website ini memberikan semua yang saya butuhkan tentang destinasi wisata di Bangka Belitung. Fitur booking yang ada juga sangat user-friendly, memungkinkan saya untuk memesan tiket dan akomodasi dengan mudah. Terima kasih telah membuat pengalaman liburan saya menjadi sangat menyenangkan!"

                          </p>
                          <div className="flex items-center mt-4 space-x-4">
                              <img src="https://source.unsplash.com/50x50/?portrait?1" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"/>
                              <div>
                                  <p className="text-lg font-semibold">Agus Susanto</p>
                                  <p className="text-sm text-gray-400">Traveler</p>
                              </div>
                          </div>
                      </div>
                      <div className="p-6 rounded shadow-md bg-white">
                          <p>"Danau Kaolin adalah destinasi unik yang wajib dikunjungi di Bangka. Danau ini memiliki warna air yang biru cerah dengan kontras putih dari sisa-sisa penambangan kaolin. Pemandangan yang ada di sini sangat eksotis dan cocok untuk berfoto. Meskipun tempat ini tidak memiliki fasilitas wisata yang lengkap, keindahan alaminya sangat mempesona dan layak untuk dikunjungi."</p>
                          <div className="flex items-center mt-4 space-x-4">
                              <img src="https://source.unsplash.com/50x50/?portrait?2" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"/>
                              <div>
                                  <p className="text-lg font-semibold">Marcellino</p>
                                  <p className="text-sm text-gray-400">Mahasiswa</p>
                              </div>
                          </div>
                      </div>
                  </div>
                  <div className="grid content-center gap-4">
                      <div className="p-6 rounded shadow-md bg-white">
                          <p>"Pulau Lengkuas adalah destinasi yang sempurna untuk pecinta snorkeling dan diving. Keindahan bawah lautnya dengan terumbu karang yang masih alami dan berbagai jenis ikan warna-warni sangat memukau. Selain itu, menara mercusuar yang ada di pulau ini memberikan pemandangan spektakuler dari ketinggian. Akses ke pulau ini cukup mudah dan perjalanan dengan perahu pun menjadi pengalaman yang menyenangkan. Pulau Lengkuas adalah salah satu destinasi wajib di Bangka yang tidak boleh dilewatkan."</p>
                          <div className="flex items-center mt-4 space-x-4">
                              <img src="https://source.unsplash.com/50x50/?portrait?3" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"/>
                              <div>
                                  <p className="text-lg font-semibold">Venzen Zenza</p>
                                  <p className="text-sm text-gray-400">Photographer</p>
                              </div>
                          </div>
                      </div>
                      <div className="p-6 rounded shadow-md bg-white">
                          <p>"Saya sangat senang menemukan website ini. Informasi yang disajikan sangat komprehensif, mulai dari deskripsi tempat wisata, tips perjalanan, hingga rekomendasi kuliner lokal. Fitur pencarian yang ada sangat membantu saya menemukan destinasi sesuai dengan preferensi saya. Saya juga menghargai adanya fitur booking yang mempermudah proses reservasi tiket dan akomodasi. Pengalaman saya menggunakan website ini sangat positif dan memuaskan. Saya pasti akan merekomendasikan website ini kepada teman-teman dan keluarga yang ingin berlibur ke Bangka Belitung."

                          </p>
                          <div className="flex items-center mt-4 space-x-4">
                              <img src="https://source.unsplash.com/50x50/?portrait?4" alt="" className="w-12 h-12 bg-center bg-cover rounded-full bg-gray-500"/>
                              <div>
                                  <p className="text-lg font-semibold">Dewi Lestari</p>
                                  <p className="text-sm text-gray-400">Vlogger</p>
                              </div>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  </div>


</section>
  {/* Paket */}
<div className="" id='package'>
<Paket />
</div>
  {/* End Paket */}
  <div class=" w-full flex justify-center items-center  " id='galery'>
  <div class=" ">
    <div class="text-center">
      <h1 class="font-serif text-6xl font-bold text-black mb-5">Destinasi <span class="text-cyan-600">Wisata</span> </h1>
      <h2 class="text-xl mb-6 text-gray-400">Galeri Keindahan Wisata Bangka Belitung, diabadikan oleh tim explore Bangka</h2>
      </div>


 <div class="grid grid-cols-6 col-span-2   gap-2  ">
   <div class=" overflow-hidden rounded-xl col-span-3 max-h-[30rem]">
     <img class="h-full w-full object-cover "
          src="/943a2b33-65db-4171-bf76-76f52d18fa25.jpg"
          alt=""/>
   </div>
   <div class=" overflow-hidden rounded-xl col-span-3 max-h-[30rem]">
     <img class="h-full w-full object-cover  "
          src="/Jelajah-Wisata-Bangka-Location-Gurun-Pelawan-Desa-Namang-1080x834.jpg"
          alt=""/>
   </div>
   <div class=" overflow-hidden rounded-xl col-span-2 max-h-[14rem]">
     <img class="h-full w-full object-cover "
          src="/Daftar-Tempat-Wisata-Paling-Hits-Di-Bangka-Belitung-Pantai-Tongaci.jpg"
          alt=""/>
   </div>
   <div class=" overflow-hidden rounded-xl col-span-2 max-h-[14rem]">
     <img class="h-full w-full object-cover "
          src="/Puri Tri agung.jpg"
          alt=""/>
   </div>
   <div class="relative overflow-hidden rounded-xl col-span-2 max-h-[14rem]">
     
     <img class="h-full w-full object-cover "
          src="/50589194_2559360307414242_999548555661013824_n.jpg"
          alt=""/>
   </div>
 </div>


</div>


</div>
<div class="last p-4  md:p-12">
  <div class="wrapper w-full h-full bg-cyan-600 rounded-[3rem] p-12 items-center flex flex-col">
      <div class="title  text-center">
        <h1 class="text-2xl sm:text-5xl font-bold font-serif text-white">Bepergian dan nikmati menjelajahi </h1>
        <span class="text-2xl sm:text-5xl font-bold font-serif text-white">Bangka Belitung</span>
      </div>
      <div class="body">
        <h1 class="text-md text-center sm:text-xl font-semibold text-white my-4">Kami punya banyak destinasi wisata yang kami sediakan untuk kamu</h1>
      </div>
      <Link to= "/List">
      <button class="text-cyan-700 bg-white hover:bg-cyan-800 hover:text-white focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-6 py-2.5 text-center mr-2 mb-2"> Mulai</button>
      </Link>
  </div>
</div>

</>
  )
}

export default HomePage