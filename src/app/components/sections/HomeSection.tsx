"use client";

import { motion, AnimatePresence } from "@/app/lib/client-utils";
import { useEffect, useState, useRef } from "react";
import { ArrowDown, ChevronDown } from "lucide-react";
import { cn } from "@/app/lib/utils";
import Button from "@/app/components/ui/Button";

const roles = [
  "Full-stack Developer",
  "AIML Enthusiast",
  "Software Developer",
  "Problem Solver",
  "Cloud Enthusiast",
];

export default function HomeSection() {
  const [currentRole, setCurrentRole] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRole((prev) => (prev + 1) % roles.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setIsVisible(true);
    const currentRef = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center relative overflow-hidden px-4 sm:px-6 lg:px-16 py-8 sm:py-16 lg:py-24"
    >
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/15 via-transparent to-accent-purple/15" />

      {/* Content Container */}
      <div className="relative z-10 max-w-6xl mx-auto w-full">
        <div className="space-y-4 sm:space-y-6 lg:space-y-8 text-center lg:text-left">
          {/* Greeting */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center lg:justify-start gap-3"
          >
            <span className="h-px w-8 sm:w-12 bg-accent-blue/70"></span>
            <p className="text-accent-blue font-medium text-sm sm:text-base">
              Hi there, I&apos;m
            </p>
          </motion.div>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-text-primary"
          >
            Nisha Shetty
          </motion.h1>

          {/*Roles */}
          <div className="h-8 sm:h-10 md:h-12 lg:h-14 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentRole}
                initial={{ y: 40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -40, opacity: 0 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
              >
                <span
                  className={cn(
                    "block text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium",
                    currentRole === 0
                      ? "text-accent-blue"
                      : currentRole === 1
                      ? "text-accent-purple"
                      : currentRole === 2
                      ? "text-accent-emerald"
                      : currentRole === 3
                      ? "text-accent-amber"
                      : "text-accent-rose"
                  )}
                >
                  {roles[currentRole]}
                </span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.7 }}
            className="text-text-secondary text-sm sm:text-base lg:text-lg max-w-full lg:max-w-4xl leading-relaxed mx-auto lg:mx-0"
          >
            A detail-oriented B.Tech student specializing in full-stack
            development and Cloud, passionate about creating interactive and
            user-focused web applications that solve real-world problems.
          </motion.p>

          {/* Call-to-action button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="pt-4 sm:pt-6 flex justify-center lg:justify-start"
          >
            <Button
              href="#projects"
              color="emerald"
              size="md"
              className="group shadow-lg hover:shadow-accent-emerald/25 transition-all duration-300"
            >
              <div className="flex items-center justify-center">
                <span>View my Work</span>
                <ArrowDown
                  size={18}
                  className="ml-2 group-hover:translate-y-1 transition-transform duration-200"
                />
              </div>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={isVisible ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-text-secondary text-xs sm:text-sm">
          Scroll down
        </span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
        >
          <ChevronDown size={16} className="sm:w-5 sm:h-5 text-accent-blue" />
        </motion.div>
      </motion.div>

      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, 20, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
          }}
          className="absolute top-[10%] right-[5%] sm:right-[10%] w-32 h-32 sm:w-48 sm:h-48 lg:w-64 lg:h-64 bg-accent-purple/10 rounded-full blur-2xl sm:blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -10, 0],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
          }}
          className="absolute bottom-[20%] left-[5%] sm:left-[15%] w-28 h-28 sm:w-40 sm:h-40 lg:w-56 lg:h-56 bg-accent-blue/10 rounded-full blur-2xl sm:blur-3xl"
        />
        <motion.div
          animate={{
            scale: [0.9, 1.1, 0.9],
            x: [0, 15, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
          }}
          className="absolute top-[40%] left-[5%] w-24 h-24 sm:w-32 sm:h-32 lg:w-40 lg:h-40 bg-accent-emerald/10 rounded-full blur-2xl sm:blur-3xl"
        />
      </div>
    </section>
  );
}
