import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import "../src/index.css"
import "../src/App.scss"
import ListPage from './routes/listPage/ListPage'
import {Layout, RequireAuth} from './routes/Layout/Layout'
import HomePage from './routes/homePage/HomePage'
import Paket from './components/Paket/Paket'
import SinglePage from './routes/singlePage/SinglePage'
import Register from './routes/Register/Register'
import Login from './routes/Login/Login'
import FormPage from './routes/FormPemesanan/FormPage'
import ProfilPage from './routes/profilPage/ProfilPage'
import AddBooking from './routes/addBooking/AddBooking.jsx'
import UpdatePost from './routes/updatePost/UpdatePost.jsx'
import UpdateBooking from './routes/UpdateBooking/UpdateBooking.jsx'
import PDFFile from './routes/PDF/PDFFile.jsx'
import Booking from './routes/Bookings/Booking'
import { listPageLoader, singlePageLoader, packageLoader, getMeLoader} from './lib/Loader'
import NewPostPage from './routes/newPostPage/NewPostPage.jsx'
function App() {
  
  const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>,
      loader: getMeLoader,
      children:[
        {
          path: '/',
          element: <HomePage/>,
          loader: listPageLoader
        },
        {
          path:'/paket',
          element: <Paket/>
        },
        {
          path: "/:id",
          element: <SinglePage/>,
          loader : singlePageLoader
        },
        {
          path: '/register',
          element: <Register/>
        },
        {
          path: '/login',
          element: <Login/>
        },{
          path: '/formPemesanan',
          element: <FormPage/>
        },
       {
          path: "/BookingTable",
          element: <Booking/>
        },

        {

          path:'/addBooking/:postId',
          element:<AddBooking/>,
          loader:packageLoader

        }
      ] 
    },
    {
      path:'/',
      element:<RequireAuth/>,
      children:[
        {
          path: "/profile",
          element: <ProfilPage/>,
          loader: listPageLoader
        },
        {
          path: '/updatePost/:id',
          element: <UpdatePost/>
        },
        {
          path: '/list',
          element: <ListPage/>,
          loader: listPageLoader
        },
        {
          path:'/add',
          element:<NewPostPage/>
        },{
          path:"/viewPDF/:id",
          element:<PDFFile/>
        },
        {
          path: '/bookingUpdate/:id',
          element: <UpdateBooking/>
        }
      ]
    },
   
  ])
 

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
