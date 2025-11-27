import React from 'react'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { ArrowUpRight } from 'lucide-react'
import { Separator } from '../ui/separator'

function Hero() {
  return (
    <div className='w-full h-[calc(100vh-5rem)] px-20 flex flex-row justify-between items-center'>

      <div className='w-[45%] h-full flex flex-col justify-center items-start gap-20'>
        <Badge variant="outline" className={"px-6 py-2 text-base bg-[#F5F6FD] border-[#8D82E5] text-color-600"}>India’s No.1 Tutor Finder</Badge>

        <div className='space-y-8 relative'>
          <h1 className='text-5xl font-bold w-9/10 leading-tight'>Find the Perfect Tutor for
            Your Learning Journey</h1>

            <p className='text-lg text-muted-foreground w-9/10'>Connect with skilled tutors from anywhere in the world — learn at your pace, in your style.</p>

            <img src="./home/curly.png" alt="curly" className='absolute w-24 top-[20%] -left-[8%]'/>
        </div>

        <div className='space-x-4 mb-20'>
          <Button className={"text-lg rounded-full !px-8 !py-7"}>Book a Demo <ArrowUpRight className='!w-5 !h-5'/></Button>
          <Button variant={"outline"} className={"text-lg rounded-full !px-8 !py-7"}> Get Started <ArrowUpRight className='!w-5 !h-5' /></Button>
        </div>

        <div className='flex flex-row w-full justify-start items-center gap-8'>
          <div className='flex flex-row items-center gap-3'>
            <span className='text-5xl font-medium'>10K</span>
            <span className='text-lg leading-tight font-medium'> Trusted <br/> Users</span>
          </div>
          <Separator orientation='vertical'/>
          <div className='flex flex-row items-center gap-3'>
            <span className='text-5xl font-medium'>3.8K</span>
            <span className='text-lg leading-tight font-medium'> Positive <br/> Review</span>
          </div>
          <Separator orientation='vertical'/>
          <div className='flex flex-row items-center gap-3'>
            <span className='text-5xl font-medium'>98%</span>
            <span className='text-lg leading-tight font-medium'> Growth <br/> Rate</span>
          </div>
        </div>
      </div>
      <div className='w-[55%] h-full flex justify-start items-center'>
        <img src="./hero-img.png" alt="image" className='w-full'/>
      </div>
    </div>
  )
}

export default Hero