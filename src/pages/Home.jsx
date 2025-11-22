import AppDownload from '@/components/home/AppDownload'
import Faqs from '@/components/home/Faqs'
import Hero from '@/components/home/Hero'
import LocationWeServe from '@/components/home/LocationWeServe'
import StudentTeacher from '@/components/home/StudentTeacher'
import Testimonial from '@/components/home/Testimonial'
import TopServices from '@/components/home/TopServices'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import React from 'react'

function Home() {
  return (
    <div className='max-width manrope'>
        <Hero />
        <WhyChooseUs />
        <TopServices />
        <StudentTeacher />
        <LocationWeServe />
        <Testimonial />
        <Faqs />
        <AppDownload />
    </div>
  )
}

export default Home