"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "@/app/lib/client-utils";
import {
  Home,
  Code,
  GraduationCap,
  Award,
  Briefcase,
  User,
  Menu,
  X,
  HeartHandshake,
  Mail,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";

type NavItem = {
  name: string;
  icon: React.ElementType;
  href: string;
  color: string;
};

const ACCENT_COLORS: Record<string, string> = {
  "accent-blue": "#2563EB",
  "accent-purple": "#9333EA",
  "accent-rose": "#E11D48",
  "accent-amber": "#D97706",
  "accent-emerald": "#059669",
};

const desktopNavItems: NavItem[] = [
  { name: "Home", icon: Home, href: "#home", color: "accent-blue" },
  { name: "About", icon: User, href: "#about", color: "accent-purple" },
  { name: "Projects", icon: Code, href: "#projects", color: "accent-rose" },
  {
    name: "Experience",
    icon: Briefcase,
    href: "#experience",
    color: "accent-emerald",
  },
  {
    name: "Education",
    icon: GraduationCap,
    href: "#education",
    color: "accent-amber",
  },
  {
    name: "Achievements",
    icon: Award,
    href: "#achievements",
    color: "accent-emerald",
  },
  {
    name: "Volunteering",
    icon: HeartHandshake,
    href: "#volunteering",
    color: "accent-rose",
  },
];

const mobileNavItems: NavItem[] = [
  ...desktopNavItems,
  { name: "Contact", icon: Mail, href: "#contact", color: "accent-rose" },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState("home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const navItemRefs = useRef<(HTMLAnchorElement | null)[]>([]);
  const [indicatorStyles, setIndicatorStyles] = useState({
    top: 0,
    backgroundColor: ACCENT_COLORS["accent-blue"],
  });

  const getAccentColor = useCallback((colorName: string): string => {
    return ACCENT_COLORS[colorName] || ACCENT_COLORS["accent-blue"];
  }, []);

  const updateIndicatorPosition = useCallback(() => {
    if (!isMounted) return;

    const activeIndex = desktopNavItems.findIndex(
      (item) => item.href.slice(1) === activeSection
    );

    if (activeIndex < 0 || !navItemRefs.current[activeIndex]) return;

    const activeItem = navItemRefs.current[activeIndex];
    if (!activeItem || !activeItem.parentElement) return;

    const rect = activeItem.getBoundingClientRect();
    const parentRect = activeItem.parentElement.getBoundingClientRect();

    const top = rect.top - parentRect.top;
    setIndicatorStyles({
      top,
      backgroundColor: getAccentColor(desktopNavItems[activeIndex].color),
    });
  }, [activeSection, isMounted, getAccentColor]);

  const handleScroll = useCallback(() => {
    const sections = document.querySelectorAll("section");
    const scrollPosition = window.scrollY + 100;

    for (const section of sections) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id") || "";

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        setActiveSection(sectionId);
        break;
      }
    }
  }, []);

  const scrollToSection = useCallback((targetId: string) => {
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    const headerHeight = 60;
    const targetPosition =
      targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  }, []);

  const handleNavClick = useCallback(
    (
      e: React.MouseEvent<HTMLAnchorElement>,
      href: string,
      isMobile = false
    ) => {
      e.preventDefault();

      if (isMobile) {
        setIsMenuOpen(false);
        setTimeout(() => {
          const targetId = href.substring(1);
          scrollToSection(targetId);
        }, 150);
      } else {
        const targetId = href.substring(1);
        scrollToSection(targetId);
      }
    },
    [scrollToSection]
  );

  useEffect(() => {
    setIsMounted(true);
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [activeSection, updateIndicatorPosition]);

  if (!isMounted) return null;

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 md:hidden">
        <div className="bg-background-secondary border-b border-border p-4">
          <div className="flex items-center justify-between">
            <a href="#home" className="flex items-center">
              <Image
                src="/Nisha_Logo.png"
                width={32}
                height={32}
                alt="Nisha Shetty"
                className="h-8 w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("home");
                }}
              />
            </a>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2"
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="absolute top-full left-0 right-0 bg-background-secondary border-b border-border"
            >
              {mobileNavItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item.href, true)}
                  className={cn(
                    "flex items-center p-4 hover:bg-background-tertiary transition-colors",
                    activeSection === item.href.slice(1) && "text-accent-blue"
                  )}
                >
                  <item.icon size={20} className="mr-3" />
                  {item.name}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="hidden md:flex flex-col items-center fixed left-4 top-0 bottom-0 z-[80]">
        <div className="mt-6 mb-12">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection("home");
            }}
            className="block"
          >
            <Image
              width={32}
              height={32}
              src="/Nisha_Logo.png"
              alt="Nisha Shetty"
              className="h-12 w-12 rounded-full object-cover border-2 border-border"
            />
          </a>
        </div>

        <div className="relative flex-1 flex items-center">
          <div className="flex flex-col gap-6 relative">
            <motion.div
              className="absolute rounded-full z-0"
              animate={{
                top: `${indicatorStyles.top}px`,
                backgroundColor: indicatorStyles.backgroundColor,
              }}
              initial={false}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30,
              }}
              style={{ width: "46px", height: "46px" }}
            />

            <AnimatePresence>
              <motion.div
                key={activeSection}
                className="absolute rounded-full z-0 opacity-30"
                initial={{
                  top: `${indicatorStyles.top}px`,
                  width: "30px",
                  height: "30px",
                  x: "8px",
                  y: "8px",
                }}
                animate={{
                  width: "60px",
                  height: "60px",
                  opacity: 0,
                  x: "-7px",
                  y: "-7px",
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8 }}
                style={{
                  backgroundColor: indicatorStyles.backgroundColor,
                }}
              />
            </AnimatePresence>

            {desktopNavItems.map((item, index) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                ref={(el) => {
                  navItemRefs.current[index] = el;
                }}
                className="group relative z-10"
                aria-label={item.name}
              >
                <div
                  className={cn(
                    "p-3 rounded-full transition-colors",
                    activeSection === item.href.slice(1)
                      ? "text-white"
                      : "hover:bg-background-tertiary bg-transparent"
                  )}
                >
                  <item.icon size={20} />
                </div>
                <span className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-background-tertiary rounded-md text-sm opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-[60] pointer-events-none">
                  {item.name}
                </span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
