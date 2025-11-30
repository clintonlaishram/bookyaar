"use client"

/* eslint-disable no-unused-vars */

import React, { useState, useEffect } from "react"
import { FeatureSteps } from "../ui/feature-section"
import { motion, AnimatePresence } from "framer-motion"
import { Mail, Lock } from "lucide-react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import { Checkbox } from "../ui/checkbox"
import { API_BASE_URL } from "@/lib/constant"

function TutorLogin({ onAuthSuccess }) {
  const [isSignIn, setIsSignIn] = useState(false) // default: Sign Up
  const [loading, setLoading] = useState(false)

  const features = [
    {
      step: "Step 1",
      title: "Create an Account",
      content: "Begin your tutor journey by signing up with your email or phone number.",
    },
    {
      step: "Step 2",
      title: "Fill Basic Details",
      content: "Enter your personal information so we can set up your profile.",
    },
    {
      step: "Step 3",
      title: "Add Tutor Profile",
      content: "Provide your teaching subjects, experience, and qualifications to complete your profile.",
    },
    {
      step: "Step 4",
      title: "Complete KYC",
      content: "Verify your identity to get approved and start teaching on the platform.",
    },
  ]

  const formVariants = {
    initial: { opacity: 0, y: 15, scale: 0.98 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -15, scale: 0.98 },
  }

  // Helper: safely extract human-readable message from FastAPI error
  const getErrorMessage = (data) => {
    if (!data) return "Something went wrong. Please try again."

    const detail = data.detail

    if (!detail) return "Something went wrong. Please try again."

    // detail is a string
    if (typeof detail === "string") return detail

    // detail is an array (FastAPI validation error style)
    if (Array.isArray(detail)) {
      const first = detail[0]
      if (first && typeof first.msg === "string") return first.msg

      const msgs = detail
        .map((d) => (d && typeof d.msg === "string" ? d.msg : null))
        .filter(Boolean)

      if (msgs.length > 0) return msgs.join(", ")
    }

    // detail is an object with msg
    if (typeof detail === "object" && typeof detail.msg === "string") {
      return detail.msg
    }

    return "Something went wrong. Please try again."
  }

  // 🔐 GOOGLE AUTH HANDLER
  const handleGoogleAuth = () => {
    // This matches your FastAPI /auth/google/login?role=...
    const url = `${API_BASE_URL}/auth/google/login?role=tutor`
    window.location.href = url // Full redirect – exactly what your backend expects
  }

  // 🧲 ON MOUNT: capture token & auth_id from URL (Google redirect)
  useEffect(() => {
    try {
      const params = new URLSearchParams(window.location.search)
      const urlToken = params.get("token")
      const urlAuthId = params.get("tutor_id")

      if (urlToken && urlAuthId) {
        // Save token
        localStorage.setItem("token", urlToken)

        // Save Base64-encoded auth_id as uid
        const base64Uid = btoa(String(urlAuthId))
        localStorage.setItem("uid", base64Uid)

        // Notify parent that auth is now valid
        if (typeof onAuthSuccess === "function") {
          onAuthSuccess()
        }

        // (Optional) Clean up URL params after storing
        // const url = new URL(window.location.href)
        // url.search = ""
        // window.history.replaceState({}, "", url.toString())
      }
    } catch (err) {
      console.error("Error parsing Google auth params:", err)
    }
  }, [onAuthSuccess])

  const handleSubmit = async (e) => {
    e.preventDefault()

    const form = e.currentTarget

    // 🔓 SIGN IN FLOW
    if (isSignIn) {
      const email = form.email?.value.trim()
      const password = form.password?.value.trim()

      if (!email || !password) {
        toast.error("Please enter email and password.")
        return
      }

      try {
        setLoading(true)

        const res = await fetch(`${API_BASE_URL}/auth/login`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify({
            email,
            password,
          }),
        })

        const data = await res.json()

        if (!res.ok) {
          const message = getErrorMessage(data)
          toast.error(message)
          return
        }

        // ✅ Save token from AuthResponse
        if (data.access_token) {
          localStorage.setItem("token", data.access_token)
        }

        // ✅ Save Base64 encoded auth_id as uid
        if (data.auth_id != null) {
          const base64Uid = btoa(String(data.auth_id))
          localStorage.setItem("uid", base64Uid)
        }

        // (Optional) keep role info
        if (data.login_type) {
          localStorage.setItem("role", data.login_type)
        }
        if (data.tutor_id != null) {
          localStorage.setItem("role_id", String(data.tutor_id))
        }

        toast.success("Logged in successfully!")

        // Notify parent to re-check auth
        if (typeof onAuthSuccess === "function") {
          onAuthSuccess()
        }
      } catch (err) {
        console.error("Error:", err)
        toast.error("Something went wrong. Please try again.")
      } finally {
        setLoading(false)
      }

      return
    }

    // 📝 SIGN UP FLOW
    const firstName = form.firstname?.value.trim()
    const lastName = form.lastname?.value.trim()
    const email = form.email?.value.trim()
    const password = form.password?.value.trim()
    const confirmPassword = form.confirmPassword?.value.trim()

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      toast.error("Please fill all fields.")
      return
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.")
      return
    }

    try {
      setLoading(true)

      const res = await fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          first_name: firstName,
          last_name: lastName,
          email: email,
          password: password,
          login_type: "tutor",
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        const message = getErrorMessage(data)
        toast.error(message)
        return
      }

      // ✅ Save token from AuthResponse
      if (data.access_token) {
        localStorage.setItem("token", data.access_token)
      }

      // ✅ Save Base64 encoded auth_id as uid
      if (data.auth_id != null) {
        const base64Uid = btoa(String(data.auth_id))
        localStorage.setItem("uid", base64Uid)
      }

      // (Optional) keep role info
      if (data.login_type) {
        localStorage.setItem("role", data.login_type)
      }
      if (data.tutor_id != null) {
        localStorage.setItem("role_id", String(data.tutor_id))
      }

      toast.success("Account created successfully!")

      // Notify parent to re-check auth
      if (typeof onAuthSuccess === "function") {
        onAuthSuccess()
      }
    } catch (err) {
      console.error("Error:", err)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="px-20 space-y-20">
      <motion.h5
        className="text-4xl font-medium mb-2 text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Tutor Registration
      </motion.h5>

      <motion.p
        className="text-lg text-muted-foreground text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        Create an account and start your journey to becoming a tutor today!
      </motion.p>

      <div className="w-full flex flex-row items-start justify-center gap-16">
        {/* Left - Steps */}
        <div className="w-1/2">
          <FeatureSteps
            features={features}
            autoPlayInterval={4000}
            className={"max-w-2xl ml-auto"}
          />
        </div>

        {/* Right - Auth Card */}
        <div className="w-1/2">
          <motion.div
            className="px-8 py-10 w-full max-w-lg mx-auto flex flex-col items-center justify-center border rounded-xl shadow-lg shadow-color-200/50 bg-background"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <form
              onSubmit={handleSubmit}
              className="w-full flex flex-col items-center justify-center"
            >
              <motion.h2
                key={isSignIn ? "title-signin" : "title-signup"}
                className="text-4xl text-foreground font-medium"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
              >
                {isSignIn ? "Sign in" : "Sign up"}
              </motion.h2>

              <motion.p
                key={isSignIn ? "subtitle-signin" : "subtitle-signup"}
                className="text-sm text-muted-foreground mt-3"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25, delay: 0.05 }}
              >
                {isSignIn
                  ? "Welcome back! Please sign in to continue"
                  : "Create your tutor account to get started"}
              </motion.p>

              {/* GOOGLE BUTTON */}
              <motion.button
                type="button"
                onClick={handleGoogleAuth}
                className="w-full mt-8 bg-color-50 flex items-center justify-center h-12 rounded-full"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: "spring", stiffness: 260, damping: 18 }}
              >
                <img
                  src="./google.png"
                  alt="googleLogo"
                  className="mr-2 w-6"
                />
                <span className="text-sm font-medium text-muted-foreground">
                  Continue with Google
                </span>
              </motion.button>

              <div className="flex items-center gap-4 w-full my-5">
                <div className="w-full h-px bg-muted-foreground/50" />
                <p className="w-full text-nowrap text-sm text-muted-foreground">
                  or {isSignIn ? "sign in" : "sign up"} with email
                </p>
                <div className="w-full h-px bg-muted-foreground/50" />
              </div>

              {/* Animated form fields */}
              <AnimatePresence mode="wait">
                {isSignIn ? (
                  <motion.div
                    key="signin-form"
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                  >
                    <div className="flex items-center w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <Mail className="text-[#6B7280] w-4 h-4" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email id"
                        className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                        required
                      />
                    </div>

                    <div className="flex items-center mt-6 w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <Lock className="text-[#6B7280] w-4 h-4" />
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                        required
                      />
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="signup-form"
                    variants={formVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="w-full"
                  >
                    <div className="flex gap-3 w-full">
                      <div className="flex items-center w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden px-6 gap-2">
                        <input
                          name="firstname"
                          type="text"
                          placeholder="First name"
                          className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                          required
                        />
                      </div>
                      <div className="flex items-center w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden px-6 gap-2">
                        <input
                          name="lastname"
                          type="text"
                          placeholder="Last name"
                          className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                          required
                        />
                      </div>
                    </div>

                    <div className="flex items-center mt-4 w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <Mail className="text-[#6B7280] w-4 h-4" />
                      <input
                        name="email"
                        type="email"
                        placeholder="Email id"
                        className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                        required
                      />
                    </div>

                    <div className="flex items-center mt-4 w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <Lock className="text-[#6B7280] w-4 h-4" />
                      <input
                        name="password"
                        type="password"
                        placeholder="Password"
                        className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                        required
                      />
                    </div>

                    <div className="flex items-center mt-4 w-full bg-transparent border border-color-100 h-12 rounded-full overflow-hidden pl-6 gap-2">
                      <Lock className="text-[#6B7280] w-4 h-4" />
                      <input
                        name="confirmPassword"
                        type="password"
                        placeholder="Re-enter password"
                        className="bg-transparent text-foreground placeholder-gray-500/80 outline-none text-sm w-full h-full"
                        required
                      />
                    </div>

                    <p className="text-xs text-muted-foreground px-2 mt-2">
                      Password should be at least 8 characters long and include a mix of uppercase letters and numbers.
                    </p>

                    <div className="px-1 mt-6">
                      <Checkbox id="terms" required />
                      <label htmlFor="terms" className="text-sm text-muted-foreground ml-2">
                        I agree to the{" "}
                        <a href="#" className="text-color-600 hover:underline">
                          Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="text-color-600 hover:underline">
                          Privacy Policy
                        </a>
                        .
                      </label>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <Button
                type="submit"
                className="w-full mt-6 rounded-full h-12"
                disabled={loading}
              >
                {loading
                  ? isSignIn
                    ? "Signing in..."
                    : "Signing up..."
                  : isSignIn
                  ? "Sign In"
                  : "Sign Up"}
              </Button>

              <p className="text-gray-500/90 text-sm mt-4">
                {isSignIn ? (
                  <>
                    Don’t have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignIn(false)}
                      className="text-color-600 hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => setIsSignIn(true)}
                      className="text-color-600 hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default TutorLogin
