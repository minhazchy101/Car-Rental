import React, { useEffect, useState } from 'react'
import { assets, dummyMyBookingsData } from '../assets/assets'
import Title from '../components/Title'
import Loader from '../components/Loader'

const MyBooking = () => {

  

  const [bookings , setBookings] = useState()

  const fetchMyBookings = async()=>{
    setBookings(dummyMyBookingsData)
  }
  useEffect(()=>{
    fetchMyBookings()
  },[])
  console.log(bookings)

  const currency = import.meta.env.VITE_CURRENCY
  return (
    <div className='px-6 md:px-16 lg:px-26
     xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl'>

      <Title title="My Bookings" subTitle="View and manage your all car bookings"
      align="left"/>
      
      <div>
       
        {bookings?.map((booking , index)=> booking ? (
          <div key={index} 
          className='grid grid-cols-1 md:grid-cols-4 gap-6 p-6 border border-borderColor rounded-xl mt-5 first:mt-12'>
            {/* car image and info */}
            <div className='md:col-span-1'>
              <div className='rounded-lg overflow-hidden mb-3'>
                <img src={booking.car.image} alt="" className='w-full aspect-video object-cover' />
              </div>
              <p className='text-lg font-medium mt-2'>{booking.car.brand} {booking.car.model}</p>
            <p className='text-gray-500'>{booking.car.year} {booking.car.category} {booking.car.location}</p>
            </div>

            {/* booking info */}

            <div className='md:col-span-2'>
              <div className='flex items-center gap-2'>
                <p className='px-3 py-1.5 bg-light rounded-xl'>Booking #{index+1}</p>
                <p className={`px-3 py-1 text-sm rounded-full ${booking.status === 'confirmed' ? 'bg-green-400/15 text-green-500' : 'bg-red-400/15 text-red-500'}`}>{booking.status}</p>

              </div>
              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.calendar_icon_colored} alt="" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-700'>Rental Period</p>
                  <p>{booking.pickupDate.split('T')[0]} <span className='font-bold mx-1.5'>To</span>  {booking.pickupDate.split('T')[0]} 
                  </p>
                </div>
              </div>

              {/* location */}
              <div className='flex items-start gap-2 mt-3'>
                <img src={assets.location_icon} alt="" className='w-4 h-4 mt-1' />
                <div>
                  <p className='text-gray-700'>Pick-Up Location</p>
                  <p>{booking.car.location} 
                  </p>
                </div>
              </div>

            </div>

{/* price */}
<div className='md:col-span-1 flex flex-col justify-between gap-6'>
  <div className='text-sm text-gray-500 text-right space-y-1.5'>
    <p className='font-semibold'>Total Price</p>
    <h1 className='text-primary text-2xl font-bold'>
      {currency}{booking.price}</h1>
      <p>Booked on : {booking.createdAt.split('T')[0]}</p>
  </div>
</div>

          </div>
        ) : <Loader/>)}
      </div>

    </div>
  )
}

export default MyBooking