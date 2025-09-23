import mongoose from "mongoose";
import dotenv from "dotenv";
import { Project, Profile } from "./models/Project.js";

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
    await Profile.deleteMany({});
    console.log("🧹 Old data removed");

    // Add Profile Data from Resume
    const profile = {
      name: "Shubham Rajurpalle",
      title: "Android & Full Stack Developer",
      bio: "Mobile-first engineer specializing in Android and React Native development. I create scalable mobile applications with modern UI/UX design and robust backend integration. Passionate about building user-centric solutions.",
      location: "Nanded, Maharashtra, India",
      contact: {
        email: "rajurpalleshubham1802@gmail.com",
        linkedin: "https://linkedin.com/in/shubham-rajurpalle",
        github: "https://github.com/Shubham-Rajurpalle",
        phone: "+91-9834583910",
      },
      resume: {
        url: "Goldman_sachs_Software_Engineer.pdf",
        filename: "Goldman_sachs_Software_Engineer.pdf",
        uploadedAt: new Date(),
      },
      skills: [
        "Android SDK",
        "Kotlin",
        "Java",
        "JavaScript",
        "C++",
        "Python",
        "React Native",
        "Jetpack Compose",
        "MVVM",
        "Coroutines",
        "LiveData",
        "Firebase",
        "Firestore",
        "SQLite",
        "Room",
        "MongoDB",
        "React.js",
        "Node.js",
        "Express.js",
        "REST APIs",
        "Tailwind CSS",
        "Git",
        "Android Studio",
        "Postman",
        "Figma",
        "Material Design",
      ],
      experience: [
        {
          company: "OrderHub",
          role: "React Native Developer",
          duration: "Dec 2024 - Jan 2025",
          description: [
            "Collaborated with stakeholders to define app flows and create user journeys through detailed Figma wireframes",
            "Designed intuitive UI screens following Google's Material Design system for cross-platform consistency",
            "Planned functionalities: multi-channel order management (WhatsApp, Telegram), PhonePe payment verification, inventory tracking",
            "Focused on designing scalable flows, taking inspiration from distributed system concepts",
          ],
        },
      ],
      education: [
        {
          institution: "SGGSIE&T, Nanded",
          degree: "B.Tech Computer Science Engineering",
          cgpa: "8.65",
          year: "2022 - 2026",
        },
        {
          institution: "Vidhyadham Prashala Shirur, Pune",
          degree: "12th Standard",
          cgpa: "84.83%",
          year: "2020 - 2021",
        },
      ],
      achievements: [
        "🏆 1st Runner-Up at Hackspectra (JobIt - AI job prep app)",
        "🏆 1st Runner-Up at Hack Fusion (CampusCore - College management app)",
        "📺 Founded YouTube Channel 'Story Network' with 250K+ Subscribers",
        "💻 Solved 460+ DSA problems on GeeksforGeeks",
        "🎯 Top 50 Institute Rank in competitive programming",
      ],
      stats: {
        gfgProblems: "460+",
        maxRating: "1532",
        rank: "Top 50 Institute",
        youtubeSubscribers: "250K+",
      },
    };

    await Profile.create(profile);
    console.log("✅ Profile created successfully");

    // Add Projects Data from Resume
    const projects = [
      {
        title: "CricXone",
        slug: "cricxone",
        role: "Application Developer",
        short: "Real-Time Cricket Fan Engagement App with live scores and chat",
        description:
          "Developed an Android app with live scores, video feeds, news, chat, and meme sharing features. Built custom chat and moderation system with optimized performance.",
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
        description:
          "Led development of a role-based campus app for students, faculty, dean, doctor, and security with Firebase Auth and real-time features.",
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
          type: "youtube",
          url: "https://www.youtube.com/watch?v=VIDEO_ID",
        },
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
        description:
          "Directed a team to create an AI-powered app for job discovery, resume tailoring, and interview preparation using Gemini API and advanced ML features.",
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
          type: "youtube",
          url: "https://www.youtube.com/watch?v=VIDEO_ID",
        },
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
        description:
          "Production-ready MERN portfolio with React, Node.js, Express, and MongoDB Atlas. Features 3D interactive elements and admin panel.",
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
        description:
          "Developed a React Native app to help e-commerce sellers manage products, orders, and payments efficiently across multiple channels.",
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
          type: "youtube",
          url: "https://www.youtube.com/watch?v=VIDEO_ID", // replace with actual demo if available
        },
        demo: {
          type: "appetize",
          url: "https://appetize.io/app/b_inc3wwr2nmcjpzqivlnpkzrl64",
        },
        repo: "https://github.com/Shubham-Rajurpalle/OrderHub",
        featured: true,
        duration: "Dec 2024 - Jan 2025",
      },
    ];

    await Project.insertMany(projects);
    console.log("✅ Projects seeded successfully");

    console.log("\n🎉 Seeding completed successfully!");
    console.log(`📊 Created ${projects.length} projects`);
    console.log("👤 Created 1 profile with resume");

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
}

seed();
