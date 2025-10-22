import React from 'react'
import Navbar from './components/Navbar'
import { Route, Routes, useLocation } from 'react-router-dom'
import CarDetails from './Pages/CarDetails'
import Cars from './Pages/Cars'
import Home from './Pages/Home'
import Footer from './components/Footer'
import MyBooking from './Pages/MyBooking'
import Layout from './Pages/owner/Layout'
import Dashboard from './Pages/owner/Dashboard'
import AddCar from './Pages/owner/AddCar'
import ManageCars from './Pages/owner/ManageCars'
import ManageBookings from './Pages/owner/ManageBookings'
import Login from './components/Login'
import {Toaster} from "react-hot-toast"
import { useAppContext } from './context/AppContext'
const App = () => {


 
     const {showLogin} = useAppContext()
 
  const isOwner = useLocation().pathname.startsWith('/owner')
  return (
    <>
    <Toaster/>
{!isOwner &&  <Navbar />  }
{showLogin && <Login/>}


    <Routes>

      <Route path='/' element={<Home/>}/>
      <Route path='/car-details/:id' element={<CarDetails/>}/>
      <Route path='/cars' element={<Cars/>}/>
      <Route path='/my-bookings' element={<MyBooking/>}/>

<Route path='/owner' element={<Layout/>}>
<Route index element={<Dashboard/>}/>
<Route path='add-car' element={<AddCar/>}/>
<Route path='manage-cars' element={<ManageCars/>}/>
<Route path='manage-bookings' element={<ManageBookings/>}/>


</Route>
    </Routes>
    {!isOwner &&  <Footer/>  }
    </>
  )
}

export default App