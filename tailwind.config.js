/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [
    "text-accent-rose",
    "bg-accent-rose",
    "hover:border-accent-rose",
    "bg-accent-rose/10",
    "bg-accent-rose/20",
    "text-accent-blue",
    "bg-accent-blue",
    "hover:border-accent-blue",
    "bg-accent-blue/10",
    "bg-accent-blue/20",
    "text-accent-purple",
    "bg-accent-purple",
    "hover:border-accent-purple",
    "bg-accent-purple/10",
    "bg-accent-purple/20",
    "text-accent-amber",
    "bg-accent-amber",
    "hover:border-accent-amber",
    "bg-accent-amber/10",
    "bg-accent-amber/20",
    "text-accent-emerald",
    "bg-accent-emerald",
    "hover:border-accent-emerald",
    "bg-accent-emerald/10",
    "bg-accent-emerald/20",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Main background colors
        background: {
          primary: "#0A0A0B", // Main background
          secondary: "#111113", // Card/sidebar background
          tertiary: "#18181B", // Elevated components
        },
        // Section accent colors
        accent: {
          blue: "#2563EB", // Projects section
          purple: "#9333EA", // Skills section
          rose: "#E11D48", // Experience section
          amber: "#D97706", // Education section
          emerald: "#059669", // Achievements section
        },
        // Text colors
        text: {
          primary: "#F8FAFC", // Primary text
          secondary: "#94A3B8", // Secondary text
          muted: "#64748B", // Muted text
        },
        // Border colors
        border: {
          DEFAULT: "#27272A",
          hover: "#3F3F46",
        },
      },
      animation: {
        "infinite-scroll": "infinite-scroll 25s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};

