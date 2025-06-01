"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "@/app/lib/client-utils";
import {
  Calendar,
  MapPin,
  GraduationCap,
  Award,
  ArrowUpRight,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Badge, SectionHeader } from "@/app/components";

interface EducationItem {
  degree: string;
  specialization?: string;
  institution: string;
  duration: string;
  location: string;
  cgpa?: string;
  percentage?: string;
  stream?: string;
  description: string[];
  achievements: string[];
  color: "blue" | "purple" | "rose" | "amber" | "emerald";
}

const education: EducationItem[] = [
  {
    degree: "B.Tech in Electronics and Computer Science Engineering",
    specialization: "Honours in Artificial Intelligence and Machine Learning",
    institution: "Vidyalankar Institute of Technology",
    duration: "2022 - 2026",
    location: "Mumbai, Maharashtra",
    cgpa: "9.89 CGPA",
    description: [
      "Active participant in technical events and workshops",
      "Actively participated in NSS activities and led the Documentation and Technical Team",
    ],
    achievements: [
      "Consistent academic performance",
      "Built various Projects",
      "Part of NSS and also led the Documentation and Technical Team",
    ],
    color: "blue",
  },
  {
    degree: "Higher Secondary Education (HSC)",
    institution: "SIES College of Arts, Science and Commerce",
    duration: "2020 - 2022",
    location: "Mumbai, Maharashtra",
    stream: "PCM with Computer Science",
    description: [
      "Completed HSC with Physics, Chemistry, Mathematics along with Computer Science as the vocational subject",
    ],
    achievements: ["Understood the basics of Computer Science and Programming"],
    color: "purple",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Holy Family High School",
    duration: "2008 - 2020",
    location: "Mumbai, Maharashtra",
    description: [
      "Completed SSC with distinction",
      "Active participation in extra-curricular activities",
      "Balanced academics with co-curricular activities",
      "Developed foundational skills in various subjects",
      "Participated in various inter-school competitions",
    ],
    achievements: [
      "Head girl for the tenure 2019 - 2020",
      "Perfect attendance record",
      "Sports captain",
    ],
    color: "rose",
  },
];

export default function EducationSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
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

  const getAccentColorClass = (type: string, color: string): string => {
    switch (type) {
      case "text":
        return `text-accent-${color}`;
      case "bg":
        return `bg-accent-${color}`;
      case "bgAlpha":
        return `bg-accent-${color}/10`;
      case "bgAlpha20":
        return `bg-accent-${color}/20`;
      case "borderHover":
        return `hover:border-accent-${color}`;
      default:
        return "";
    }
  };

  return (
    <section
      id="education"
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
          title="Education"
          description="My academic journey and achievements that have shaped my knowledge and skills."
          gradientFrom="amber"
          gradientTo="amber"
          isVisible={isVisible}
        />

        {/* Education Cards */}
        <div className="space-y-12 mt-10">
          {education.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              {/* Card */}
              <motion.div
                whileHover={{ scale: 1.01 }}
                className={cn(
                  "p-6 sm:p-8 rounded-xl bg-background-secondary/80 backdrop-blur-sm border border-border transition-all duration-300 relative group",
                  getAccentColorClass("borderHover", edu.color)
                )}
              >
                {/* Header */}
                <div className="space-y-4 mb-6">
                  <div
                    className={cn(
                      "inline-flex items-center px-3 py-1 rounded-full text-sm",
                      getAccentColorClass("bgAlpha", edu.color),
                      getAccentColorClass("text", edu.color)
                    )}
                  >
                    <Calendar className="mr-2" size={16} />
                    {edu.duration}
                  </div>

                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                    {edu.degree}
                  </h3>

                  {edu.specialization && (
                    <p
                      className={cn(
                        "font-semibold",
                        getAccentColorClass("text", edu.color)
                      )}
                    >
                      {edu.specialization}
                    </p>
                  )}

                  <p className="text-lg">{edu.institution}</p>

                  {/* Meta Information */}
                  <div className="flex flex-wrap gap-4 text-text-secondary">
                    <div className="flex items-center gap-2">
                      <MapPin size={16} />
                      <span>{edu.location}</span>
                    </div>
                    {(edu.cgpa || edu.percentage) && (
                      <div className="flex items-center gap-2">
                        <Award size={16} />
                        <span>{edu.cgpa || edu.percentage}</span>
                      </div>
                    )}
                    {edu.stream && (
                      <div className="flex items-center gap-2">
                        <GraduationCap size={16} />
                        <span>{edu.stream}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Two-column layout for larger screens */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Description */}
                  <div className="space-y-3">
                    <h4 className="font-semibold mb-2">Highlights</h4>
                    <ul className="space-y-2">
                      {edu.description.map((point, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          animate={isVisible ? { opacity: 1, x: 0 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + i * 0.1,
                          }}
                          className="flex items-start gap-2 text-text-secondary"
                        >
                          <ArrowUpRight
                            className={cn(
                              "mt-1 flex-shrink-0",
                              getAccentColorClass("text", edu.color)
                            )}
                            size={16}
                          />
                          <span>{point}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Achievements */}
                  <div>
                    <h4 className="font-semibold mb-2">Achievements</h4>
                    <div className="flex flex-wrap gap-2">
                      {edu.achievements.map((achievement, i) => (
                        <motion.div
                          key={achievement}
                          initial={{ opacity: 0, y: 10 }}
                          animate={isVisible ? { opacity: 1, y: 0 } : {}}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.2 + i * 0.1 + 0.2,
                          }}
                        >
                          <Badge
                            color={edu.color}
                            interactive
                            className="text-sm"
                          >
                            {achievement}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Background decorative gradient */}
                <div
                  className={cn(
                    "absolute -z-10 inset-0 blur-3xl opacity-5 group-hover:opacity-10 rounded-full transition-opacity duration-500",
                    getAccentColorClass("bgAlpha20", edu.color)
                  )}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
