import mongoose from "mongoose";
import dotenv from "dotenv";
import Project from "./models/Project.js";

dotenv.config();

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Connected to MongoDB");

    // Clear old data
    await Project.deleteMany({});
    console.log("🧹 Old projects removed");

    // Add new projects
    const projects = [
      {
        title: "CricXone",
        slug: "cricxone",
        role: "Application Developer",
        short:
          "Real-time cricket fan engagement app with chat, memes, and live scores.",
        tech: ["Android", "Firebase", "Coroutines", "RecyclerView"],
        highlights: [
          "Developed live scores, news, chat, and meme-sharing features",
          "Built custom chat + moderation system with media & polls",
          "Optimized RecyclerView with DiffUtil & caching, reducing API calls by 30%",
          "Simulated event-driven architecture for real-time updates",
        ],
        cover: "/fallback-hero.png",
        demo: {
          type: "appetize",
          url: "https://appetize.io/app/b_inc3wwr2nmcjpzqivlnpkzrl64",
        },
        repo: "https://github.com/Shubham-Rajurpalle/CricXone",
        featured: true,
      },
      {
        title: "CampusCore",
        slug: "campuscore",
        role: "Mobile App Developer",
        short: "Role-based smart college management system",
        tech: [
          "Android",
          "Firebase Auth",
          "Firestore",
          "Coroutines",
          "LiveData",
        ],
        highlights: [
          "Led development of role-based campus app for students, faculty, and admin",
          "Implemented QR login & misconduct reporting across admin hierarchy",
          "Integrated elections, complaints, booking, and notification modules",
          "Optimized performance using LiveData + coroutine-backed Firestore sync",
        ],
        cover: "/fallback-hero.png",
        demo: {
          type: "youtube",
          url: "https://www.youtube.com/watch?v=VIDEO_ID",
        },
        repo: "https://github.com/Shubham-Rajurpalle/CampusCore",
        featured: true,
      },
      {
        title: "JobIt",
        slug: "jobit",
        role: "Android App Developer",
        short: "AI-powered job prep and resume tailoring app",
        tech: ["Android", "Firebase", "Gemini API", "Kommunicate SDK"],
        highlights: [
          "Integrated Gemini API for dynamic resume tailoring",
          "Built AI interview chatbot with Kommunicate SDK",
          "Designed secure profile system with resume upload & privacy focus",
          "Won 1st Runner-Up at Hackspectra hackathon",
        ],
        cover: "/fallback-hero.png",
        demo: {
          type: "youtube",
          url: "https://www.youtube.com/watch?v=VIDEO_ID",
        },
        repo: "https://github.com/Shubham-Rajurpalle/JobIt",
        featured: true,
      },
      {
        title: "DevFolio",
        slug: "devfolio",
        role: "Full Stack Web Developer",
        short:
          "Interactive MERN portfolio with 3D animations & live project demos",
        tech: [
          "React",
          "Node.js",
          "Express",
          "MongoDB Atlas",
          "Tailwind",
          "TypeScript",
        ],
        highlights: [
          "Built interactive 3D hero using react-three-fiber & micro-animations",
          "Integrated Appetize + Expo Snack for live mobile app demos",
          "Designed CMS-style admin with JWT authentication & Cloudinary uploads",
          "Deployed on Vercel + Render, optimized for SEO & recruiter-friendly UX",
        ],
        cover: "/fallback-hero.png",
        demo: {
          type: "youtube",
          url: "https://www.youtube.com/watch?v=VIDEO_ID", // replace with real demo
        },
        repo: "https://github.com/Shubham-Rajurpalle/DevFolio",
        featured: true,
      },
    ];

    await Project.insertMany(projects);
    console.log("✅ Projects seeded successfully");

    process.exit();
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();
