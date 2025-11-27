/* eslint-disable react-hooks/purity */
/* eslint-disable no-unused-vars */
import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'

// Helper hook: random rotation between -8 and 8, stable per component instance
const useRandomRotation = (min = -8, max = 8) => {
  return useMemo(() => {
    return Math.random() * (max - min) + min
  }, [min, max])
}

// Animation variants
const cardsWrapperVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

// Individual card components

const Physics = () => {
  const baseRotation = useRandomRotation()
  return (
    <motion.div
      className='w-full aspect-5/6 rounded-2xl shadow-lg relative overflow-hidden'
      style={{ rotate: baseRotation }}
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className='w-full h-[55%] bg-[#FFCE83]' />
      <div className='px-6 pb-5 w-full h-[45%] flex flex-col justify-end items-start gap-1'>
        <div className='absolute w-full top-[12%] left-0'>
          <img src="./home/physics.png" alt="physic" className='w-full h-full' />
        </div>
        <div className='text-xl font-medium'>Physics</div>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-red-400' />
          <span className='text-base text-muted-foreground'>13 Tutor Available</span>
        </div>
      </div>
    </motion.div>
  )
}

const Chemistry = () => {
  const baseRotation = useRandomRotation()
  return (
    <motion.div
      className='w-full aspect-5/6 rounded-2xl shadow-lg relative overflow-hidden'
      style={{ rotate: baseRotation }}
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className='w-full h-[60%] bg-[#4FA39F] rounded-b-[50%]' />
      <div className='px-6 pb-5 w-full h-[40%] flex flex-col justify-end items-start gap-1'>
        <div className='absolute w-full top-1 left-0 px-7'>
          <img src="./home/chemistry.png" alt="chemistry" className='w-full h-full' />
        </div>
        <div className='text-xl font-medium'>Chemistry</div>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-red-400' />
          <span className='text-base text-muted-foreground'>7 Tutor Available</span>
        </div>
      </div>
    </motion.div>
  )
}

const History = () => {
  const baseRotation = useRandomRotation()
  return (
    <motion.div
      className='w-full aspect-5/6 rounded-2xl shadow-lg relative overflow-hidden'
      style={{ rotate: baseRotation }}
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className='w-full h-[55%] bg-[#FFCE83]' />
      <div className='px-6 pb-5 w-full h-[45%] flex flex-col justify-end items-start gap-1'>
        <div className='absolute w-full top-[6%] left-[10%]'>
          <img src="./home/history.png" alt="history" className='w-[80%] h-full' />
        </div>
        <div className='text-xl font-medium'>History</div>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-red-400' />
          <span className='text-base text-muted-foreground'>8 Tutor Available</span>
        </div>
      </div>
    </motion.div>
  )
}

const AdvancedMaths = () => {
  const baseRotation = useRandomRotation()
  return (
    <motion.div
      className='w-full aspect-5/6 rounded-2xl shadow-lg relative overflow-hidden'
      style={{ rotate: baseRotation }}
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className='w-full h-[60%] bg-[#D5EBE9] rounded-b-[50%]' />
      <div className='px-6 pb-5 w-full h-[40%] flex flex-col justify-end items-start gap-1'>
        <div className='absolute w-full top-1 left-0 px-2'>
          <img src="./home/maths.png" alt="maths" className='w-full h-full' />
        </div>
        <div className='text-xl font-medium'>Advanced Maths</div>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-red-400' />
          <span className='text-base text-muted-foreground'>12 Tutor Available</span>
        </div>
      </div>
    </motion.div>
  )
}

const Geography = () => {
  const baseRotation = useRandomRotation()
  return (
    <motion.div
      className='w-full aspect-5/6 rounded-2xl shadow-lg relative overflow-hidden'
      style={{ rotate: baseRotation }}
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className='w-full h-[55%] bg-[#EEC4EA]' />
      <div className='px-6 pb-5 w-full h-[45%] flex flex-col justify-end items-start gap-1'>
        <div className='absolute w-full top-[3%] left-[10%]'>
          <img src="./home/geography.png" alt="geography" className='w-[80%] h-full' />
        </div>
        <div className='text-xl font-medium'>Geography</div>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-red-400' />
          <span className='text-base text-muted-foreground'>5 Tutor Available</span>
        </div>
      </div>
    </motion.div>
  )
}

const ForeignLanguage = () => {
  const baseRotation = useRandomRotation()
  return (
    <motion.div
      className='w-full aspect-5/6 rounded-2xl shadow-lg relative overflow-hidden'
      style={{ rotate: baseRotation }}
      variants={cardVariants}
      whileHover={{ rotate: 0, y: -8 }}
      transition={{ type: 'spring', stiffness: 260, damping: 18 }}
    >
      <div className='w-full h-[60%] bg-[#D5D509] rounded-b-[50%]' />
      <div className='px-6 pb-5 w-full h-[40%] flex flex-col justify-end items-start gap-1'>
        <div className='absolute w-full top-[5%] left-[25%]'>
          <img src="./home/english.png" alt="english" className='w-[50%] h-full' />
        </div>
        <div className='text-xl font-medium'>Foreign Language</div>
        <div className='flex flex-row items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-red-400' />
          <span className='text-base text-muted-foreground'>4 Tutor Available</span>
        </div>
      </div>
    </motion.div>
  )
}

function TopServices() {
  return (
    <div className='w-full px-20 flex flex-col justify-center items-center gap-6'>
      <motion.span
        className='text-color-600 font-medium'
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        SERVICES
      </motion.span>

      <motion.div
        className='text-5xl text-center leading-tight'
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <span className='font-semibold'>Courses</span> For Every Skill
        <span className='font-semibold'> Level</span>
        <br />
        <span className='font-semibold relative inline-block ml-2'>
          And Interest
          <motion.img
            src="./home/twist.png"
            alt=""
            className='w-20 absolute -right-[40%] -bottom-[120%] -z-1 rotate-35'
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </span>
      </motion.div>

      <Button className="text-lg rounded-full !px-8 !py-7 mt-8">
        Explore All Subject
      </Button>

      <motion.div
        className='w-full flex flex-row gap-10 justify-center items-center mt-10'
        variants={cardsWrapperVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Physics />
        <Chemistry />
        <History />
        <AdvancedMaths />
        <Geography />
        <ForeignLanguage />
      </motion.div>
    </div>
  )
}

export default TopServices
