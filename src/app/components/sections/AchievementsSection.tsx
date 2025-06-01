"use client";

import { motion, AnimatePresence } from "@/app/lib/client-utils";
import {
  ExternalLink,
  Medal,
  ChevronLeft,
  ChevronRight,
  X,
  Maximize2,
} from "lucide-react";
import Image from "next/image";
import { useState, useEffect, useRef, useCallback } from "react";
import { Card, SectionHeader, Button } from "@/app/components";

type BadgeColor = "blue" | "purple" | "rose" | "amber" | "emerald";

interface BadgeItem {
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId?: string;
  description: string;
  badgeImage: string;
  certificateLink: string;
  color: BadgeColor;
}

interface CertificateItem {
  title: string;
  issuer: string;
  issuedDate: string;
  description: string;
  certificateLink: string;
  color: BadgeColor;
}

interface CertificateCategory {
  category: string;
  items: CertificateItem[];
}

const badges: BadgeItem[] = [
  {
    title: "Postman API Fundamentals Student Expert",
    issuer: "Postman",
    issuedDate: "Mar 2024",
    credentialId: "65f2e2403c3a547f7b0616a6",
    description:
      "Understanding fundamentals of API development, testing, and collaboration using Postman.",
    badgeImage:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1746909227/Portfolio/Badges/PostmanAPI.png",
    certificateLink:
      "https://api.badgr.io/public/assertions/DfBM8X1hTgywjokZ_X1s5Q?identity__email=nisha.shetty%40vit.edu.in",
    color: "blue",
  },
  {
    title: "Web Development Fundamentals - IBM SkillsBuild",
    issuer: "IBM",
    issuedDate: "Sept 2024",
    credentialId: "def456",
    description:
      "Comprehensive understanding of web development concepts, including HTML, CSS, and JavaScript.",
    badgeImage:
      "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1746911219/Portfolio/Badges/IBM.png",
    certificateLink:
      "https://www.credly.com/badges/ffe6b297-3f77-44c2-8714-c3490f86736c/public_url",
    color: "purple",
  },
];

const certificates: CertificateCategory[] = [
  {
    category: "Technical Certifications",
    items: [
      {
        title: "AWS Academy Graduate - Cloud Foundations",
        issuer: "Amazon Web Services",
        issuedDate: "Mar 2024",
        description:
          "Foundational knowledge of AWS Cloud concepts, services, and best practices.",
        certificateLink:
          "https://www.credly.com/badges/fa2d66b8-5774-46a2-adcb-77b331b1dfe5/public_url",
        color: "amber",
      },
      {
        title: "AWS Academy Graduate - Cloud Architecture",
        issuer: "Amazon Web Services",
        issuedDate: "Nov 2024",
        description:
          "Understanding of AWS Cloud architecture and design principles.",
        certificateLink:
          "https://www.credly.com/badges/5e5ca446-1525-42e4-a8b1-adb3511d1ab3/public_url",
        color: "rose",
      },
    ],
  },
  {
    category: "Academic Excellence",
    items: [
      {
        title: "Certificate of Merit - Artificial Intelligence (Sem V)",
        issuer: "VIT Mumbai",
        issuedDate: "Dec 2024",
        description:
          "Recognized for outstanding performance in Artificial Intelligence course during Semester V.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747572338/Portfolio/Certificates/Academics/AI_SemV_CertificateOfMerit.jpg",
        color: "rose",
      },
      {
        title: "Certificate of Merit - Computer Networks (Sem V)",
        issuer: "VIT Mumbai",
        issuedDate: "Dec 2024",
        description:
          "Recognized for outstanding performance in Computer Networks course during Semester V.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747572146/Portfolio/Certificates/Academics/ComputerNetworks_SemV_CertificateOfMerit.jpg",
        color: "blue",
      },
      {
        title: "Certificate of Merit - Web Technology (Sem IV)",
        issuer: "VIT Mumbai",
        issuedDate: "May 2024",
        description:
          "Recognized for outstanding performance in Web Technology course during Semester IV.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747571891/Portfolio/Certificates/Academics/WebTechnology_SemIV_CertificateOfMerit.jpg",
        color: "purple",
      },
      {
        title:
          "Certificate of Merit - Microcontroller and Applications (Sem IV)",
        issuer: "VIT Mumbai",
        issuedDate: "May 2024",
        description:
          "Recognized for outstanding performance in Microcontroller and Applications course during Semester IV.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747572019/Portfolio/Certificates/Academics/MicrocontrollerAndApplication_SemIV_CertificateOfMerit.jpg",
        color: "amber",
      },
      {
        title: "Certificate of Merit - Data Structures (Sem III)",
        issuer: "VIT Mumbai",
        issuedDate: "Nov 2023",
        description:
          "Recognized for outstanding performance in Data Structures course during Semester III.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747571790/Portfolio/Certificates/Academics/DataStructure_Sem_III_CertificateOfMerit.jpg",
        color: "emerald",
      },
    ],
  },
  {
    category: "Workshops & Training",
    items: [
      {
        title: "AI for future Workforce Workshop",
        issuer: "Intel",
        issuedDate: "Feb 2023",
        description: "Hands-on workshop on AI technologies.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747571536/Portfolio/Certificates/Workshops/Intel_AI_Workshop.jpg",
        color: "rose",
      },
      {
        title: "NISM Certificate of Participation",
        issuer: "National Institute of Securities Markets (NISM)",
        issuedDate: "Feb 2023",
        description:
          "A 5 day residential study tour at the NISM Patalganga campus on 'Overview of wealth creation'.",
        certificateLink:
          "https://res.cloudinary.com/dq4rbg2eb/image/upload/v1747574851/Portfolio/Certificates/Workshops/NISM_CertificateOfParticipation.jpg",
        color: "amber",
      },
    ],
  },
];

// Component for truncating text with expandable functionality
function TruncatedText({
  text,
  maxLength,
  textClass,
}: {
  text: string;
  maxLength: number;
  textClass?: string;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  if (text.length <= maxLength) {
    return <p className={textClass}>{text}</p>;
  }

  return (
    <div>
      <p className={textClass}>
        {isExpanded ? text : `${text.slice(0, maxLength)}...`}
      </p>
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="text-xs font-medium mt-1 hover:underline"
      >
        {isExpanded ? "Show less" : "Read more"}
      </button>
    </div>
  );
}

export default function AchievementsSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [selectedBadge, setSelectedBadge] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isFocused, setIsFocused] = useState(false);
  const [showFullImage, setShowFullImage] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const academicCategory = certificates.find(
    (cat) => cat.category === "Academic Excellence"
  );
  const academicCerts = academicCategory ? academicCategory.items : [];

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
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  // Auto-slide timer
  useEffect(() => {
    if (isFocused || showFullImage) return;

    const interval = setInterval(() => {
      setActiveIndex((current) =>
        current === academicCerts.length - 1 ? 0 : current + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [isFocused, showFullImage, academicCerts.length]);

  // Navigation controls
  const nextSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === academicCerts.length - 1 ? 0 : current + 1
    );
  }, [academicCerts.length]);

  const prevSlide = useCallback(() => {
    setActiveIndex((current) =>
      current === 0 ? academicCerts.length - 1 : current - 1
    );
  }, [academicCerts.length]);

  return (
    <section
      id="achievements"
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
          title="Achievements"
          description="Professional certifications, badges, and recognition highlighting my expertise and continuous learning journey."
          gradientFrom="emerald"
          gradientTo="emerald"
          isVisible={isVisible}
        />

        {/* Badges Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mb-16"
        >
          <h3 className="text-2xl font-bold mb-6">Professional Badges</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {badges.map((badge, index) => (
              <motion.div
                key={badge.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isVisible ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                className="group relative h-full"
                onHoverStart={() => setSelectedBadge(index)}
                onHoverEnd={() => setSelectedBadge(null)}
                onTouchStart={() =>
                  setSelectedBadge(index === selectedBadge ? null : index)
                }
              >
                <Card
                  color={badge.color}
                  padding="md"
                  className="h-full flex flex-col transition-all duration-300"
                >
                  {/* Badge Image */}
                  <div className="relative w-full aspect-square mb-4">
                    <Image
                      src={badge.badgeImage}
                      alt={badge.title}
                      fill
                      className="object-contain"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      loading="lazy"
                    />
                  </div>

                  {/* Badge Info */}
                  <div className="space-y-2 mt-auto">
                    <h4 className="font-semibold text-lg">{badge.title}</h4>
                    <p className="text-text-secondary text-sm">
                      {badge.issuer}
                    </p>
                    <p className="text-sm text-text-secondary">
                      {badge.issuedDate}
                    </p>
                  </div>

                  <AnimatePresence>
                    {selectedBadge === index && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute inset-0 bg-background-secondary/95 backdrop-blur-sm p-6 rounded-xl z-10"
                      >
                        <div className="h-full flex flex-col justify-between">
                          <div>
                            <h4 className="font-semibold text-lg mb-2">
                              {badge.title}
                            </h4>
                            <p className="text-text-secondary text-sm">
                              {badge.description}
                            </p>
                          </div>
                          <Button
                            href={badge.certificateLink}
                            target="_blank"
                            color={badge.color}
                            variant="ghost"
                            icon={ExternalLink}
                            size="sm"
                          >
                            View Certificate
                          </Button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Certificates Section */}
        <div className="space-y-16">
          {certificates.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 30 }}
              animate={isVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.2 + categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold mb-6">{category.category}</h3>

              {/* Academic Excellence - Carousel Design */}
              {category.category === "Academic Excellence" ? (
                <div
                  className="relative"
                  onMouseEnter={() => setIsFocused(true)}
                  onMouseLeave={() => setIsFocused(false)}
                  onTouchStart={() => setIsFocused(true)}
                >
                  <Card
                    color={academicCerts[activeIndex].color}
                    padding="lg"
                    className="transition-all duration-300"
                  >
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {/* Certificate Image */}
                      <div
                        className="relative bg-background-primary h-[280px] sm:h-[320px] lg:h-[380px] cursor-pointer rounded-lg overflow-hidden"
                        onClick={() => setShowFullImage(true)}
                      >
                        <Image
                          src={academicCerts[activeIndex].certificateLink}
                          alt={academicCerts[activeIndex].title}
                          fill
                          className="object-contain p-4"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        <div className="absolute inset-0 hover:bg-black/5 transition-colors duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="p-3 rounded-full bg-background-secondary/90 backdrop-blur-sm">
                            <Maximize2 size={20} />
                          </div>
                        </div>
                      </div>

                      {/* Certificate Details */}
                      <div className="flex flex-col justify-between h-full">
                        <div className="space-y-4">
                          <div className="flex items-start gap-4">
                            <div
                              className={`p-3 rounded-xl bg-accent-${academicCerts[activeIndex].color}/10`}
                            >
                              <Medal
                                size={24}
                                className={`text-accent-${academicCerts[activeIndex].color}`}
                              />
                            </div>
                            <div>
                              <h4 className="text-xl font-bold">
                                {academicCerts[activeIndex].title}
                              </h4>
                              <p className="text-text-secondary mt-1">
                                {academicCerts[activeIndex].issuer}
                              </p>
                              <p className="text-sm text-text-secondary">
                                {academicCerts[activeIndex].issuedDate}
                              </p>
                            </div>
                          </div>

                          <p className="text-text-secondary">
                            {academicCerts[activeIndex].description}
                          </p>
                        </div>

                        <div className="mt-4 md:mt-0 flex justify-start mx-auto">
                          <Button
                            onClick={() => setShowFullImage(true)}
                            color={academicCerts[activeIndex].color}
                            size="md"
                            className="group shadow-md"
                          >
                            <div className="flex items-center gap-2">
                              <span>View Full Certificate</span>
                              <Maximize2
                                size={18}
                                className="group-hover:scale-110 transition-transform duration-200"
                              />
                            </div>
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Navigation Controls */}
                    <div className="flex justify-between items-center mt-6 pt-4 border-t border-border">
                      <Button
                        onClick={prevSlide}
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        icon={ChevronLeft}
                        ariaLabel="Previous certificate"
                      />

                      <span className="text-sm text-text-secondary">
                        {activeIndex + 1} of {academicCerts.length}
                      </span>

                      <Button
                        onClick={nextSlide}
                        variant="ghost"
                        size="sm"
                        className="rounded-full"
                        icon={ChevronRight}
                        ariaLabel="Next certificate"
                      />
                    </div>
                  </Card>
                </div>
              ) : (
                <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                  {category.items.map((cert, index) => (
                    <motion.div
                      key={cert.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isVisible ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                      className="h-full"
                    >
                      <Card
                        color={cert.color}
                        padding="md"
                        className="h-full flex flex-col"
                      >
                        <div className="flex gap-4 items-start">
                          <div
                            className={`p-3 rounded-xl bg-accent-${cert.color}/10 flex-shrink-0`}
                          >
                            <Medal
                              size={24}
                              className={`text-accent-${cert.color}`}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold">{cert.title}</h4>
                            <p className="text-text-secondary text-sm">
                              {cert.issuer}
                            </p>
                            <p className="text-sm text-text-secondary">
                              {cert.issuedDate}
                            </p>
                          </div>
                        </div>

                        {/* Description with truncation */}
                        <div className="mt-4 flex-grow">
                          <TruncatedText
                            text={cert.description}
                            maxLength={100}
                            textClass="text-text-secondary text-sm"
                          />
                        </div>

                        <Button
                          href={cert.certificateLink}
                          target="_blank"
                          variant="ghost"
                          color={cert.color}
                          icon={ExternalLink}
                          className="mt-4"
                          size="sm"
                        >
                          View Certificate
                        </Button>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Full Screen Certificate Modal */}
      <AnimatePresence>
        {showFullImage && academicCategory?.items[activeIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[100] bg-background-primary/95 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setShowFullImage(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative max-w-5xl w-full h-[80vh] sm:h-[85vh] md:h-[90vh]"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="relative w-full h-full overflow-auto">
                <Image
                  src={academicCerts[activeIndex].certificateLink}
                  alt={academicCerts[activeIndex].title}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                />
              </div>

              {/* Close button */}
              <Button
                onClick={() => setShowFullImage(false)}
                className="absolute top-2 right-2 z-20 rounded-full !p-2"
                variant="ghost"
                color="default"
                size="sm"
                icon={X}
                ariaLabel="Close full image view"
              />

              {/* Certificate info */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 max-w-xl w-full px-4">
                <div className="bg-background-secondary/80 backdrop-blur-sm rounded-lg p-3 text-center shadow-md">
                  <h3 className="text-lg font-bold">
                    {academicCerts[activeIndex].title}
                  </h3>
                  <p className="text-text-secondary text-sm">
                    {academicCerts[activeIndex].issuer} •{" "}
                    {academicCerts[activeIndex].issuedDate}
                  </p>
                </div>
              </div>

              {/* Navigation arrows */}
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
                  className="pointer-events-auto bg-background-secondary/70 backdrop-blur-sm"
                  ariaLabel="Previous certificate"
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
                  className="pointer-events-auto bg-background-secondary/70 backdrop-blur-sm"
                  ariaLabel="Next certificate"
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
