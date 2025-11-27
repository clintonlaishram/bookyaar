import React from 'react'
import { Button } from '../ui/button'
import { ArrowDown, ArrowRight, ArrowUpRight, ChevronDown } from 'lucide-react'

function Navbar() {
    return (
        <div className='w-full h-[4.5rem] sticky top-0 bg-transparent backdrop-blur-lg z-50'>
            <nav className='px-6 max-width h-full flex justify-between items-center '>
                <div className='w-1/8'>
                    <img src="./logo.png" alt="logo" className='w-12'/>
                    {/* <span className='text-3xl font-extrabold'>BookYaar</span> */}
                </div>

                <div className='flex flex-row gap-8 text-lg'>
                    <span>Home</span>
                    <span className='flex items-center gap-1'>Tution <ChevronDown className='mt-0.5'/> </span>
                    <span>Become a Tutor</span>
                    <span className='flex items-center gap-1'>Known More <ChevronDown className='mt-0.5'/></span>
                </div>

                <div className='space-x-4'>
                    <Button variant={"outline"} className={"text-base rounded-full !px-5 !py-6"}>Request a Demo <ArrowUpRight className='!w-5 !h-5' /></Button>
                    <Button className={"text-base rounded-full !px-5 !py-6"}>Contact Us <ArrowRight className='!w-5 !h-5' /></Button>
                </div>
            </nav>
        </div>
    )
}

export default Navbar