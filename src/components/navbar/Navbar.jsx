import React from 'react'
import { Button } from '../ui/button'

function Navbar() {
  return (
    <div className='w-full h-[4.5rem] sticky top-0 bg-white z-50'>
        <nav className='max-width h-full flex justify-between items-center'>
            <div>
                <span>BookYaar</span>
            </div>

            <div>
                <span>Home</span>
                <span>Tution</span>
                <span>Become a Tutor</span>
                <span>Known More</span>
            </div>

            <div>
                <Button>Request a Demo</Button>
                <Button>Contact Us</Button>
            </div>
        </nav>
    </div>
  )
}

export default Navbar