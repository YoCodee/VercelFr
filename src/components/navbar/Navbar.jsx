import React, { useState, useEffect, useContext} from 'react';
import "./navbar.scss";
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';


const Navbar = () => {
  const [open, setOpen] = useState(false);
  const {user} = useSelector((state) => state.auth);



  useEffect(() => {
    if (open) {
      document.body.classList.add('body');
    } else {
      document.body.classList.remove('body');
    }
  }, [open]);

  return (
    <nav className='overflow-x-hidden overflow-y-hidden'>
      <div className="left">
        <a href="/" className='logo'>
          <img src="/Untitled design (7).png" alt="Logo" />
    
        </a>
        <a href="/#destinasi">Home</a>
        <a href="/#about">About</a>
        <a href="/#package">Package</a>
        <a href="/#galery">Galery</a>
      </div>
      <div className="right">
       { user ? (
        <div className='user'>
         
       
          <Link to="/profile" className='profile'>

            <span>{user.name}</span>
            </Link>
        </div>
          ) : (
         <><a href="/login">Sign in</a>
        <a href="/register" className='register'>Sign up</a></>
      )}
        <div className={open ? "menuIcon active" : "menuIcon"}>
          <img src="/menu.png" alt="Menu Icon" onClick={() => setOpen(prev => !prev)} />
        </div>
        <div className={open ? "menu active" : "menu"}>
          <Link to="/"><a onClick={() => setOpen(false)}>Home</a></Link>
          <Link to="/"><a onClick={() => setOpen(false)}>About</a></Link>
          <Link to="/"><a onClick={() => setOpen(false)}>Package</a></Link>
          <Link to="/"><a onClick={() => setOpen(false)}>Galery</a></Link>
          {user ? (
            <div className='bg-cyan-500 p-2 rounded-md text-black'>
              <Link to="/profile" className='profile'>
              <span>{user.name}</span>
              </Link>
            </div>
          ): (
            <>
       <Link to="/login">  <a className='cursor-pointer'>Sign in</a></Link>
       <Link to="/register"><a className='cursor-pointer'>Sign Up</a></Link>
            </>
          )}
       
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
