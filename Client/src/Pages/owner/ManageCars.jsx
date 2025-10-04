import React, { useEffect, useState } from 'react'
import { assets, dummyCarData } from '../../assets/assets'
import Title from './Title'

const ManageCars = () => {

  const [cars , setCars] = useState([])

  const fetchOwnerCars = async()=>{
    setCars(dummyCarData)
  }
  useEffect(()=>{
    fetchOwnerCars()
  },[])
   const currency = import.meta.env.VITE_CURRENCY ;
   console.log(cars)

  return (
    <div className='px-4 py-10 md:px-10 flex-1'>

      <Title title="Manage Cars" subtitle="View all listed cars, update their details, or remove them from the booking platform"/>

      <div className='max-w-4xl w-full rounded-md overflow-hidden border border-borderColor mt-6'>
    <table className='w-full border-borderColor text-left text-sm text-gray-600'>
      <thead className='text-gray-500'>
        <tr>
          <th className='p-3 font-medium'>Car</th>
          <th className='p-3 font-medium max-md:hidden'>Details</th>
          <th className='p-3 font-medium max-md:hidden'>Category</th>
          <th className='p-3 font-medium'>Price</th>
          <th className='p-3 font-medium max-md:hidden'>Status</th>
          <th className='p-3 font-medium'>Action</th>
        </tr>
      </thead>

<tbody>
  {cars.map((car , index)=>(
    <tr key={index}>
      <td className='p-3 flex items-center gap-3'>

      <img src={car.image} alt="" className='h-12 w-12 aspect-square rounded-md object-cover' />
      <div className='max-md:hidden'>
        <p className='font-medium'>{car.brand}  {car.model}</p>
        {/* <p className='text-sm text-gray-500'>{car.seating_capacity}  • {car.transmission} </p> */}
        
      </div>

      </td>
      <td className='max-md:hidden'>

         <div
                className='flex items-center text-sm text-muted-foreground'>
                <img src={assets.users_icon} alt="user_icon" className='h-4
                mr-2' />
                <span>{car.seating_capacity} Seats</span>
                </div>
                   <div
                        className='flex items-center text-sm text-muted-foreground'>
                        <img src={assets.fuel_icon} alt="user_icon" className='h-4
                        mr-2' />
                        <span>{car.fuel_type} Seats</span>
                        </div>
        </td>

    <td className='p-3 max-md:hidden'>{car.category}</td>

    <td className='p-3'>{currency}{car.pricePerDay} /day</td>
    <td className='p-3 max-md:hidden'>
      <span className={`px-3 py-1 text-sm rounded-full w-24 text-center  ${car.isAvaliable ? 'bg-green-400/15 text-green-500' : 'bg-red-400/15 text-red-500'}`}>

      {car.isAvaliable ? "Available" : "Not Available"} 

      </span>


    </td>

    <td className='flex items-center p-3'>
      <img src={car.isAvaliable ? assets.eye_icon : assets.eye_close_icon} alt="eye icon" className='cursor-pointer' />
      <img src={ assets.delete_icon} alt="eye icon" className='cursor-pointer' />
    </td>
    </tr>
  ))}
</tbody>

    </table>

      </div>

    </div>
  )
}

export default ManageCars