/* eslint-disable no-unused-vars */
import React from 'react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ArrowUpRight } from 'lucide-react'

const rowVariantsLeft = {
  hidden: { opacity: 0, x: -40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const rowVariantsRight = {
  hidden: { opacity: 0, x: 40 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6, ease: 'easeOut' },
  },
}

const imageHover = {
  hover: { scale: 1.02, y: -6 },
}

function StudentTeacher() {
  return (
    <div className='w-full px-20 py-10 flex flex-col justify-center items-center gap-30'>

      {/* STUDENTS ROW */}
      <motion.div
        className='w-full flex flex-row justify-center items-center gap-16'
        variants={rowVariantsLeft}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div
          className='bg-[#F9E3BE] w-1/2 aspect-3/2 rounded-2xl overflow-hidden flex justify-center items-center'
          variants={imageHover}
          whileHover="hover"
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <motion.img
            src="./home/students.jpg"
            alt="student"
            className='h-full mx-auto'
            initial={{ scale: 1.02 }}
            whileInView={{ scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </motion.div>

        <div className='w-1/2 flex flex-col gap-6'>
          <motion.span
            className='text-color-600 font-medium'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            STUDENTS
          </motion.span>

          <motion.div
            className='text-5xl leading-tight'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            You can Learn <br />
            <span className='font-semibold relative inline-block'>
              Anything
              <motion.img
                src="./home/double-line.png"
                alt=""
                className='w-full absolute right-0 -bottom-5 -z-1 scale-75'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </span>
          </motion.div>

          <motion.p
            className='text-lg text-muted-foreground w-full max-w-[400px] mt-4'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Build a deep, solid understanding in biology, math, physics and more.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="w-fit text-lg rounded-full !px-8 !py-7 mt-10"
            >
              Request a Tutor <ArrowUpRight className='!w-5 !h-5' />
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* TEACHERS ROW */}
      <motion.div
        className='w-full flex flex-row justify-center items-center gap-16'
        variants={rowVariantsRight}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <div className='w-1/2 flex flex-col gap-6'>
          <motion.span
            className='text-color-600 font-medium'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            TEACHERS
          </motion.span>

          <motion.div
            className='text-5xl leading-tight'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            Personalised <span className='font-semibold'>Professional Online Tutor</span> On Your <br />
            <span className='font-semibold relative inline-block'>
              Schedule
              <motion.img
                src="./home/line.png"
                alt=""
                className='w-full absolute -right-[40%] -bottom-3 -z-1'
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                viewport={{ once: true }}
              />
            </span>
          </motion.div>

          <motion.p
            className='text-lg text-muted-foreground w-4/5 mt-4'
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            We empower teachers to support their entire classroom. 90% of teachers who have used this Platform have found effective.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.15, ease: 'easeOut' }}
            viewport={{ once: true }}
          >
            <Button
              variant="outline"
              className="w-fit text-lg rounded-full !px-8 !py-7 mt-4"
            >
              Request a Tutor <ArrowUpRight className='!w-5 !h-5' />
            </Button>
          </motion.div>
        </div>

        <motion.div
          className='bg-[#FAE5DB] w-1/2 aspect-3/2 rounded-2xl overflow-hidden relative'
          variants={imageHover}
          whileHover="hover"
          transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        >
          <motion.img
            src="./home/bg.png"
            alt="background"
            className='w-full object-cover absolute z-5 top-0 left-0'
            initial={{ scale: 1.05, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
          <motion.img
            src="./home/teachers.png"
            alt="teacher"
            className='absolute w-[65%] z-10 bottom-0 right-0'
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
            viewport={{ once: true }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}

export default StudentTeacher
