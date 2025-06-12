"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "@/app/lib/client-utils";
import { Code2, Brain, Users, Database, Globe, LucideIcon } from "lucide-react";
import { SectionHeader, Badge, Card} from "@/app/components";

type SkillCategory = {
  category: string;
  icon: LucideIcon;
  color: "blue" | "purple" | "rose" | "amber" | "emerald";
  items: string[];
};

type Language = {
  name: string;
  level: string;
  color: "blue" | "purple" | "rose" | "amber" | "emerald";
};

const skills: SkillCategory[] = [
  {
    category: "Frontend Development",
    icon: Code2,
    color: "blue",
    items: [
      "HTML",
      "CSS",
      "JavaScript",
      "React.js",
      "Tailwind CSS",
      "Zustand",
      "Framer Motion",
    ],
  },
  {
    category: "Backend & Full-Stack",
    icon: Database,
    color: "purple",
    items: [
      "MERN Stack",
      "Next.js",
      "MongoDB",
      "Express.js",
      "Node.js",
      "Firebase",
      "Appwrite",
      "WordPress",
      "CMS tools"
    ],
  },
  {
    category: "AI/ML",
    icon: Brain,
    color: "emerald",
    items: ["Prompt Engineering", "GenAI tools", "Python", "TensorFlow"],
  },
  {
    category: "Soft Skills",
    icon: Users,
    color: "amber",
    items: ["Quick Learner", "Problem-solving", "Time Management", "Teamwork"],
  },
];

const languages: Language[] = [
  { name: "English", level: "Proficient", color: "blue" },
  { name: "Hindi", level: "Bilingual", color: "purple" },
  { name: "Kannada", level: "Native", color: "amber" },
  { name: "Tulu", level: "Native", color: "emerald" },
];

export default function AboutSection() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
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
      id="about"
      ref={sectionRef}
      className="min-h-screen py-16 px-4 sm:px-6 lg:px-16"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={isVisible ? { opacity: 1 } : {}}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Section Header with Decorative Elements */}
        <SectionHeader
          title="About Me"
          description="A glimpse into my background, skills, and passion for technology."
          gradientFrom="blue"
          gradientTo="blue"
          isVisible={isVisible}
        />

        {/* Bio Section with Cards */}
        <div className="mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isVisible ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4 text-text-secondary max-w-full text-justify"
          >
            <Card
              padding="lg"
              className="bg-background-secondary/70 backdrop-blur-sm"
            >
              <p className="text-lg leading-relaxed">
                I&apos;m a B.Tech student with honours in AIML,
                passionate about creating web applications that solve real-world
                problems. With hands-on experience in full-stack development,
                I&apos;ve led and contributed to various web-based projects.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                My two years of volunteering and leadership experience in the
                National Service Scheme (NSS) has honed my ability to work
                effectively in teams and manage complex projects.
              </p>
              <p className="text-lg leading-relaxed mt-4">
                I believe in continuous learning and stay updated with the
                latest technologies to build efficient, scalable, and
                user-friendly applications. My goal is to leverage technology to
                create meaningful solutions that positively impact users&apos; lives.
              </p>
            </Card>
          </motion.div>
        </div>

        {/* Technical Skills Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-14"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="h-10 w-10 rounded-full bg-accent-blue/10 flex items-center justify-center">
              <Code2 size={18} className="text-text-secondary" />
            </div>
            <h3 className="text-xl font-bold">Technical Skills</h3>
          </div>

          {/* Skills Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {skills.map((skill) => {
              const IconComponent = skill.icon;
              return (
                <Card
                  key={skill.category}
                  color={skill.color}
                  padding="md"
                  className="bg-background-secondary/60 backdrop-blur-sm"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-full bg-accent-${skill.color}/10`}>
                      <IconComponent
                        size={20}
                        className={`text-accent-${skill.color}`}
                      />
                    </div>
                    <h4 className={`font-semibold text-accent-${skill.color}`}>
                      {skill.category}
                    </h4>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <Badge key={item} color={skill.color} interactive>
                        {item}
                      </Badge>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </motion.div>

        {/* Languages Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="max-w-full"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="h-8 w-8 rounded-full bg-background-secondary flex items-center justify-center">
              <Globe size={18} className="text-text-secondary" />
            </div>
            <h3 className="text-xl font-semibold">Languages</h3>
          </div>

          <Card padding="md" className="bg-background-secondary/50">
            <div className="flex flex-wrap gap-3">
              {languages.map((language) => (
                <Badge
                  key={language.name}
                  color={language.color}
                  interactive
                  className="flex items-center gap-2"
                >
                  <span className="font-medium">{language.name}</span>
                  <span className="text-xs opacity-80 px-1.5 py-0.5 bg-background-tertiary/30 rounded-full">
                    {language.level}
                  </span>
                </Badge>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>

      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            x: [0, -20, 0],
            y: [0, 20, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
          }}
          className="absolute bottom-[40%] left-[5%] w-48 h-48 bg-accent-purple/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
            repeatType: "mirror",
            delay: 2,
          }}
          className="absolute top-[30%] right-[10%] w-64 h-64 bg-accent-blue/10 rounded-full blur-3xl"
        />
      </div>
    </section>
  );
}
