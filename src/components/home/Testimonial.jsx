/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Separator } from "../ui/separator";
import StarRating from "../ui/star-rating";

const TestimonialCard = ({ testimonial }) => {
  return (
    <div className="w-92 h-58 bg-white rounded-xl shadow-md shadow-[#d4d3d3]/40 p-6 flex flex-col justify-start gap-4">
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={testimonial.name}
          className="w-16 h-16 rounded-full object-cover"
        />
        <div>
          <p className="text-gray-900 font-semibold text-xl">
            {testimonial.name}
          </p>
          <p className="text-[#AFADAD] text-sm">{testimonial.role}</p>
          <StarRating rating={testimonial.rating} />
        </div>
      </div>

      <Separator />

      <p className="text-muted-foreground text-base line-clamp-3">
        {testimonial.quote}
      </p>
    </div>
  );
};

// 🔁 Simple infinite marquee row using Framer Motion
const MarqueeRow = ({ items, direction = "left", duration = 180 }) => {
  // duplicate items to make the loop seamless
  const loopItems = [...items, ...items];

  const animateConfig =
    direction === "left"
      ? { x: ["0%", "-50%"] } // move right → left
      : { x: ["-50%", "0%"] }; // move left → right

  return (
    <div className="py-1 flex flex-row flex-wrap justify-center items-center overflow-hidden">
      <motion.div
        className="flex flex-row flex-nowrap justify-center items-center gap-7"
        animate={animateConfig}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {loopItems.map((testimonial, index) => (
          <div key={`${direction}-${index}`} className="shrink-0">
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

function Testimonial() {
  const testimonials1 = [
    {
      quote:
        "BookYaar has transformed the way I learn. The tutors are knowledgeable and supportive.",
      name: "Aarav Sharma",
      role: "Student, Delhi",
      avatar: "./testimonial/t1.jpg",
      rating: 4.5,
    },
    {
      quote:
        "As a parent, I appreciate the personalized approach BookYaar offers. My child is thriving!",
      name: "Neha Gupta",
      role: "Parent, Kolkata",
      avatar: "./testimonial/t2.png",
      rating: 4.3,
    },
    {
      quote:
        "Teaching through BookYaar has been a rewarding experience. The platform connects me with eager learners.",
      name: "Rohit Verma",
      role: "Tutor, Mumbai",
      avatar: "./testimonial/t3.png",
      rating: 3.7,
    },
     {
      quote:
        "BookYaar makes quality education accessible from anywhere. It’s incredibly convenient.",
      name: "Priya Singh",
      role: "Student, Noida",
      avatar: "./testimonial/t4.jpg",
      rating: 4.8,
    },
    {
      quote:
        "The progress tracking and feedback help me stay involved in my child’s learning journey.",
      name: "Rahul Mehta",
      role: "Parent, Dehradun",
      avatar: "./testimonial/t5.jpg",
      rating: 4.2,
    },
    {
      quote:
        "I love how easy it is to schedule classes and manage my students on BookYaar.",
      name: "Anita Desai",
      role: "Tutor, Tamil Nadu",
      avatar: "./testimonial/t6.jpg",
      rating: 4.9,
    },
  ];

  const testimonials2 = [
     {
      quote:
        "BookYaar has transformed the way I learn. The tutors are knowledgeable and supportive.",
      name: "Aarav Sharma",
      role: "Student, Delhi",
      avatar: "./testimonial/t1.jpg",
      rating: 4.5,
    },
    {
      quote:
        "As a parent, I appreciate the personalized approach BookYaar offers. My child is thriving!",
      name: "Neha Gupta",
      role: "Parent, Kolkata",
      avatar: "./testimonial/t2.png",
      rating: 4.3,
    },
    {
      quote:
        "Teaching through BookYaar has been a rewarding experience. The platform connects me with eager learners.",
      name: "Rohit Verma",
      role: "Tutor, Mumbai",
      avatar: "./testimonial/t3.png",
      rating: 3.7,
    },
    {
      quote:
        "BookYaar makes quality education accessible from anywhere. It’s incredibly convenient.",
      name: "Priya Singh",
      role: "Student, Noida",
      avatar: "./testimonial/t4.jpg",
      rating: 4.8,
    },
    {
      quote:
        "The progress tracking and feedback help me stay involved in my child’s learning journey.",
      name: "Rahul Mehta",
      role: "Parent, Dehradun",
      avatar: "./testimonial/t5.jpg",
      rating: 4.2,
    },
    {
      quote:
        "I love how easy it is to schedule classes and manage my students on BookYaar.",
      name: "Anita Desai",
      role: "Tutor, Tamil Nadu",
      avatar: "./testimonial/t6.jpg",
      rating: 4.9,
    },
  ];

  return (
    <div className="rounded-4xl mx-4 md:mx-20 bg-color-50 space-y-5 pt-12 pb-14 relative overflow-hidden">
      <div className="flex flex-col justify-center items-center gap-6 pb-12">
        <motion.span
          className="text-color-600 font-medium"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          TESTIMONIAL
        </motion.span>

        <motion.div
          className="text-3xl md:text-5xl text-center leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          What Our <span className="font-semibold">Tutors, Students</span> And
          <br />
          <span className="font-semibold"> Parents Say</span>
        </motion.div>
      </div>

      {/* Row 1 – move right to left */}
      <MarqueeRow items={testimonials1} direction="left" duration={120} />

      {/* Row 2 – move left to right */}
      <MarqueeRow items={testimonials2} direction="right" duration={120} />

      <div className="absolute h-full w-64 top-0 left-0 bg-gradient-to-r from-color-50 via-transparent to-transparent"/>
      <div className="absolute h-full w-64 top-0 right-0 bg-gradient-to-l from-color-50 via-transparent to-transparent"/>
    </div>
  );
}

export default Testimonial;
