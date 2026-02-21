import { Experience } from "@/features/portfolio/types/experiences";

export const EXPERIENCES: Experience[] = [
  {
    id: "collab-vision-infosolutions",
    companyName: "Collab Vision Infosolutions",
    companyLogo: "/images/company-logos/collab-vision-infosolutions.svg",
    companyWebsite: "https://www.collabvision.in",
    positions: [
      {
        id: "94ae3d2b",
        title: "Backend Developer & UI/UX Intern",
        employmentPeriod: {
          start: "Jun 2025",
          end: "Aug 2025",
        },
        employmentType: "Internship",
        description: [
          "UI/UX Design: Designed an intuitive and clean user interface for the mobile app.",
          "API & Logic: Built a RESTful API with Node.js and Express.",
          "Security: Implemented user authentication with an OTP-based password reset and registration system.",
          "Email Automation: Used Brevo to send dynamic emails.",
          "File Management: Integrated Cloudinary for secure file uploads and storage.",
          "Deployment: Managed the full deployment process to Render, ensuring production readiness and reliable performance.",
        ],
        skills: ["JavaScript", "Node.js", "Express.js", "MongoDB", "Figma"],
        isExpanded: true,
      },
      {
        id: "94ae3d2b-2",
        title: "Backend Developer & UI/UX Intern",
        employmentPeriod: {
          start: "Jun 2025",
          end: "Aug 2025",
        },
        employmentType: "Internship",
        description: [
          "UI/UX Design: Designed an intuitive and clean user interface for the mobile app.",
          "API & Logic: Built a RESTful API with Node.js and Express.",
          "Security: Implemented user authentication with an OTP-based password reset and registration system.",
          "Email Automation: Used Brevo to send dynamic emails.",
          "File Management: Integrated Cloudinary for secure file uploads and storage.",
          "Deployment: Managed the full deployment process to Render, ensuring production readiness and reliable performance.",
        ],
        skills: ["JavaScript", "Node.js", "Express.js", "MongoDB", "Figma"],
        isExpanded: false,
      },
    ],
    isCurrentEmployer: true,
  },
];
