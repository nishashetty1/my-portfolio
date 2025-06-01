"use client";

import { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "@/app/lib/client-utils";
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Send,
  Check,
  AlertCircle,
} from "lucide-react";
import { db } from "@/app/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { Button } from "@/app/components";

const currentYear = new Date().getFullYear();

type FormData = {
  name: string;
  email: string;
  message: string;
};

type ButtonState = "idle" | "submitting" | "success" | "error";

export default function ProfileCard() {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });

  const [buttonState, setButtonState] = useState<ButtonState>("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setButtonState("submitting");

      try {
        await addDoc(collection(db, "contacts"), {
          ...formData,
          timestamp: serverTimestamp(),
        });

        setButtonState("success");
        formRef.current?.reset();
        setFormData({ name: "", email: "", message: "" });

        setTimeout(() => setButtonState("idle"), 5000);
      } catch (error) {
        console.error("Error submitting form:", error);
        setButtonState("error");
        setTimeout(() => setButtonState("idle"), 3000);
      }
    },
    [formData]
  );

  const handleDownloadResume = useCallback(() => {
    const link = document.createElement("a");
    link.href = "/Nisha_Shetty_Resume.pdf";
    link.download = "Nisha_Shetty_Resume.pdf";
    link.rel = "noopener noreferrer";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="hidden md:block fixed left-[80px] top-0 w-[calc(35vw-80px)] max-w-[350px] h-screen bg-background-secondary border-r border-border pt-8 px-4 overflow-y-auto z-[70]"
    >
      <div className="h-full flex flex-col items-center justify-between gap-3 pb-5">
        {/* Profile Image */}
        <div className="relative w-32 h-32">
          <Image
            src="/profile.jpg"
            alt="Nisha Shetty"
            fill
            sizes="128px"
            priority
            className="rounded-2xl object-cover"
          />
        </div>

        {/* Profile Info */}
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-1">Nisha Shetty</h1>
          <p className="text-text-secondary mb-3">Full-stack Developer</p>

          {/* Social Links */}
          <div className="flex gap-4 justify-center mb-4">
            <a
              href="https://github.com/nishashetty1"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-blue transition-colors p-2 hover:bg-background-tertiary/50 rounded-full"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a
              href="https://www.linkedin.com/in/nishashetty2022/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-accent-blue transition-colors p-2 hover:bg-background-tertiary/50 rounded-full"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a
              href="mailto:shettyn5482@gmail.com"
              className="hover:text-accent-blue transition-colors p-2 hover:bg-background-tertiary/50 rounded-full"
              aria-label="Email Me"
            >
              <Mail size={20} />
            </a>
          </div>

          {/* Resume Button */}
          <Button
            onClick={handleDownloadResume}
            variant="filled"
            color="blue"
            fullWidth
            icon={FileText}
            className="group shadow-lg hover:shadow-accent-blue/25 transition-all duration-300"
          >
            Download Resume
          </Button>
        </div>

        {/* Contact Form */}
        <div className="w-full">
          <h2 className="text-lg font-semibold mb-3 text-center">Contact Me</h2>

          <form
            ref={formRef}
            onSubmit={handleSubmit}
            className="flex flex-col gap-3"
          >
            <div>
              <label htmlFor="name" className="sr-only">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-accent-blue"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">
                Your Email
              </label>
              <input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-accent-blue"
                aria-required="true"
              />
            </div>

            <div>
              <label htmlFor="message" className="sr-only">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                required
                rows={3}
                className="w-full px-3 py-2 text-sm rounded-lg bg-background border border-border focus:outline-none focus:ring-1 focus:ring-accent-blue resize-none"
                aria-required="true"
              />
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={buttonState === "idle" ? { scale: 1.02 } : {}}
              whileTap={buttonState === "idle" ? { scale: 0.98 } : {}}
              disabled={buttonState !== "idle"}
              className={`w-full justify-center
                px-6 py-1.5 rounded-full flex items-center gap-2 mx-auto shadow-md hover:shadow-accent-blue/25 cursor-pointer mb-4
                 transition-all duration-300 ${
                   buttonState === "success"
                     ? "bg-green-500 text-white"
                     : buttonState === "error"
                     ? "bg-red-500 text-white"
                     : buttonState === "submitting"
                     ? "bg-yellow-500 text-white cursor-not-allowed"
                     : "bg-accent-purple hover:bg-accent-purple/90 text-white hover:shadow-lg hover:shadow-accent-purple/20"
                 }`}
              type="submit"
              aria-live="polite"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={buttonState}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2 }}
                  className="flex items-center gap-2"
                >
                  {buttonState === "idle" && (
                    <>
                      <Send size={18} />
                      <span className="font-medium">Hire Me</span>
                    </>
                  )}
                  {buttonState === "submitting" && (
                    <>
                      <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin"></span>
                      <span className="font-medium">Sending...</span>
                    </>
                  )}
                  {buttonState === "success" && (
                    <>
                      <Check size={18} className="animate-bounce" />
                      <span className="font-medium">Sent Successfully!</span>
                    </>
                  )}
                  {buttonState === "error" && (
                    <>
                      <AlertCircle size={18} className="animate-pulse" />
                      <span className="font-medium">Failed to Send</span>
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </motion.button>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-text-secondary text-xs mt-4">
          <p>© {currentYear} Nisha Shetty</p>
        </div>
      </div>
    </motion.div>
  );
}
