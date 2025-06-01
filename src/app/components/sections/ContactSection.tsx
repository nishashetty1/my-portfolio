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
  MapPin,
  Phone,
  AlertCircle,
} from "lucide-react";
import { db } from "@/app/lib/firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";

const currentYear = new Date().getFullYear();

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [buttonState, setButtonState] = useState<
    "idle" | "submitting" | "success" | "error"
  >("idle");
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

        setTimeout(() => setButtonState("idle"), 3000);
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
    <section
      id="contact"
      className="scroll-mt-16 py-12 px-4 bg-background-secondary md:hidden"
    >
      <div className="container mx-auto max-w-sm">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center"
        >
          <div className="flex flex-col items-center w-full mb-6">
            {/* Profile Image and Info */}
            <div className="relative w-28 h-28 mb-4 shadow-md rounded-2xl overflow-hidden">
              <Image
                src="/profile.jpg"
                alt="Nisha Shetty"
                fill
                sizes="112px"
                priority
                className="object-cover"
              />
            </div>

            <h2 className="text-2xl font-bold">Nisha Shetty</h2>
            <p className="text-text-secondary mb-4">Full-stack Developer</p>

            {/* Contact Info Cards */}
            <div className="grid grid-cols-1 gap-3 w-full mb-5">
              <a
                href="mailto:shettyn5482@gmail.com"
                className="flex items-center gap-3 p-3 bg-background-tertiary/60 rounded-lg hover:bg-background-tertiary transition-colors"
              >
                <div className="p-2 rounded-full bg-accent-blue/10">
                  <Mail size={16} className="text-accent-blue" />
                </div>
                <span className="text-sm">shettyn5482@gmail.com</span>
              </a>

              <a
                href="tel:+919876543210"
                className="flex items-center gap-3 p-3 bg-background-tertiary/60 rounded-lg hover:bg-background-tertiary transition-colors"
              >
                <div className="p-2 rounded-full bg-accent-purple/10">
                  <Phone size={16} className="text-accent-purple" />
                </div>
                <span className="text-sm">+91 93214 86963</span>
              </a>

              <div className="flex items-center gap-3 p-3 bg-background-tertiary/60 rounded-lg">
                <div className="p-2 rounded-full bg-accent-emerald/10">
                  <MapPin size={16} className="text-accent-emerald" />
                </div>
                <span className="text-sm">Mumbai, Maharashtra, India</span>
              </div>
            </div>

            {/* Social Links*/}
            <div className="flex gap-3 justify-center mb-5">
              <motion.a
                whileHover={{ y: -3 }}
                href="https://github.com/nishashetty1"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-background/80 border border-border hover:border-accent-blue text-text-secondary hover:text-accent-blue rounded-full shadow-sm transition-all duration-300"
                aria-label="GitHub Profile"
              >
                <Github size={18} />
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="https://www.linkedin.com/in/nishashetty2022/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 bg-background/80 border border-border hover:border-accent-blue text-text-secondary hover:text-accent-blue rounded-full shadow-sm transition-all duration-300"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={18} />
              </motion.a>

              <motion.a
                whileHover={{ y: -3 }}
                href="mailto:shettyn5482@gmail.com"
                className="p-2.5 bg-background/80 border border-border hover:border-accent-purple text-text-secondary hover:text-accent-purple rounded-full shadow-sm transition-all duration-300"
                aria-label="Email Me"
              >
                <Mail size={18} />
              </motion.a>
            </div>

            {/* Resume Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleDownloadResume}
              className="bg-accent-blue hover:bg-accent-blue/90 text-white px-6 py-2 rounded-full flex items-center gap-2 shadow-md hover:shadow-accent-blue/25 cursor-pointer mb-6"
            >
              <FileText size={16} />
              <span className="font-medium">Download Resume</span>
            </motion.button>
          </div>

          {/* Contact Form */}
          <div className="w-full mb-6">
            <div className="relative bg-background/30 border border-border backdrop-blur-sm rounded-lg p-5 shadow-md">
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
                    className="w-full px-3 py-2 text-sm rounded-lg bg-background/70 border border-border focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
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
                    className="w-full px-3 py-2 text-sm rounded-lg bg-background/70 border border-border focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30"
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
                    className="w-full px-3 py-2 text-sm rounded-lg bg-background/70 border border-border focus:outline-none focus:border-accent-blue focus:ring-1 focus:ring-accent-blue/30 resize-none"
                    aria-required="true"
                  />
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={buttonState === "idle" ? { scale: 1.02 } : {}}
                  whileTap={buttonState === "idle" ? { scale: 0.98 } : {}}
                  disabled={buttonState !== "idle"}
                  className={`relative overflow-hidden w-full px-6 py-2 rounded-full flex items-center gap-2 justify-center shadow-md transition-all duration-300 ${
                    buttonState === "success"
                      ? "bg-green-500 text-white"
                      : buttonState === "error"
                      ? "bg-red-500 text-white"
                      : buttonState === "submitting"
                      ? "bg-accent-amber text-white cursor-not-allowed"
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
                          <Send size={16} />
                          <span className="font-medium">Hire Me</span>
                        </>
                      )}
                      {buttonState === "submitting" && (
                        <>
                          <span className="inline-block h-4 w-4 rounded-full border-2 border-t-transparent border-white animate-spin mr-1"></span>
                          <span className="font-medium">Sending...</span>
                        </>
                      )}
                      {buttonState === "success" && (
                        <>
                          <Check size={16} className="animate-bounce" />
                          <span className="font-medium">
                            Sent Successfully!
                          </span>
                        </>
                      )}
                      {buttonState === "error" && (
                        <>
                          <AlertCircle size={16} className="animate-pulse" />
                          <span className="font-medium">Failed to Send</span>
                        </>
                      )}
                    </motion.div>
                  </AnimatePresence>
                </motion.button>
              </form>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-text-secondary text-xs mt-2">
            <p>© {currentYear} Nisha Shetty</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
