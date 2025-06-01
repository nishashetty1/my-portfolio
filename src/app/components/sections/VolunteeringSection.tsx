"use client";

import { motion, AnimatePresence } from "@/app/lib/client-utils";
import {
  Heart,
  Calendar,
  X,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { SectionHeader, Button } from "@/app/components";
import { cn } from "@/app/lib/utils";

type AccentColor =
  | "accent-blue"
  | "accent-purple"
  | "accent-rose"
  | "accent-amber"
  | "accent-emerald";

interface VolunteerActivity {
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  color: AccentColor;
}

const volunteerActivities: VolunteerActivity[] = [
  {
    title: "Tree Plantation Drive",
    organization: "National Service Scheme (NSS)",
    date: "February 2024",
    description:
      "We created sensory boards for children with special needs, enhancing their sensory experiences and learning.",
    image:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1746911538/Portfolio/Certificates/Volunteering/Sensory_Board_Making.jpg",
    color: "accent-emerald",
  },
  {
    title: "Paint a School",
    organization: "National Service Scheme (NSS)",
    date: "November 2023",
    description:
      "Led a team to paint and renovate a local school, creating a more vibrant learning environment for students.",
    image:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747573833/Portfolio/Certificates/Volunteering/Artshala_Paint_a_School_Wadala.jpg",
    color: "accent-rose",
  },
  {
    title: "Carter Beach Cleanup",
    organization: "National Service Scheme (NSS)",
    date: "October 2023",
    description:
      "Participated in a beach cleanup drive at Carter Road, promoting environmental awareness and cleanliness.",
    image:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747573832/Portfolio/Certificates/Volunteering/Carter_Cleanup.jpg",
    color: "accent-blue",
  },
  {
    title: "PCGT Training",
    organization: "National Service Scheme (NSS)",
    date: "August 2023",
    description:
      "Attended the Public Concern for Governance Trust training program.",
    image:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747573833/Portfolio/Certificates/Volunteering/PCGT.jpg",
    color: "accent-amber",
  },
];

const getColorClass = (type: string, color: AccentColor): string => {
  switch (type) {
    case "bgAlpha10":
      return `bg-${color}/10`;
    case "text":
      return `text-${color}`;
    case "bg":
      return `bg-${color}`;
    default:
      return "";
  }
};

export default function VolunteeringSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const [direction, setDirection] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1, rootMargin: "0px" }
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

  useEffect(() => {
    if (isFocused || showFullImage) return;

    const interval = setInterval(() => {
      setDirection(1); // right
      setActiveIndex((current) =>
        current === volunteerActivities.length - 1 ? 0 : current + 1
      );
    }, 3500);
    return () => clearInterval(interval);
  }, [isFocused, showFullImage]);

  const nextSlide = useCallback(() => {
    setDirection(1);
    setActiveIndex((current) =>
      current === volunteerActivities.length - 1 ? 0 : current + 1
    );
  }, []);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setActiveIndex((current) =>
      current === 0 ? volunteerActivities.length - 1 : current - 1
    );
  }, []);

  return (
    <section
      id="volunteering"
      ref={sectionRef}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        <SectionHeader
          title="Volunteering"
          description="Making a positive impact through community service and social initiatives."
          gradientFrom="rose"
          gradientTo="rose"
          isVisible={isVisible}
        />

        {/* Volunteering Carousel */}
        <div
          ref={carouselRef}
          className="relative mb-16"
          onMouseEnter={() => setIsFocused(true)}
          onMouseLeave={() => setIsFocused(false)}
          onTouchStart={() => setIsFocused(true)}
        >
          <div className="overflow-hidden rounded-2xl border border-border bg-background-secondary/80 backdrop-blur-sm shadow-lg">
            <div className="relative h-[420px] sm:h-[460px] md:h-[420px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={activeIndex}
                  initial={{
                    x: direction * 100,
                    opacity: 0,
                  }}
                  animate={{
                    x: 0,
                    opacity: 1,
                  }}
                  exit={{
                    x: direction * -100,
                    opacity: 0,
                  }}
                  transition={{
                    duration: 0.4,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-0 flex flex-col md:flex-row"
                >
                  {/* Volunteer Activity Image with click-to-zoom */}
                  <div
                    className="w-full md:w-1/2 h-48 sm:h-60 md:h-full relative overflow-hidden cursor-pointer group"
                    onClick={() => setShowFullImage(true)}
                  >
                    <Image
                      src={volunteerActivities[activeIndex].image}
                      alt={volunteerActivities[activeIndex].title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background-primary/90 via-background-primary/30 to-transparent" />

                    {/* Zoom icon indicator */}
                    <div className="absolute top-4 right-4 p-2 rounded-full bg-background-primary/50 backdrop-blur-sm group-hover:bg-background-primary/70 transition-all duration-300">
                      <ZoomIn size={18} className="text-white" />
                    </div>

                    {/* Title overlay on image (mobile only) */}
                    <div className="absolute bottom-4 left-4 right-4 md:hidden">
                      <h3 className="text-xl sm:text-2xl font-bold mb-1 text-white">
                        {volunteerActivities[activeIndex].title}
                      </h3>
                      <p className="text-text-secondary text-sm sm:text-base">
                        {volunteerActivities[activeIndex].organization}
                      </p>
                    </div>
                  </div>

                  {/* Volunteer Activity Information */}
                  <div className="w-full md:w-1/2 h-auto md:h-full p-5 sm:p-6 md:p-8 flex flex-col justify-between">
                    <div>
                      {/* Title (desktop only) */}
                      <div className="hidden md:block mb-6">
                        <h3 className="text-2xl font-bold mb-1">
                          {volunteerActivities[activeIndex].title}
                        </h3>
                        <p className="text-text-secondary">
                          {volunteerActivities[activeIndex].organization}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="flex flex-col gap-4 mt-2 md:mt-0">
                        <div className="flex items-center gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg",
                              getColorClass(
                                "bgAlpha10",
                                volunteerActivities[activeIndex].color
                              )
                            )}
                          >
                            <Calendar
                              size={18}
                              className={cn(
                                getColorClass(
                                  "text",
                                  volunteerActivities[activeIndex].color
                                )
                              )}
                            />
                          </div>
                          <span className="text-sm sm:text-base">
                            {volunteerActivities[activeIndex].date}
                          </span>
                        </div>

                        <div className="flex items-start gap-3">
                          <div
                            className={cn(
                              "p-2 rounded-lg flex-shrink-0",
                              getColorClass(
                                "bgAlpha10",
                                volunteerActivities[activeIndex].color
                              )
                            )}
                          >
                            <Heart
                              size={18}
                              className={cn(
                                getColorClass(
                                  "text",
                                  volunteerActivities[activeIndex].color
                                )
                              )}
                            />
                          </div>
                          <p className="text-text-secondary text-sm sm:text-base">
                            {volunteerActivities[activeIndex].description}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Controls and navigation */}
                    <div className="flex items-center justify-between mt-6 sm:mt-8">
                      <span className="text-sm text-text-secondary">
                        {activeIndex + 1}/{volunteerActivities.length}
                      </span>

                      <div className="flex gap-3">
                        <Button
                          onClick={prevSlide}
                          variant="ghost"
                          color="default"
                          size="sm"
                          icon={ChevronLeft}
                          className="rounded-full p-2 bg-background-secondary/80 backdrop-blur-sm"
                          ariaLabel="Previous slide"
                        />
                        <Button
                          onClick={nextSlide}
                          variant="ghost"
                          color="default"
                          size="sm"
                          icon={ChevronRight}
                          className="rounded-full p-2 bg-background-secondary/80 backdrop-blur-sm"
                          ariaLabel="Next slide"
                        />
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* Indicator dots */}
          <div className="flex justify-center mt-4 gap-2 overflow-x-auto pb-2">
            {volunteerActivities.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > activeIndex ? 1 : -1);
                  setActiveIndex(index);
                }}
                className={cn(
                  "w-2 h-2 rounded-full transition-all duration-300",
                  activeIndex === index
                    ? cn(
                        "w-6",
                        getColorClass(
                          "bg",
                          volunteerActivities[activeIndex].color
                        )
                      )
                    : "bg-border"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Full Image Modal */}
      <AnimatePresence>
        {showFullImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center bg-background-primary/95 backdrop-blur-md p-4"
            onClick={() => setShowFullImage(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl max-h-[85vh] sm:max-h-[90vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full">
                <Image
                  src={volunteerActivities[activeIndex].image}
                  alt={volunteerActivities[activeIndex].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 95vw, 90vw"
                  priority
                />
              </div>

              {/* Close button using Button component */}
              <Button
                onClick={() => setShowFullImage(false)}
                variant="ghost"
                color="default"
                size="sm"
                icon={X}
                className="absolute top-4 right-4 bg-background-secondary/70 backdrop-blur-sm"
                ariaLabel="Close full image view"
              />

              {/* Navigation arrows for modal */}
              <div className="absolute top-1/2 -translate-y-1/2 w-full flex justify-between px-4 pointer-events-none">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    prevSlide();
                  }}
                  variant="ghost"
                  color="default"
                  size="sm"
                  icon={ChevronLeft}
                  className="pointer-events-auto bg-background-secondary/70 backdrop-blur-sm rounded-full"
                  ariaLabel="Previous image"
                />

                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    nextSlide();
                  }}
                  variant="ghost"
                  color="default"
                  size="sm"
                  icon={ChevronRight}
                  className="pointer-events-auto bg-background-secondary/70 backdrop-blur-sm rounded-full"
                  ariaLabel="Next image"
                />
              </div>

              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-xl w-full px-4">
                <div className="bg-background-secondary/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-md">
                  <h3 className="text-lg font-bold">
                    {volunteerActivities[activeIndex].title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {volunteerActivities[activeIndex].organization} •{" "}
                    {volunteerActivities[activeIndex].date}
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
