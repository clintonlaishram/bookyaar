/* eslint-disable no-unused-vars */
import React from "react";
import { motion } from "framer-motion";

function AppDownload() {
  return (
    <div className="w-full px-20 mb-6 flex flex-row gap-10">
      {/* Left: Phone Image */}
      <motion.div
        className="w-1/2 flex justify-end items-center"
        initial={{ opacity: 0, x: -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <motion.img
          src="./home/smartphone.png"
          alt="BookYaar app on smartphone"
          className="w-4/5"
          animate={{ y: [0, -8, 0] }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </motion.div>

      {/* Right: Text & Buttons */}
      <div className="flex flex-col justify-center items-start">
        <motion.div
          className="text-5xl leading-tight font-medium"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Learners On The Go
        </motion.div>

        <motion.p
          className="text-lg text-muted-foreground w-full max-w-md mt-4"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          Start or schedule lessons anytime, anywhere with our Android and iPhone apps.
        </motion.p>

        <motion.div
          className="flex flex-row gap-6 mt-8"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.15, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          {/* Google Play Button */}
          <motion.button
            className="h-16 w-52 p-3 rounded-lg bg-[#252525] flex flex-row gap-2 text-[#fff]"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <img src="./playstore.png" alt="Google Play" className="h-[95%]" />
            <div className="flex flex-col justify-center items-start">
              <span className="text-sm leading-tight">Available on</span>
              <span className="text-xl font-semibold leading-tight">
                Google Play
              </span>
            </div>
          </motion.button>

          {/* App Store Button */}
          <motion.button
            className="h-16 w-52 p-3 rounded-lg bg-[#252525] flex flex-row gap-2 text-[#fff]"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 260, damping: 18 }}
          >
            <img src="./apple.png" alt="App Store" className="h-[95%]" />
            <div className="flex flex-col justify-center items-start">
              <span className="text-sm leading-tight">Available on</span>
              <span className="text-xl font-semibold leading-tight">
                App Store
              </span>
            </div>
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

export default AppDownload;
