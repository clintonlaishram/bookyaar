import React from 'react'

function RegistrationHero() {
    return (
        <div className='w-full px-20 pt-14 space-y-6'>
            <div className='w-full flex flex-col justify-center items-center gap-6'>

                <div className='text-5xl text-center'><span className='font-semibold'>Become a Tutor</span> — Share <br /> Your Expertise With <span className='font-semibold'>Thousands of Students</span></div>

                <p className='w-full max-w-3xl text-center text-lg text-muted-foreground'>Join our growing community of trusted educators. Register as a tutor, create your profile, and connect with students who are actively seeking quality learning support. Teach on your schedule, set your own rates, and grow your teaching impact.</p>
            </div>
            <img src="./tutor/tutor-landing.png" alt="image" className='w-full -translate-y-[20%]' />
        </div>
    )
}

export default RegistrationHero