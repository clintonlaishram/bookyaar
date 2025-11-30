"use client"

import React, { useEffect, useState } from "react"
import AppDownload from "@/components/home/AppDownload"
import Faqs from "@/components/home/Faqs"
import RegistrationForm from "@/components/tutor-registration/RegistrationForm"
import RegistrationHero from "@/components/tutor-registration/RegistrationHero"
import TutorLogin from "@/components/tutor-registration/TutorLogin"

function TeacherRegister() {

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // or "auto" if you don't want animation
    });
  }, []);

  // Initialize from localStorage once (lazy initializer)
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    if (typeof window === "undefined") return false
    const token = localStorage.getItem("token")
    const uid = localStorage.getItem("uid")
    return !!token && !!uid
  })

  // Called from TutorLogin after successful sign up / login
  const handleAuthSuccess = () => {
    if (typeof window === "undefined") return
    const token = localStorage.getItem("token")
    const uid = localStorage.getItem("uid")

    if (token && uid) {
      setIsAuthenticated(true)
    }
  }

  // Called from RegistrationForm after "Register a new profile"
  const handleNewProfile = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("token")
      localStorage.removeItem("uid")
    }

    // User should see TutorLogin again
    setIsAuthenticated(false)
  }

  return (
    <div className="max-width manrope space-y-30">
      <div>
        <RegistrationHero />

        {/* If not authenticated -> show login/signup, else show registration/thank-you logic */}
        {!isAuthenticated ? (
          <TutorLogin onAuthSuccess={handleAuthSuccess} />
        ) : (
          <RegistrationForm onNewProfile={handleNewProfile} />
        )}
      </div>

      <Faqs />
      <AppDownload />
    </div>
  )
}

export default TeacherRegister
