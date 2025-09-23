import axios from "axios";
import type { Project, Profile, ContactForm } from "./types";

// Use environment variable or fallback to local development
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:4000";

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Global response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(
      `✅ API Success: ${response.config.method?.toUpperCase()} ${
        response.config.url
      }`
    );
    return response;
  },
  (error) => {
    console.error(
      `❌ API Error: ${error.config?.method?.toUpperCase()} ${
        error.config?.url
      }`,
      error.response?.status,
      error.response?.data || error.message
    );
    return Promise.reject(error);
  }
);

// --- Projects API ---
export async function getProjects(featured?: boolean): Promise<Project[]> {
  try {
    const params: any = {};
    if (featured) params.featured = "true";
    params._t = Date.now(); // Cache buster

    console.log(
      `📡 Fetching projects from: ${api.defaults.baseURL}/api/projects`
    );

    const { data } = await api.get("/api/projects", { params });
    const projects = Array.isArray(data) ? data : [];

    console.log(`✅ Projects fetched:`, projects.length, "projects");

    // Limit to 4 projects as specified
    return projects.slice(0, 5);
  } catch (error) {
    console.warn("⚠️ Failed to fetch projects from API, using fallback data");
    return getFallbackProjects();
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    console.log(`📡 Fetching project: ${slug}`);
    const { data } = await api.get(`/api/projects/${slug}`);
    return data;
  } catch (error) {
    console.warn(`⚠️ Failed to fetch project ${slug}, checking fallback`);
    const fallbackProjects = getFallbackProjects();
    return fallbackProjects.find((p) => p.slug === slug) || null;
  }
}

// --- Profile API ---
export async function getProfile(): Promise<Profile | null> {
  try {
    console.log(
      `📡 Fetching profile from: ${api.defaults.baseURL}/api/profile`
    );
    const { data } = await api.get("/api/profile");
    return data;
  } catch (error) {
    console.warn("⚠️ Failed to fetch profile from API, using fallback data");
    return getFallbackProfile();
  }
}

// --- Contact API ---
export async function submitContactForm(
  formData: ContactForm
): Promise<boolean> {
  try {
    console.log("📡 Submitting contact form");
    const { data } = await api.post("/api/contact", formData);
    return data.success || false;
  } catch (error) {
    console.error("❌ Error submitting contact form:", error);
    throw new Error("Failed to submit contact form. Please try again later.");
  }
}

// --- Resume API ---
export async function downloadResume(): Promise<void> {
  try {
    const resumeUrl = `${api.defaults.baseURL}/api/resume/download`;
    console.log(`📡 Downloading resume from: ${resumeUrl}`);

    const link = document.createElement("a");
    link.href = resumeUrl;
    link.download = "Shubham_Rajurpalle_Resume.pdf";
    link.target = "_blank";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error("❌ Error downloading resume:", error);
    // Fallback: Try direct link
    window.open(`${api.defaults.baseURL}/api/resume/download`, "_blank");
  }
}

// --- Health check ---
export async function checkHealth(): Promise<boolean> {
  try {
    console.log(`📡 Health check: ${api.defaults.baseURL}/api/health`);
    const { data } = await api.get("/api/health");
    return data.status === "OK";
  } catch (error) {
    console.warn("⚠️ Health check failed:", error.message);
    return false;
  }
}

// --- Fallback data ---
function getFallbackProjects(): Project[] {
  return [
    {
      title: "CricXone",
      slug: "cricxone",
      role: "Application Developer",
      short: "Real-Time Cricket Fan Engagement App with live scores and chat",
      tech: [
        "Android",
        "Kotlin",
        "Firebase",
        "Coroutines",
        "RecyclerView",
        "DiffUtil",
      ],
      highlights: [
        "Developed live scores, video feeds, news, chat, and meme sharing features",
        "Implemented custom chat and meme system supporting media, polls, deletions, and moderation",
        "Designed engagement tracker ranking users and teams to boost participation",
        "Optimized RecyclerView with DiffUtil and caching, reducing API calls by 30%",
        "Simulated event-driven architecture for real-time updates",
      ],
      cover: "/cricxone_logo.jpg",
      demo: {
        type: "appetize",
        url: "https://appetize.io/app/b_inc3wwr2nmcjpzqivlnpkzrl64",
      },
      repo: "https://github.com/Shubham-Rajurpalle/CricXone",
      featured: true,
      duration: "May 2024 - May 2025",
    },
    {
      title: "CampusCore",
      slug: "campuscore",
      role: "Mobile App Developer",
      short: "Smart College Management System with role-based access",
      tech: [
        "Android",
        "Kotlin",
        "Firebase Auth",
        "Firestore",
        "Coroutines",
        "LiveData",
        "QR Scanner",
      ],
      highlights: [
        "Led development of role-based campus app for students, faculty, dean, doctor, and security",
        "Deployed QR code login and real-time misconduct reporting across admin hierarchy",
        "Integrated modules for elections, complaints, booking, and notifications",
        "Optimized performance using LiveData and coroutines with Firestore sync",
        "Built reporting flows resembling compliance monitoring pipelines",
      ],
      cover: "/campuscore.jpg",
      demo: {
        type: "appetize",
        url: "https://appetize.io/app/b_mgurgbgitawf5mlnkzfjxfhxm4",
      },
      repo: "https://github.com/Shubham-Rajurpalle/HackFusion",
      featured: true,
      duration: "Feb 2025 - Mar 2025",
    },
    {
      title: "JobIt",
      slug: "jobit",
      role: "Android App Developer",
      short: "AI-Powered Job Prep and Resume Tailoring App",
      tech: [
        "Android",
        "Kotlin",
        "Firebase",
        "Gemini API",
        "Kommunicate SDK",
        "ML",
      ],
      highlights: [
        "Directed team to create AI-powered app for job discovery and resume tailoring",
        "Integrated Gemini API to analyze job descriptions and generate tailored resumes dynamically",
        "Implemented chatbot using Kommunicate SDK to simulate interview questions by job role",
        "Built secure profile system with resume upload and job title storage in Firebase",
        "Won 1st Runner-Up at Hackspectra hackathon (50+ teams)",
      ],
      cover: "/jobit.jpg",
      demo: {
        type: "appetize",
        url: "https://appetize.io/app/b_fd7aymu3xjblrsjuyzgzakjqly",
      },
      repo: "https://github.com/Shubham-Rajurpalle/JobIt",
      featured: true,
      duration: "Mar 2025 - Apr 2025",
    },
    {
      title: "DevFolio",
      slug: "devfolio",
      role: "Full Stack Web Developer",
      short: "Full Stack Portfolio Web App with 3D animations and CMS",
      tech: [
        "React",
        "Node.js",
        "Express",
        "MongoDB",
        "TypeScript",
        "Tailwind CSS",
        "Three.js",
      ],
      highlights: [
        "Delivered production-ready MERN portfolio using React, Node.js, Express, and MongoDB Atlas",
        "Designed 3D interactive hero with glassmorphism, parallax tilt, and micro-animations",
        "Integrated live app demos with Appetize.io and Expo Snack with responsive iframes",
        "Built CMS-style admin panel with JWT authentication for project CRUD and Cloudinary uploads",
        "Deployed with Vercel, Render, and MongoDB Atlas, optimized for SEO and performance",
      ],
      cover: "/devfolio.jpg",
      repo: "https://github.com/Shubham-Rajurpalle/Devfolio",
      liveUrl: "https://shubham-devfolio.vercel.app",
      featured: true,
      duration: "Aug 2025 - Present",
    },
    {
      title: "OrderHub",
      slug: "orderhub",
      role: "React Native Developer",
      short: "E-commerce Store Management System for Sellers",
      tech: [
        "React Native",
        "Firebase",
        "Firestore",
        "Material Design",
        "PhonePe Payment Integration",
        "WhatsApp API",
        "Telegram API",
        "Real-Time Updates",
      ],
      highlights: [
        "Collaborated with stakeholders to define app flows and create user journeys through detailed Figma wireframes",
        "Designed intuitive UI screens following Google's Material Design system for cross-platform consistency",
        "Planned multi-channel order management (WhatsApp, Telegram), PhonePe payment verification, and real-time updates",
        "Focused on designing scalable flows, inspired by distributed system concepts",
      ],
      cover: "/orderhub.jpg",
      demo: {
        type: "appetize",
        url: "https://appetize.io/app/b_inc3wwr2nmcjpzqivlnpkzrl64",
      },
      repo: "https://github.com/Shubham-Rajurpalle/OrderHub",
      featured: true,
      duration: "Dec 2024 - Jan 2025",
    },
  ];
}


function getFallbackProfile(): Profile {
  return {
    name: "Shubham Rajurpalle",
    title: "Android & Full Stack Developer",
    bio: "Mobile-first engineer specializing in Android and React Native development with expertise in building scalable applications.",
    location: "Nanded, Maharashtra, India",
    contact: {
      email: "rajurpalleshubham1802@gmail.com",
      linkedin: "https://linkedin.com/in/shubham-rajurpalle",
      github: "https://github.com/Shubham-Rajurpalle",
      phone: "+91-9834583910",
    },
    resume: {
      url: "/Goldman_sachs_Software_Engineer.pdf",
      filename: "Goldman_sachs_Software_Engineer.pdf",
      uploadedAt: new Date(),
    },
    skills: [
      "Android",
      "Kotlin",
      "React Native",
      "Firebase",
      "Node.js",
      "TypeScript",
      "MongoDB",
    ],
    experience: [],
    education: [],
    achievements: [],
    stats: {
      gfgProblems: "460+",
      maxRating: "1532",
      rank: "Top 50",
      youtubeSubscribers: "250K+",
    },
  };
}
