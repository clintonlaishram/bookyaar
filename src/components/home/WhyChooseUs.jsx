/* eslint-disable no-unused-vars */
import React from 'react'
import { HandCoins, Presentation, Waypoints, Zap } from 'lucide-react'
import { motion } from 'framer-motion'

const benefitsData = [
  {
    icon: Waypoints,
    color: "#8BBC46",
    heading: "One-On-One Teaching",
    paragraph: "All of our special education experts have a degree in their respected fields.",
  },
  {
    icon: Zap,
    color: "#90B5DB",
    heading: "24/7 Tutor Availability",
    paragraph: "All of our special education experts have a degree in their respected fields.",
  },
  {
    icon: Presentation,
    color: "#F6AB5B",
    heading: "Interactive Whiteboard",
    paragraph: "All of our special education experts have a degree in their respected fields.",
  },
  {
    icon: HandCoins,
    color: "#FFBE63",
    heading: "Affordable Price",
    paragraph: "All of our special education experts have a degree in their respected fields.",
  },
]

// Section + wrapper variants
const sectionVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
}

const gridVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: 'easeOut',
    },
  },
}

function WhyChooseUs() {
  return (
    <motion.div
      className='w-full px-20 flex flex-row gap-[6%]'
      variants={sectionVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      {/* Left Image */}
      <motion.div
        className='w-[40%] flex justify-end items-center'
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        viewport={{ once: true }}
      >
        <img
          src="./home/whychoose.png"
          alt="Why choose us"
          className='w-full max-w-[520px]'
        />
      </motion.div>

      {/* Right Content */}
      <div className='w-[60%] py-3 flex flex-col justify-end items-start gap-8'>
        <motion.span
          className='text-color-600 font-medium'
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          WHY CHOOSE US
        </motion.span>

        <motion.div
          className='text-5xl leading-tight'
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          viewport={{ once: true }}
        >
          <span className='font-semibold'>Benefits</span> of Online <br /> Services
          <span className='font-semibold relative inline-block ml-2'>
            At BookYaar
            <motion.img
              src="./home/line2.png"
              alt=""
              className='w-full absolute -right-[40%] -bottom-5 -z-1'
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
              viewport={{ once: true }}
            />
          </span>
        </motion.div>

        {/* Grid Cards */}
        <motion.div
          className='grid grid-cols-2 gap-10 mt-10'
          variants={gridVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {benefitsData.map((item, index) => {
            const Icon = item.icon
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                whileHover={{ y: -6, scale: 1.02 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className='w-full flex flex-col gap-4 cursor-pointer'
              >
                <Icon
                  className='!w-6 !h-6'
                  style={{ color: item.color }}
                />

                <span className='text-3xl font-medium mt-5'>
                  {item.heading}
                </span>

                <p className='text-lg text-muted-foreground'>
                  {item.paragraph}
                </p>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.div>
  )
}

export default WhyChooseUs
