"use client";

import { useState, useRef, useEffect } from "react";
import { motion } from "@/app/lib/client-utils";
import { ExternalLink, Github, Play } from "lucide-react";
import { cn } from "@/app/lib/utils";
import { Button, Card, SectionHeader, VideoPlayer } from "@/app/components";

const projects = [
  {
    title: "VotePlay",
    description:
      "Indian Voting System Simulator built with MERN Stack. Simulates EVM and VVPAT systems for new voters. Features include payment gateway integration, Cloudinary image storage, and Framer Motion animations.",
    videoUrl:
      "https://res.cloudinary.com/dq4rbg2eb/video/upload/q_auto,f_auto,c_fill,w_1280,br_2m/v1746295739/Portfolio/Project%20Demo%20Videos/voteplay-simulator.mp4",
    fallbackImageUrl:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1746296285/Portfolio/Project%20Fallback%20Images/VotePlay_Fallback.png",
    tech: [
      "React.js",
      "Node.js",
      "MongoDB",
      "Express.js",
      "Cloudinary",
      "Framer Motion",
    ],
    liveUrl: "https://voteplay.tech",
    githubUrl: "https://github.com/nishashetty1/voteplay-simulator",
    color: "accent-blue",
  },
  {
    title: "NSS Website",
    description:
      "Official website for VIT College NSS Unit featuring responsive components built with React.js.",
    videoUrl:
      "https://res.cloudinary.com/dq4rbg2eb/video/upload/v1746899014/Portfolio/Project%20Demo%20Videos/nss-vit.mp4",
    fallbackImageUrl:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1746296906/Portfolio/Project%20Fallback%20Images/Nss_Fallback.png",
    tech: ["React.js", "Tailwind CSS", "Node.js"],
    liveUrl: "https://nssvit.netlify.app/",
    githubUrl: "https://github.com/nishashetty1/nss-vit-website",
    color: "accent-rose",
  },
];

const getColorClass = (type: string, color: string): string => {
  type ColorTypes = "bgAlpha" | "text" | "bgDecorative";
  type AccentColors =
    | "accent-blue"
    | "accent-purple"
    | "accent-rose"
    | "accent-amber"
    | "accent-emerald";

  const colorMap: Record<ColorTypes, Record<AccentColors, string>> = {
    bgAlpha: {
      "accent-blue": "bg-accent-blue/10",
      "accent-purple": "bg-accent-purple/10",
      "accent-rose": "bg-accent-rose/10",
      "accent-amber": "bg-accent-amber/10",
      "accent-emerald": "bg-accent-emerald/10",
    },
    text: {
      "accent-blue": "text-accent-blue",
      "accent-purple": "text-accent-purple",
      "accent-rose": "text-accent-rose",
      "accent-amber": "text-accent-amber",
      "accent-emerald": "text-accent-emerald",
    },
    bgDecorative: {
      "accent-blue": "bg-accent-blue/20",
      "accent-purple": "bg-accent-purple/20",
      "accent-rose": "bg-accent-rose/20",
      "accent-amber": "bg-accent-amber/20",
      "accent-emerald": "bg-accent-emerald/20",
    },
  };

  return colorMap[type as ColorTypes]?.[color as AccentColors] || "";
};

const mapColorToButton = (
  color: string
): "blue" | "purple" | "rose" | "amber" | "emerald" => {
  type AccentColors =
    | "accent-blue"
    | "accent-purple"
    | "accent-rose"
    | "accent-amber"
    | "accent-emerald";
  type ButtonColor = "blue" | "purple" | "rose" | "amber" | "emerald";

  const colorMap: Record<AccentColors, ButtonColor> = {
    "accent-blue": "blue",
    "accent-purple": "purple",
    "accent-rose": "rose",
    "accent-amber": "amber",
    "accent-emerald": "emerald",
  };

  return (colorMap[color as AccentColors] || "blue") as ButtonColor;
};

export default function ProjectSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const currentRef = sectionRef.current;
    
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
  
    if (currentRef) {
      observer.observe(currentRef);
    }
  
    return () => {
      if (currentRef) observer.unobserve(currentRef);
    };
  }, []);

  return (
    <section
      id="projects"
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
          title="Featured Projects"
          description="Here are some of my notable projects that demonstrate my skills in full-stack development and my passion for creating impactful solutions."
          gradientFrom="purple"
          gradientTo="purple"
          isVisible={isVisible}
        />

        <div className="space-y-20 md:space-y-32">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 50 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
              className="relative"
            >
              <Card
                color={
                  mapColorToButton(project.color) as
                    | "blue"
                    | "purple"
                    | "rose"
                    | "amber"
                    | "emerald"
                }
                padding="lg"
                gradient
              >
                <div className="flex flex-col space-y-6 p-4 sm:p-6 lg:p-8">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="rounded-lg overflow-hidden"
                  >
                    <VideoPlayer
                      videoUrl={project.videoUrl}
                      fallbackImageUrl={project.fallbackImageUrl}
                      title={project.title}
                    />
                  </motion.div>

                  <div className="space-y-5 sm:space-y-6">
                    <div className="space-y-3 sm:space-y-4">
                      <h3 className="text-xl sm:text-2xl md:text-3xl font-bold">
                        {project.title}
                      </h3>
                      <p className="text-text-secondary text-sm sm:text-base leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <motion.span
                          key={tech}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.98 }}
                          className={cn(
                            "px-3 py-1.5 rounded-full text-xs sm:text-sm transition-colors duration-300",
                            getColorClass("bgAlpha", project.color),
                            getColorClass("text", project.color)
                          )}
                        >
                          {tech}
                        </motion.span>
                      ))}
                    </div>

                    <div className="flex flex-wrap gap-3 pt-2">
                      {project.liveUrl && (
                        <Button
                          href={project.liveUrl}
                          target="_blank"
                          color={
                            mapColorToButton(project.color) as
                              | "blue"
                              | "purple"
                              | "rose"
                              | "amber"
                              | "emerald"
                          }
                          icon={Play}
                        >
                          Live Demo
                        </Button>
                      )}
                      {project.githubUrl && (
                        <Button
                          href={project.githubUrl}
                          target="_blank"
                          variant="outline"
                          icon={Github}
                        >
                          Source Code
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </Card>

              <div
                className={cn(
                  "absolute -z-10 inset-0 blur-3xl opacity-20 rounded-full transition-opacity duration-300",
                  getColorClass("bgDecorative", project.color)
                )}
              />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center mt-16"
        >
          <motion.a
            href="https://github.com/nishashetty1"
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.02, y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-6 py-2 rounded-full text-text-secondary hover:text-white transition-all duration-300 text-sm sm:text-base shadow-sm"
          >
            <span>View More Projects on GitHub</span>
            <ExternalLink size={18} />
          </motion.a>
        </motion.div>
      </motion.div>
    </section>
  );
}
