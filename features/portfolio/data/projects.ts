import { Project } from "@/features/portfolio/types/projects";

export const PROJECTS: Project[] = [
  {
    id: "draftlogo",
    title: "draftlogo - Generate professional logos in seconds",
    logo: "/images/project-logos/draftlogo.svg",
    description:
      "draftlogo is an AI-powered logo generator built for founders and startups to create professional, modern logos in seconds without designers, long revisions, or expensive tools.",
    features: [
      "Instantly generates professional logo variations from brand name, industry, and description.",
      "Supports text-based and lettermark logo styles tailored for modern startups.",
      "Simple one-time payment system with no subscriptions or hidden commitments.",
      "Generates multiple logo variations per request for better choice and flexibility.",
      "Implements secure login using Better Auth with Google authentication support.",
      "Stores generated logos securely using cloud storage for easy access and downloads.",
      "Clean and intuitive interface optimized for fast logo generation and management.",
    ],
    link: "https://www.draftlogo.com",
    skills: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn/ui",
      "Supabase",
      "Prisma",
      "Better-Auth",
      "Bun",
    ],
    isExpanded: true,
  },
  {
    id: "Fork & Fire",
    title: "Fork & Fire - Recipe discovery app with categories and favorites",
    logo: "/images/project-logos/fork-fire.svg",
    description:
      "Fork & Fire is a recipe discovery app built for food lovers to instantly find, save, and share delicious recipes with smart search and step-by-step cooking guides.",
    features: [
      "Smart recipe search by ingredients, cuisine, or dietary preference for instant results.",
      "Step-by-step cooking guides with images and videos for confident meal preparation.",
      "Save favorite recipes and build a personalized digital cookbook.",
      "Explore a wide range of categories including Beef, Chicken, Seafood, Pasta, Vegan, Vegetarian, Dessert, and more.",
    ],
    link: "https://fork-fire.vercel.app",
    skills: [
      "React.js",
      "JavaScript",
      "TailwindCSS",
      "Vite",
      "Motion",
      "Context API",
    ],
    isExpanded: false,
  },
];
