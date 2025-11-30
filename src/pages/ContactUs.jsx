/* eslint-disable no-unused-vars */
import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  User,
  MessageSquare,
  Building,
  ArrowRight,
  Sparkles,
  CheckCircle,
  Clock,
  Globe,
  Shield,
  Zap,
} from "lucide-react";
import AppDownload from "@/components/home/AppDownload";

// Contact methods tailored for BookYaar
const contactMethods = [
  {
    icon: Mail,
    title: "Email Support",
    description: "For parents, students & tutors",
    value: "support@bookyaar.com",
    link: "mailto:support@bookyaar.com",
    gradient: "from-primary/10 to-primary/5",
    hoverColor: "blue",
  },
  {
    icon: Phone,
    title: "Talk to Our Team",
    description: "Mon – Sat, 10:00 AM – 7:00 PM IST",
    value: "+91 95557 93629",
    link: "tel:+919555793629",
    gradient: "from-emerald-200/80 to-emerald-100/40",
    hoverColor: "green",
  },
  {
    icon: MapPin,
    title: "Serving Now Only In Delhi",
    description: "Online & home tuition in major cities",
    value: "Coming Soon to other cities",
    link: "#bookyaar-locations",
    gradient: "from-purple-200/40 to-pink-200/40",
    hoverColor: "purple",
  },
];

// Stats rewritten for an ed-tech / tutoring platform
const companyStats = [
  { label: "Avg. Tutor Response", value: "< 2 hours", icon: Clock },
  { label: "Students Learning", value: "2,000+", icon: Globe },
  { label: "Verified Tutors", value: "500+", icon: Shield },
  { label: "Session Rating", value: "4.8 / 5", icon: Zap },
];

export default function ContactUs() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (formData.message.trim().length < 10) {
      newErrors.message = "Message must be at least 10 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    // TODO: Replace with your real API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 0.86, 0.39, 0.96],
      },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, []);

  return (
    <>

      <section className="w-full max-width px-20 relative py-20 mb-20 bg-transparent text-foreground overflow-hidden">
        {/* Background overlay (very soft, for white/light bg) */}
        <div className="absolute inset-0 pointer-events-none">
          {/* Animated gradient mesh - super subtle */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5"
            animate={{
              backgroundPosition: ["0% 0%", "100% 100%", "0% 0%"],
            }}
            transition={{
              duration: 35,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{
              backgroundSize: "400% 400%",
            }}
          />

          {/* Moving orbs - adjusted for light background */}
          <motion.div
            className="absolute top-1/3 left-1/5 w-96 h-96 bg-primary/10 rounded-full blur-3xl mix-blend-multiply"
            animate={{
              x: [0, 200, 0],
              y: [0, 100, 0],
              scale: [1, 1.3, 1],
            }}
            transition={{
              duration: 30,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/5 w-80 h-80 bg-indigo-200/40 rounded-full blur-3xl mix-blend-multiply"
            animate={{
              x: [0, -150, 0],
              y: [0, -80, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Communication lines - softer and colored for light bg */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-px h-40 bg-gradient-to-b from-transparent via-primary/30 to-transparent"
                style={{
                  left: `${20 + i * 15}%`,
                  top: `${25 + i * 8}%`,
                  transform: `rotate(${30 + i * 20}deg)`,
                }}
                animate={{
                  opacity: [0.15, 0.6, 0.15],
                  scaleY: [1, 1.4, 1],
                }}
                transition={{
                  duration: 3 + i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.5,
                }}
              />
            ))}
          </div>
        </div>

        <motion.div
          ref={containerRef}
          className="relative z-10 px-6"
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Header */}
          <motion.div className="text-center mb-20" variants={fadeInUp}>
            <motion.div
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-color-100/50 border border-color-500 backdrop-blur-sm mb-10"
              whileHover={{ scale: 1.05, borderColor: "rgba(0,0,0,0.15)" }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              >
                <Sparkles className="h-4 w-4 text-color-600" />
              </motion.div>
              <span className="text-sm font-medium text-color-600">
                Let&apos;s plan your next class
              </span>
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            </motion.div>

            <motion.h2
              className="text-5xl font-light mb-8 tracking-tight text-foreground"
              variants={fadeInUp}
            >

              Get in

              <br />
              <motion.span
                className="bg-clip-text font-normal text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-rose-400"
                animate={{
                  backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                style={{
                  backgroundSize: "200% 200%",
                }}
              >
                Touch with BookYaar
              </motion.span>
            </motion.h2>

            <motion.p
              className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={fadeInUp}
            >
              Whether you&apos;re a parent looking for the right tutor, a student
              needing extra help, or a teacher who wants to join BookYaar, we&apos;re
              here to help you every step of the way.
            </motion.p>
          </motion.div>

          {/* Stats Bar */}
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20"
            variants={fadeInUp}
          >
            {companyStats.map((stat, index) => (
              <motion.div
                key={index}
                className="text-center p-6 bg-muted/40 backdrop-blur-xl rounded-2xl border border-border group hover:bg-muted/60 transition-all"
                whileHover={{ scale: 1.05, y: -5 }}
                variants={fadeInUp}
              >
                <motion.div
                  className="w-12 h-12 rounded-xl bg-gradient-to-br from-color-100/50 to-color-100 border border-border flex items-center justify-center mx-auto mb-3"
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.6 }}
                >
                  <stat.icon className="w-6 h-6 text-color-600" />
                </motion.div>
                <div className="text-2xl font-bold text-color-600 mb-1">
                  {stat.value}
                </div>
                <div className="text-muted-foreground/80 text-sm">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div className="space-y-8" variants={fadeInUp}>
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Tell us what you need
                </h3>
                <p className="text-lg text-muted-foreground">
                  Share your learning goals, class, board, and preferred timings.
                  Our team will match you with the best tutor for you or your child.
                </p>
              </div>

              <AnimatePresence mode="wait">
                {!isSubmitted ? (
                  <motion.form
                    key="form"
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="text"
                          placeholder="Your Name"
                          value={formData.name}
                          onChange={(e) =>
                            handleInputChange("name", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-4 bg-muted/40 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all ${errors.name ? "border-destructive" : "border-border"
                            }`}
                        />
                        {errors.name && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-destructive text-sm mt-2"
                          >
                            {errors.name}
                          </motion.p>
                        )}
                      </div>

                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={formData.email}
                          onChange={(e) =>
                            handleInputChange("email", e.target.value)
                          }
                          className={`w-full pl-10 pr-4 py-4 bg-muted/40 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all ${errors.email
                            ? "border-destructive"
                            : "border-border"
                            }`}
                        />
                        {errors.email && (
                          <motion.p
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="text-destructive text-sm mt-2"
                          >
                            {errors.email}
                          </motion.p>
                        )}
                      </div>
                    </div>

                    <div className="relative">
                      <Building className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                      <input
                        type="text"
                        placeholder="Student Class / Board (Optional)"
                        value={formData.company}
                        onChange={(e) =>
                          handleInputChange("company", e.target.value)
                        }
                        className="w-full pl-10 pr-4 py-4 bg-muted/40 border border-border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all"
                      />
                    </div>

                    <div className="relative">
                      <MessageSquare className="absolute left-3 top-4 h-5 w-5 text-muted-foreground" />
                      <textarea
                        placeholder="Tell us about the subject(s), class, preferred schedule, and whether you want online or home tuition..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className={`w-full pl-10 pr-4 py-4 bg-muted/40 border rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary transition-all resize-none ${errors.message
                          ? "border-destructive"
                          : "border-border"
                          }`}
                      />
                      {errors.message && (
                        <motion.p
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="text-destructive text-sm mt-2"
                        >
                          {errors.message}
                        </motion.p>
                      )}
                    </div>

                    <motion.button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full relative group overflow-hidden bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 text-white font-medium py-4 px-6 rounded-xl transition-all disabled:opacity-50"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent"
                        initial={{ x: "-100%" }}
                        whileHover={{ x: "100%" }}
                        transition={{ duration: 0.5 }}
                      />
                      <span className="relative flex items-center justify-center gap-2">
                        {isSubmitting ? (
                          <motion.div
                            className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              ease: "linear",
                            }}
                          />
                        ) : (
                          <>
                            <Send className="h-5 w-5" />
                            Send Enquiry
                            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </span>
                    </motion.button>
                  </motion.form>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      className="w-20 h-20 rounded-full bg-emerald-100 border border-emerald-300 flex items-center justify-center mx-auto mb-6"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    >
                      <CheckCircle className="w-10 h-10 text-emerald-500" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-foreground mb-4">
                      Enquiry Sent!
                    </h3>
                    <p className="text-lg text-muted-foreground mb-6">
                      Thank you for contacting BookYaar. Our team will reach out to
                      you shortly with the best tutor options and next steps.
                    </p>
                    <motion.button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({
                          name: "",
                          email: "",
                          company: "",
                          message: "",
                        });
                      }}
                      className="px-6 py-3 bg-muted/60 border border-border rounded-xl text-foreground hover:bg-muted transition-all"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Send Another Enquiry
                    </motion.button>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Contact Methods */}
            <motion.div className="space-y-8" variants={fadeInUp}>
              <div>
                <h3 className="text-3xl font-semibold text-foreground mb-4">
                  Prefer another way?
                </h3>
                <p className="text-lg text-muted-foreground">
                  Reach out using the option that works best for you. Our team is
                  always happy to help parents, students, and tutors.
                </p>
              </div>

              <div className="space-y-6">
                {contactMethods.map((method, index) => (
                  <motion.a
                    key={index}
                    href={method.link}
                    className="block p-6 bg-muted/40 backdrop-blur-xl rounded-2xl border border-border hover:bg-muted/60 transition-all group"
                    variants={fadeInUp}
                    whileHover={{ scale: 1.02, y: -2 }}
                  >
                    <div className="flex items-center gap-6">
                      <motion.div
                        className={`w-14 h-14 rounded-xl bg-gradient-to-br ${method.gradient} border border-border flex items-center justify-center`}
                        whileHover={{ scale: 1.1, rotateY: 180 }}
                        transition={{ duration: 0.6 }}
                      >
                        <method.icon className="w-7 h-7 text-primary" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-xl font-medium text-foreground mb-1">
                          {method.title}
                        </h4>
                        <p className="text-sm text-muted-foreground mb-2">
                          {method.description}
                        </p>
                        <p className="font-medium text-foreground">
                          {method.value}
                        </p>
                      </div>
                      <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-foreground group-hover:translate-x-1 transition-all" />
                    </div>
                  </motion.a>
                ))}
              </div>

              {/* Additional Info */}
              <motion.div
                className="p-6 bg-gradient-to-br from-primary/5 to-primary/10 backdrop-blur-xl rounded-2xl border border-primary/30"
                variants={fadeInUp}
              >
                <h4 className="text-lg font-semibold text-foreground mb-3">
                  Quick Match Promise
                </h4>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Once you share your requirements, our team will suggest suitable
                  BookYaar tutors typically within a few hours. We&apos;ll help you
                  schedule a trial class and fine-tune the plan until you&apos;re
                  completely satisfied.
                </p>
              </motion.div>
            </motion.div>
          </div>

          {/* Floating Elements */}
          {[...Array(8)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-primary/20 rounded-full"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [0, -40, 0],
                opacity: [0.2, 0.8, 0.2],
                scale: [1, 2, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.6,
              }}
            />
          ))}
        </motion.div>
      </section>
      <AppDownload />
    </>
  );
}
