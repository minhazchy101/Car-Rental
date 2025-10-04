import React from 'react'
import Title from './Title'
import { assets } from '../assets/assets';

const Testimonial = () => {
    const testimonials = [
        { id : 1,
             name: "Emma Rodriguez",
           location: "Barcelona, Spain",
            image: assets.testimonial_image_1,
             testimonial: "I've rented cars from various companies, but the experience with CarRental was exceptional." },
        {  id : 2,
  name: "Liam Carter",
  location: "Sydney, Australia",
  image: assets.testimonial_image_2,
  testimonial: "Booking was simple, the car was spotless, and the service exceeded my expectations."  
},  
{  id : 3,
  name: "Sofia Martins",
  location: "Lisbon, Portugal",
  image: assets.testimonial_image_2,
  testimonial: "CarRental made my trip stress-free. Pickup and drop-off were smooth and fast."  
},  
// {  
//   name: "Noah Patel",
//   location: "Toronto, Canada",
//   image: assets.testimonial_image_4,
//   testimonial: "Affordable rates with reliable cars — I’ll definitely book again."  
// }  

        ];
  return (
     <div className="py-28 px-6 md:px-16 lg:px-24 xl:px-44">
           
    <Title title='What Our Customers Say' subTitle='Discover why discerning travelers choose StayVenture for their luxury accommodations around the world.'/>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-18">
                {testimonials.map((testimonial) => (
                    <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-lg hover:-translate-y-1 transition-all duration-500">
                        <div className="flex items-center gap-3">
                            <img className="w-12 h-12 rounded-full" src={testimonial.image} alt={testimonial.name} />
                            <div>
                                <p className="text-xl">{testimonial.name}</p>
                                <p className="text-gray-500">{testimonial.location}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-1 mt-4">
                            {Array(5).fill(0).map((_, index) => (
                                <img key={index} src={assets.star_icon} alt="star" />
                                
                            ))}
                        </div>
                        <p className="text-gray-500 max-w-90 mt-4 font-light">"{testimonial.testimonial}"</p>
                    </div>
                ))}
            </div>
        </div>
  )
}

export default Testimonial