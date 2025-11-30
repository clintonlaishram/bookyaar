/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { ArrowUpRight } from "lucide-react";
import { Separator } from "../ui/separator";
import Counter from "../ui/counter";
import { useNavigate } from "react-router-dom";

const containerVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

function Hero() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-[calc(100vh-5rem)] px-20 flex flex-row justify-between items-center">
      {/* LEFT SECTION */}
      <motion.div
        className="w-[45%] h-full flex flex-col justify-center items-start gap-14"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        {/* Badge */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.1}
        >
          <Badge
            variant="outline"
            className={
              "px-6 py-2 text-base bg-[#F5F6FD] border-[#8D82E5] text-color-600"
            }
          >
            India’s No.1 Tutor Finder
          </Badge>
        </motion.div>

        {/* Title + Copy */}
        <motion.div
          className="space-y-8 relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.2}
        >
          <motion.h1 className="text-5xl font-bold w-9/10 leading-tight">
            Find the Perfect Tutor for
            Your Learning Journey
          </motion.h1>

          <motion.p className="text-lg text-muted-foreground w-9/10">
            Connect with skilled tutors from anywhere in the world — learn at
            your pace, in your style.
          </motion.p>

          <motion.img
            src="./home/curly.png"
            alt="curly"
            className="absolute w-24 top-[20%] -left-[8%]"
            initial={{ opacity: 0, x: -10, y: -10 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut", delay: 0.2 }}
            viewport={{ once: true }}
          />
        </motion.div>

        {/* Buttons */}
        <motion.div
          className="space-x-4 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.3}
        >
          <motion.span
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Button className={"text-lg rounded-full !px-8 !py-7"} onClick={() => navigate("/tutor-register")}>
              Become a tutor
              <ArrowUpRight className="!w-5 !h-5 ml-2" />
            </Button>
          </motion.span>

          <motion.span
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.97 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <Button
              variant={"outline"}
              className={"text-lg rounded-full !px-8 !py-7"}
            >
              Get Started
              <ArrowUpRight className="!w-5 !h-5 ml-2" />
            </Button>
          </motion.span>
        </motion.div>

        {/* Stats */}
        <motion.div
          className="flex flex-row w-full justify-start items-center gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          custom={0.35}
        >
          {/* 10K */}
          <div className="flex flex-row items-center gap-3">
            <span className="text-5xl font-medium">
              <Counter from={0} to={10} suffix="K" duration={2} />
            </span>
            <span className="text-lg leading-tight font-medium">
              Trusted <br /> Users
            </span>
          </div>

          <Separator orientation="vertical" />

          {/* 3.8K+ */}
          <div className="flex flex-row items-center gap-3">
            <span className="text-5xl font-medium">
              <Counter from={0} to={3.8} suffix="K+" duration={2.2} decimals={1} />
            </span>
            <span className="text-lg leading-tight font-medium">
              Positive <br /> Review
            </span>
          </div>

          <Separator orientation="vertical" />

          {/* 98% */}
          <div className="flex flex-row items-center gap-3">
            <span className="text-5xl font-medium">
              <Counter from={0} to={98} suffix="%" duration={2.5} />
            </span>
            <span className="text-lg leading-tight font-medium">
              Growth <br /> Rate
            </span>
          </div>
        </motion.div>
      </motion.div>

      {/* RIGHT SECTION – HERO IMAGE */}
      <motion.div
        className="w-[55%] h-full flex justify-start items-center"
        initial={{ opacity: 0, x: 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        viewport={{ once: true, amount: 0.4 }}
      >
        <motion.img
          src="./hero-img.png"
          alt="image"
          className="w-full"
          animate={{ y: [0, -10, 0] }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>
    </div>
  );
}

export default Hero;
