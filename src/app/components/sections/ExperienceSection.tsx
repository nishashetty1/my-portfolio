"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion } from "@/app/lib/client-utils";
import {
  Calendar,
  MapPin,
  Users,
  ChevronRight,
  Briefcase,
  Building,
  LucideIcon,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Badge, SectionHeader } from "@/app/components";

type AccentColor =
  | "accent-blue"
  | "accent-purple"
  | "accent-rose"
  | "accent-amber"
  | "accent-emerald";
type ColorType = "text" | "bg" | "bgAlpha" | "bgAlpha20" | "borderHover";
type BadgeColor = "blue" | "purple" | "rose" | "amber" | "emerald";

interface Experience {
  title: string;
  company: string;
  duration: string;
  location: string;
  description: string[];
  skills: string[];
  color: AccentColor;
  icon: LucideIcon;
  link?: string;
  linkLabel?: string;
}

const getColorClass = (type: ColorType, color: AccentColor): string => {
  const colorMap: Record<ColorType, Record<AccentColor, string>> = {
    text: {
      "accent-blue": "text-accent-blue",
      "accent-purple": "text-accent-purple",
      "accent-rose": "text-accent-rose",
      "accent-amber": "text-accent-amber",
      "accent-emerald": "text-accent-emerald",
    },
    bg: {
      "accent-blue": "bg-accent-blue",
      "accent-purple": "bg-accent-purple",
      "accent-rose": "bg-accent-rose",
      "accent-amber": "bg-accent-amber",
      "accent-emerald": "bg-accent-emerald",
    },
    bgAlpha: {
      "accent-blue": "bg-accent-blue/10",
      "accent-purple": "bg-accent-purple/10",
      "accent-rose": "bg-accent-rose/10",
      "accent-amber": "bg-accent-amber/10",
      "accent-emerald": "bg-accent-emerald/10",
    },
    bgAlpha20: {
      "accent-blue": "bg-accent-blue/20",
      "accent-purple": "bg-accent-purple/20",
      "accent-rose": "bg-accent-rose/20",
      "accent-amber": "bg-accent-amber/20",
      "accent-emerald": "bg-accent-emerald/20",
    },
    borderHover: {
      "accent-blue": "hover:border-accent-blue",
      "accent-purple": "hover:border-accent-purple",
      "accent-rose": "hover:border-accent-rose",
      "accent-amber": "hover:border-accent-amber",
      "accent-emerald": "hover:border-accent-emerald",
    },
  };

  return colorMap[type][color] || "";
};

const mapToBadgeColor = (accentColor: AccentColor): BadgeColor => {
  const colorMap: Record<AccentColor, BadgeColor> = {
    "accent-blue": "blue",
    "accent-purple": "purple",
    "accent-rose": "rose",
    "accent-amber": "amber",
    "accent-emerald": "emerald",
  };
  return colorMap[accentColor];
};

const experiences: Experience[] = [
  {
    title: "Full Stack Developer Intern",
    company: "Teraforge Digital Lab LLP",
    duration: "April 2025 - May 2025",
    location: "Remote",
    description: [
      "Built a car listing web application using React, integrating an AI-powered chatbot with contextual awareness and smart features",
      "Implemented Firebase for real-time database management and secure user authentication",
      "Worked on tools like WordPress and Hostinger to accelerate client website deployment and delivery",
      "Collaborated across teams to deliver scalable, user-friendly web solutions aligned with client needs",
    ],
    skills: [
      "WordPress",
      "Firebase",
      "React",
      "GenAI",
      "Teamwork",
      "Time Management",
    ],
    color: "accent-blue",
    icon: Briefcase,
    link: "https://drive.google.com/drive/folders/1yKNOO_7a1rszvXG7RpzV9Aq4UFu1Jeuj?usp=sharing",
    linkLabel: "Certificate",
  },
  {
    title: "System Setup Intern",
    company: "VIT, Mumbai",
    duration: "June 2024 - July 2024",
    location: "VIT, Mumbai",
    description: [
      "Collaborated with team members to set up laboratory systems",
      "Disassembled and reassembled PCs for improved functionality",
      "Crimped RJ45 cables and configured network setups",
      "Installed and configured Windows operating systems",
      "Integrated systems into the college domain for seamless operation",
      "Troubleshooted hardware and network-related issues",
    ],
    skills: [
      "Network Configuration",
      "Cable Crimping (RJ45)",
      "OS Installation",
      "Troubleshooting",
      "PC Hardware",
    ],
    color: "accent-purple",
    icon: Building,
    link: "https://drive.google.com/file/d/1d9FYg3a8u7hcAAbbEnzy_p0cawvXMtZe/view?usp=sharing",
    linkLabel: "Certificate",
  },
  {
    title: "Team Lead",
    company: "National Service Scheme (NSS)",
    duration: "2023 - 2024",
    location: "VIT, Mumbai",
    description: [
      "Led and coordinated various community service initiatives and events",
      "Managed team documentation and project planning",
      "Enhanced collaboration between team members and stakeholders",
      "Organized and executed successful community outreach programs",
    ],
    skills: [
      "Leadership",
      "Project Management",
      "Team Coordination",
      "Documentation",
    ],
    color: "accent-rose",
    icon: Users,
  },
];

export default function ExperienceSection() {
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

  const getCardPosition = useCallback(
    (index: number): string =>
      index % 2 === 0 ? "md:pr-[50%]" : "md:pl-[50%] md:ml-auto",
    []
  );

  const getCardMargin = useCallback(
    (index: number): string => (index % 2 === 0 ? "md:mr-12" : "md:ml-12"),
    []
  );

  return (
    <section
      id="experience"
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
          title="Experience"
          description="My journey in leadership and community service through various roles and responsibilities."
          gradientFrom="blue"
          gradientTo="blue"
          isVisible={isVisible}
        />

        <div className="relative mt-10">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-1/2 transform md:-translate-x-1/2 w-px h-full bg-border" />

          {/* Experience Cards */}
          <div className="space-y-12">
            {experiences.map((experience, index) => (
              <motion.div
                key={`${experience.title}-${index}`}
                initial={{ opacity: 0, y: 50 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                className={`relative ${getCardPosition(index)}`}
              >
                {/* Timeline dot */}
                <div
                  className={cn(
                    "absolute left-[-8px] md:left-1/2 top-0 w-4 h-4 rounded-full md:transform md:-translate-x-1/2 ring-4 ring-background-primary",
                    getColorClass("bg", experience.color)
                  )}
                />

                {/* Experience Card */}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  className={cn(
                    "ml-6 md:ml-0 p-6 rounded-xl bg-background-secondary/80 backdrop-blur-sm border border-border transition-all duration-300 relative group",
                    getCardMargin(index),
                    getColorClass("borderHover", experience.color)
                  )}
                >
                  {/* Card Header */}
                  <div className="space-y-2 mb-5">
                    <h3 className="text-xl md:text-2xl font-bold">
                      {experience.title}
                    </h3>
                    <p
                      className={cn(
                        "text-lg",
                        getColorClass("text", experience.color)
                      )}
                    >
                      {experience.company}
                    </p>

                    {/* Meta information */}
                    <div className="flex flex-wrap gap-4 text-text-secondary">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} />
                        <span>{experience.duration}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin size={16} />
                        <span>{experience.location}</span>
                      </div>
                    </div>
                  </div>

                  {experience.link && experience.link.trim() !== "" && (
                    <div className="mt-2">
                      <a
                        href={experience.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={cn(
                          "inline-flex items-center text-sm font-semibold underline hover:text-blue-600 transition-colors",
                          getColorClass("text", experience.color)
                        )}
                      >
                        {experience.linkLabel ?? "See Certificate"}
                      </a>
                    </div>
                  )}

                  {/* Description Points */}
                  <ul className="space-y-2 mb-6">
                    {experience.description.map((point, i) => (
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
                        <ChevronRight
                          size={16}
                          className={cn(
                            "mt-1 flex-shrink-0",
                            getColorClass("text", experience.color)
                          )}
                        />
                        <span>{point}</span>
                      </motion.li>
                    ))}
                  </ul>

                  {/* Skills Badges */}
                  <div className="flex flex-wrap gap-2">
                    {experience.skills.map((skill) => (
                      <Badge
                        key={skill}
                        color={mapToBadgeColor(experience.color)}
                        interactive
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>

                  {/* Background decorative gradient */}
                  <div
                    className={cn(
                      "absolute -z-10 inset-0 blur-3xl opacity-5 rounded-full group-hover:opacity-20 transition-opacity duration-500",
                      getColorClass("bgAlpha20", experience.color)
                    )}
                  />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
