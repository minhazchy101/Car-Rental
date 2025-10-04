import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { assets, dummyCarData } from '../assets/assets'
import Loader from '../components/Loader'

const CarDetails = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const [car , setCar] = useState(null)

  const currency = import.meta.env.VITE_CURRENCY ;

  useEffect(()=>{
    setCar(dummyCarData.find(c => c._id === id))
  },[id])

// console.log(car)

const handleSubmit = async(e)=>{
  e.preventDefault()
  console.log(e)

}
  return car ? (
    <div className='px-6 md:px-16 lg:px-24 xl:px-32 mt-16'>


      <button onClick={()=> navigate(-1)} className='flex items-center gap-2 mb-6 text-gray-500 cursor-pointer'>Back to all Cars<img src={assets.arrow_icon} alt="" /></button>

<div className='grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12'>
{/* Left : car image & Details */}
<div className='lg:col-span-2'>
  <img src={car.image} alt="" className='w-full h-auto md:max-h-100 object-cover rounded-xl mb-6 shadow-lg' />

  <div className='space-y-6'>
    <div>
      <h1 className='text-3xl font-bold'>{car.brand} {car.model}</h1>
      <p className='text-gray-500 text-lg'>
        {car.category} <span></span>
        {car.year}
      </p>
    </div>
    <hr className='border-borderColor my-6' />

    <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
      {[
        {icon : assets.users_icon ,
          text : `${car.seating_capacity} Seats`
        },
        {icon : assets.fuel_icon ,
          text : car.fuel_type
        },
        {icon : assets.car_icon ,
          text : car.transmission
        },
        {icon : assets.location_icon ,
          text : car.location
        },
      ].map(({icon , text})=>(
        <div key={text} className='flex flex-col items-center bg-light p-4 rounded-lg'>
          <img src={icon} alt="" className='h-5 mb-2' />
          {text}

        </div>
      ))}


    </div>
{/* description */}
      <div >
        <h1 className='text-xl font-medium mb-3'>Description</h1>
        <p className='text-gray-500'>{car.description}</p>

      </div>
{/* feature */}
      <div >
        <h1 className='text-xl font-medium mb-3'>Feature</h1>
        <ul className='grid grid-cols-1 sm:grid-cols-2 gap-2'>
      {
        ["360 Camera" , "AC" , " Bluetooth" , "GPS" , "Rar View Mirror"].map((item)=>(
          <li key={item} className='flex items-center text-gray-500'><img src={assets.check_icon} alt="" className='h4
           mr-2' />{item}</li>
        ))
      }
        </ul>
       

      </div>

  </div>

</div>

{/* right */}
<form onSubmit={handleSubmit} className='shadow-lg h-max sticky top-8 rounded-lg p-6 space-y-6 text-gray-500'>
  <p className='flex items-center justify-between text-2xl text-gray-500 font-semibold'>{currency}{car.pricePerDay} <span className='text-base text-gray-400 font-normal'>per day</span></p>
<hr className='border-borderColor'/>

<div className="flex flex-col gap-3">
<label htmlFor="pickup-date">Pick-up Date</label>
<input type="date" name="" id="pickup-date" className='border border-borderColor px-3 py-2 rounded-lg' required min={new Date().toISOString().split('T')[0]}/>
</div>

<div className="flex flex-col gap-3">
<label htmlFor="return-date">Return Date</label>
<input type="date" name="" id="return-date" className='border border-borderColor px-3 py-2 rounded-lg' required />
</div>

      <button className='w-full bg-primary hover:bg-primary-dull transition-all py-3 font-medium text-white rounded-xl cursor-pointer'> Book Now</button>

<p className='text-center text-sm'>No Crad required to reserve</p>


</form>

</div>



    </div>
  ) : <Loader/>
}

export default CarDetails