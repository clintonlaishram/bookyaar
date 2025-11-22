import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowUpRight } from 'lucide-react'

function Hero() {
  return (
    <div className='h-[calc(100vh-5rem)] px-6 flex flex-row justify-center items-center gap-12'>

      <div className='w-full h-full flex flex-col justify-center items-start gap-20'>
        <Badge variant="outline" className={"px-6 py-2 text-base bg-[#F5F6FD] border-[#8D82E5] text-color-600"}>India’s No.1 Tutor Finder</Badge>

        <div className='space-y-8'>
          <h1 className='text-6xl font-bold'>Find the Perfect Tutor for
            Your Learning Journey</h1>

            <p className='text-xl text-muted-foreground '>Connect with skilled tutors from anywhere in the world — learn at your pace, in your style.</p>
        </div>

        <div className='space-x-4 mb-20'>
          <Button className={"text-lg rounded-full !px-8 !py-7"}>Book a Demo <ArrowUpRight className='!w-5 !h-5'/></Button>
          <Button variant={"outline"} className={"text-lg rounded-full !px-8 !py-7"}> Get Started <ArrowUpRight className='!w-5 !h-5' /></Button>
        </div>
      </div>
      <div className='w-full h-full justify-start items-center'></div>
    </div>
  )
}

export default Hero