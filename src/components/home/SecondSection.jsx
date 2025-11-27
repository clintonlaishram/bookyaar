/* eslint-disable no-unused-vars */
import React from 'react'
import { Button } from '../ui/button'
import { BookOpenText, CircleUserRound, GalleryHorizontalEnd, MoveRight } from 'lucide-react'
import { motion } from 'framer-motion'

const cardData = [
    {
        icon: CircleUserRound,
        heading: "Expert Tutors",
        paragraph: "Connecting people who want to learn with great teachers",
    },
    {
        icon: BookOpenText,
        heading: "Online Courses",
        paragraph: "Connecting people who want to learn with great teachers",
    },
    {
        icon: GalleryHorizontalEnd,
        heading: "Easy Registration",
        paragraph: "Connecting people who want to learn with great teachers",
    },
]

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

const cardsWrapperVariants = {
    hidden: {},
    visible: {
        transition: {
            staggerChildren: 0.15,
        },
    },
}

const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.96 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: 'easeOut' },
    },
}

function SecondSection() {
    return (
        <motion.div
            className="w-full px-20 flex flex-row justify-between gap-8"
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
        >
            {/* Left Side */}
            <div className="w-[40%] pt-8 pb-10 min-h-full flex flex-col justify-between items-start relative">
                <motion.h2
                    className="text-4xl font-medium mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    Modern learning <br /> for everyone
                </motion.h2>

                <motion.p
                    className="text-lg text-muted-foreground"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1, ease: 'easeOut' }}
                    viewport={{ once: true }}
                >
                    An investment in knowledge pays the best interest — grow your creative.
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className="mt-auto"
                >
                    <Button variant="link" className="!p-0 text-lg text-color-800">
                        Explore Tutor <MoveRight className="!w-5 !h-5" />
                    </Button>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3, ease: 'easeOut' }}
                    viewport={{ once: true }}
                    className='absolute w-2/5 -bottom-2 -right-4 -rotate-8'
                >
                    <img src="./home/smiely.png" alt="" className='w-full opacity-60' />
                </motion.div>
            </div>

            {/* Cards */}
            <motion.div
                className="flex flex-row gap-8"
                variants={cardsWrapperVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                {cardData.map((item, index) => {
                    const Icon = item.icon
                    return (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover={{ y: -8, scale: 1.02 }}
                            transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                            className="px-10 py-12 hover:bg-color-50 rounded-2xl flex flex-col gap-5 cursor-pointer"
                        >
                            <Icon className="w-10 h-10 mb-5" strokeWidth={1.5} />
                            <span className="text-3xl font-medium">{item.heading}</span>
                            <p className="text-lg text-muted-foreground">{item.paragraph}</p>
                        </motion.div>
                    )
                })}
            </motion.div>
        </motion.div>
    )
}

export default SecondSection
