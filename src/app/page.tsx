"use client";

import dynamic from "next/dynamic";

const Navigation = dynamic(() => import("@/app/components/shared/Navigation"));
const ProfileCard = dynamic(
  () => import("@/app/components/shared/ProfileCard")
);
const HomeSection = dynamic(
  () => import("@/app/components/sections/HomeSection")
);
const AboutSection = dynamic(
  () => import("@/app/components/sections/AboutSection")
);
const ProjectSection = dynamic(
  () => import("@/app/components/sections/ProjectSection")
);
const ExperienceSection = dynamic(
  () => import("@/app/components/sections/ExperienceSection")
);
const EducationSection = dynamic(
  () => import("@/app/components/sections/EducationSection")
);
const AchievementsSection = dynamic(
  () => import("@/app/components/sections/AchievementsSection")
);
const VolunteeringSection = dynamic(
  () => import("@/app/components/sections/VolunteeringSection")
);
const ContactSection = dynamic(
  () => import("@/app/components/sections/ContactSection")
);

export default function ClientWrapper() {
  return (
    <>
      <div className="relative min-h-screen">
      <Navigation />
      
      {/* Desktop Profile Card */}
      <div className="hidden md:block">
        <ProfileCard />
      </div>
      
      {/* Main content */}
      <div className="w-full md:pl-[400px]">
        <HomeSection />
        <AboutSection />
        <ProjectSection />
        <ExperienceSection />
        <EducationSection />
        <AchievementsSection />
        <VolunteeringSection />
        <ContactSection />
      </div>
      </div>
    </>
  );
}
