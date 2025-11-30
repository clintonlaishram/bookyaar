/* eslint-disable no-unused-vars */
import React from "react";
import { Carousel, Card } from "@/components/ui/apple-cards-carousel";
import { motion } from "framer-motion";

const data = [
  {
    category: "Delhi",
    title: "",
    src: "./home/delhi.jpg",
  },
  {
    category: "Mumbai",
    title: "",
    src: "./home/mumbai.jpg",
  },
  {
    category: "Chennai",
    title: "",
    src: "./home/chennai.jpg",
  },
  {
    category: "Bengaluru",
    title: "",
    src: "./home/bengaluru.jpg",
  },
  {
    category: "Hyderabad",
    title: "",
    src: "./home/delhi.jpg", 
  },
  {
    category: "Kolkata",
    title: "",
    src: "./home/mumbai.jpg",
  },
  {
    category: "Pune",
    title: "",
    src: "./home/chennai.jpg",
  },
  {
    category: "Ahmedabad",
    title: "",
    src: "./home/bengaluru.jpg",
  },
];

export default function LocationWeServe() {
  const cards = data.map((card, index) => (
    <Card key={`${card.category}-${index}`} card={card} index={index} layout />
  ));

  return (
    <section className="w-full">
      <div className="w-full h-full px-6 md:px-20">
        <div className="flex flex-col gap-6">
          <motion.span
            className="text-color-600 font-medium tracking-wide"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.6 }}
          >
            LOCATION WE SERVE
          </motion.span>

          <motion.div
            className="text-3xl leading-snug md:text-5xl md:leading-tight"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            The Best of{" "}
            <span className="font-semibold">Professional Online Tutor</span>,{" "}
            Here for <span className="font-semibold">You</span>
          </motion.div>

          <motion.p
            className="text-base text-muted-foreground md:text-lg md:w-4/5"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.08, ease: "easeOut" }}
            viewport={{ once: true, amount: 0.5 }}
          >
            At BookYaar, we bring together India&apos;s best tutors — all in one
            place.
            <br />
            No matter where you live, you can now learn from qualified,
            experienced, and passionate teachers across every major city in
            India.
          </motion.p>
        </div>
      </div>

      <Carousel items={cards} />
    </section>
  );
}
