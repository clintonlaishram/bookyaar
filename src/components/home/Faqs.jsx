/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const Faqs = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const faqs = [
    {
      question: "How does this platform work?",
      answer:
        "Our platform connects students with verified tutors across India. Simply sign up, search for a tutor by subject or skill, view their profile and ratings, and book your session online — it's that easy!",
    },
    {
      question: "How do I become a tutor?",
      answer:
        "To become a tutor on BookYaar, you just need to create a tutor account, complete your profile with your qualifications, experience, and subjects you teach, and upload any required documents. Our team will review your profile, and once approved, students can start booking sessions with you.",
    },
    {
      question: "Are the tutors verified?",
      answer:
        "Yes. Every tutor on BookYaar goes through a verification process that may include ID checks, qualification review, and profile screening. We do this to ensure students and parents connect with safe, authentic, and reliable educators.",
    },
    {
      question: "How are online sessions conducted?",
      answer:
        "Online sessions are conducted through secure video platforms such as Zoom or Google Meet. After booking a session, you’ll receive a meeting link and details from your tutor. You can join from your laptop, tablet, or phone at the scheduled time.",
    },
    {
      question: "What subjects or skills can I learn?",
      answer:
        "You can learn a wide range of academic subjects like Math, Science, English, and Social Studies, as well as competitive exam prep, coding, language learning, and many more skills. New subjects and categories are added regularly based on student demand.",
    },
  ];

  return (
    <div className="w-full px-20 flex flex-col  items-start justify-center gap-8 relative">
      <motion.img
        src="./home/cloud.png"
        alt="cloud"
        className="absolute w-[10rem] -top-12 right-[5%] opacity-60"
        animate={{ y: [0, -12, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      />

      <motion.span
        className="text-color-600 font-medium"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        FAQs
      </motion.span>

      <motion.div
        className="text-5xl leading-tight"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Have <span className="font-semibold">questions?</span> <br /> We've got
        your{" "}
        <span className="font-semibold relative inline-block">
          answers.
          <motion.img
            src="./home/double-line.png"
            alt=""
            className="w-full absolute right-0 -bottom-5 -z-1 scale-75"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          />
        </span>
      </motion.div>

      <div className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            className="border-b border-slate-200 py-4 cursor-pointer"
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-medium">{faq.question}</h3>

              <div className="bg-color-50 p-1 rounded-full">
                <ChevronDown
                  className={`${openIndex === index ? "rotate-180" : ""
                    } translate-y-[1px] transition-all duration-500 ease-in-out`}
                />
              </div>
            </div>

            <p
              className={`text-base text-muted-foreground transition-all duration-500 ease-in-out max-w-4xl ${openIndex === index ? "opacity-100 max-h-[300px] translate-y-0 pt-4" : "opacity-0 max-h-0 -translate-y-2"}`}>
              {faq.answer}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Faqs;
