/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Check } from "lucide-react"

export function FeatureSteps({
  features,
  className,
  title = "How to get Started",
  autoPlayInterval = 3000,
}) {
  const [currentFeature, setCurrentFeature] = useState(0)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      if (progress < 100) {
        setProgress((prev) => prev + 100 / (autoPlayInterval / 100))
      } else {
        setCurrentFeature((prev) => (prev + 1) % features.length)
        setProgress(0)
      }
    }, 100)

    return () => clearInterval(timer)
  }, [progress, features.length, autoPlayInterval])

  return (
    <div className={cn(className)}>
      <div className="w-full">

        <div className="flex flex-col gap-6 md:gap-18">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              className="flex items-start gap-6 md:gap-8"
              initial={{ opacity: 0.3 }}
              animate={{ opacity: index === currentFeature ? 1 : 0.3 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                className={cn(
                  "w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center border-2 mt-2",
                  index === currentFeature
                    ? "bg-primary border-primary text-primary-foreground scale-110"
                    : "bg-muted border-muted-foreground"
                )}
              >
                {index <= currentFeature ? (
                  <span className="text-base font-bold"><Check className="w-5 h-5"/></span>
                ) : (
                  <span className="text-base font-semibold">{index + 1}</span>
                )}
              </motion.div>

              <div className="flex-1">
                <h3 className="text-xl md:text-xl font-medium mb-1">
                  {feature.title || feature.step}
                </h3>
                <p className="text-sm md:text-base text-muted-foreground">
                  {feature.content}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
