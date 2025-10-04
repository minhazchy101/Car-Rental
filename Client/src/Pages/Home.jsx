import React from 'react'
import Hero from '../components/Hero'
import Featured from '../components/Featured'
import Banner from '../components/Banner'
import Testimonial from '../components/Testimonial'
import Newsletter from '../components/Newsletter'

const Home = () => {
  return (
    <div>
        <Hero/>
        <Featured/>
        <Banner/>
        <Testimonial/>
        <Newsletter/>
    </div>
  )
}

export default Home