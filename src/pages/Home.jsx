import AppDownload from '@/components/home/AppDownload'
import Faqs from '@/components/home/Faqs'
import Hero from '@/components/home/Hero'
import LocationWeServe from '@/components/home/LocationWeServe'
import SecondSection from '@/components/home/SecondSection'
import StudentTeacher from '@/components/home/StudentTeacher'
import Testimonial from '@/components/home/Testimonial'
import TopServices from '@/components/home/TopServices'
import WhyChooseUs from '@/components/home/WhyChooseUs'
import React, { useEffect } from 'react'

function Home() {
  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", 
    });
  }, []);

  return (
    <div className='max-width manrope space-y-30'>
      <div className='space-y-14'>

        <Hero />
        <SecondSection />
      </div>
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