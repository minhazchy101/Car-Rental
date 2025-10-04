import React, { useEffect, useState } from 'react'
import {dummyMyBookingsData } from '../../assets/assets'
import Title from './Title'

const ManageBookings = () => {

  const [bookings , setBookings] = useState([])
  
    const fetchOwnerBookings = async()=>{
      setBookings(dummyMyBookingsData)
    }
    useEffect(()=>{
      fetchOwnerBookings()
    },[])
     const currency = import.meta.env.VITE_CURRENCY ;
     console.log(bookings)

  return (
      <div className='px-4 py-10 md:px-10 flex-1'>

      <Title title="Manage Bookings" subtitle="Track all customer bookings, approve or cancel requests, and manage booking statuses"/>

      <div className='max-w-3xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
    <table className='w-full border-borderColor text-left text-sm text-gray-600'>
      <thead className='text-gray-500'>
        <tr>
          <th className='p-3 font-medium'>Car</th>
          <th className='p-3 font-medium max-md:hidden'>Date Range</th>
          <th className='p-3 font-medium'>Total</th>
          <th className='p-3 font-medium max-md:hidden'>Status</th>
          <th className='p-3 font-medium'>Action</th>
        </tr>
      </thead>

<tbody>
  {bookings.map((booking , index)=>(
    <tr key={index}>
     
   <td className='p-3 flex items-center gap-3'>
    <img src={booking.car.image} alt="" className='aspect-square rounded-md object-cover h-12 w-12' />
    <p className="font-medium max-md:hidden">{booking.car.brand}   {booking.car.model}</p>
   </td>
<td className='max-md:hidden'>
  {booking.pickupDate.split('T')[0]}
  <span className='font-bold mx-2'>To</span>
  {booking.returnDate.split('T')[0]}
</td>

<td className="p-3">{currency}{booking.price}</td>
<td className="p-2 max-md:hidden">
  <span className='bg-gray-200 px-3 py-1.5 rounded-full'>
Offline
  </span>
  </td>
  <td className="p-3">{booking.status === "pending" ? (
    <select value={booking.status} className='px-2 py-1.5 mt-1 text-gray-500 border border-borderColor rounded-md outline-none'>

      <option value="pending">Pending</option>
      <option value="cancelled">Cancelled</option>
      <option value="confirmed">Confirmed</option>
    </select>
  ) : (
    <span className={`px-3 py-1 text-sm rounded-full w-24 text-center font-semibold ${booking.status === "confirmed" ? 'bg-green-400/15 text-green-500' : 'bg-red-400/15 text-red-500'}`}>
 {booking.status}
    </span>
  )}</td>
    </tr>
  ))}
</tbody>

    </table>

      </div>

    </div>
  )
}

export default ManageBookings