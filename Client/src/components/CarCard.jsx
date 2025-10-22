import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const CarCard = ({car}) => {
    const navigate = useNavigate()
    const currency = import.meta.env.VITE_CURRENCY
    // console.log("CarData --> " , car)
  return (
    <div onClick={()=>{navigate(`car-details/${car._id}`) ; scrollTo(0,0)} } className='group rounded-2xl overflow-hidden shadow-lg hover:-translate-y-1 transition-all duration-500 cursor-pointer'>

<div className='relative h-48 overflow-hidden'>
    <img src={car.image} alt="car image" className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-150' />
    {car.isAvailable && <p className='absolute
    top-4 left-4 bg-primary/90 text-white text-xs px-2.5 py-1 rounded-full '>Available Now</p>}

    <div className='absolute top-4 right-2 bg-black/80 backdrop-blur-sm text-white px-3 py-2 rounded-lg'>
        <span className='font-semibold'>{currency}{car.pricePerDay}</span>
        <span className='text-sm text-white/80'>/ Day</span>
    </div>
</div>


        <div className='p-4 sm:p-5'>

     <div className='flex justify-between items-start mb-2'>
<div>
    <h3 className='text-lg font-medium'>{car.brand} {car.model}</h3>
    <p className='text-muted-foreground text-sm '>{car.category} . {car.year}</p>
</div>
        </div> 

        <div className='mt-4 grid grid-cols-2 gap-y-3 text-gray-600'>
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
        <div
        className='flex items-center text-sm text-muted-foreground'>
        <img src={assets.car_icon} alt="car_icon" className='h-4
        mr-2' />
        <span>{car.transmission} Seats</span>
        </div>
        <div
        className='flex items-center text-sm text-muted-foreground'>
        <img src={assets.location_icon} alt="user_icon" className='h-4
        mr-2' />
        <span>{car.location} </span>
        </div>

        </div>


        </div>

    </div>
  )
}

export default CarCard