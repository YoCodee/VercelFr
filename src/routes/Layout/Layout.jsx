import "./layout.scss"
import React, { useContext, useEffect } from 'react'
import { Outlet, Navigate } from "react-router-dom"
import Navbar from "../../components/navbar/Navbar"
import { useNavigate} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getMe } from "../../Features/authSlice"

const Layout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user} = useSelector((state)=> state.auth)

useEffect(() => {
    if (!user) {
      dispatch(getMe())
      .unwrap()
      .then(userData => {
          console.log('User data:', userData); // Log user data
      })
      .catch(message => {
          console.error('Error fetching user data:', message);
      });
    }
   
}, [dispatch, user]);




  return (

    <div className="Layout">
    <div className="navbar">
   
      </div>
    <div className="content">
      <Outlet/>
     </div>
    </div>

 
  )
}

function RequireAuth(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError, user} = useSelector((state)=> state.auth)

 
  useEffect(()=>{
    dispatch(getMe())
  },[dispatch]);



    return(
      <div className="Layout">
      <div className="navbar">
     
        </div>
      <div className="content">
        <Outlet/>
       </div>
      </div>
  
    )
  }


export { Layout, RequireAuth };