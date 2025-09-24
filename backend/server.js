import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import { Project, Profile } from "./models/Project.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      process.env.FRONTEND_URL || "http://localhost:5173",
      "https://*.vercel.app", // Allow all Vercel preview deployments
      "http://localhost:3000", // Additional origins
      "https://devfolio-six-omega.vercel.app", // Remove trailing slash
    ],
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Request logging middleware
app.use((req, res, next) => {
  console.log(`📝 ${new Date().toISOString()} - ${req.method} ${req.url}`);
  next();
});

// Serve static files (resume, images)
app.use("/static", express.static(path.join(__dirname, "public")));

// MongoDB Connection with retry logic
const connectToMongoDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI environment variable is not set");
    }

    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log("✅ Connected to MongoDB");

    // Initialize default data if none exists
    await initializeDefaultData();
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);

    // Retry connection after 5 seconds
    console.log("🔄 Retrying MongoDB connection in 5 seconds...");
    setTimeout(connectToMongoDB, 5000);
  }
};

// Initialize default data
async function initializeDefaultData() {
  try {
    // Check if profile exists
    const profileCount = await Profile.countDocuments();
    if (profileCount === 0) {
      console.log("🔧 Creating default profile...");
      await Profile.create({
        name: "Shubham Rajurpalle",
        title: "Android & Full Stack Developer",
        bio: "Mobile-first engineer specializing in Android and React Native development.",
        location: "Nanded, Maharashtra, India",
        contact: {
          email: "rajurpalleshubham1802@gmail.com",
          linkedin: "https://linkedin.com/in/shubham-rajurpalle",
          github: "https://github.com/Shubham-Rajurpalle",
          phone: "+91-9834583910",
        },
        resume: {
          url: "/static/Software_engineer_shubham_rajurpalle.pdf",
          filename: "Software_engineer_shubham_rajurpalle.pdf",
          uploadedAt: new Date(),
        },
        skills: ["Android", "Kotlin", "React Native", "Firebase", "Node.js"],
        experience: [],
        education: [],
        achievements: [],
        stats: {
          gfgProblems: "460+",
          maxRating: "1532",
          rank: "Top 50",
          youtubeSubscribers: "250K+",
        },
      });
    }

    // Check if projects exist
    const projectCount = await Project.countDocuments();
    if (projectCount === 0) {
      console.log("🔧 Creating default projects...");
      await Project.create([
        {
          title: "CricXone",
          slug: "cricxone",
          role: "Application Developer",
          short:
            "Real-Time Cricket Fan Engagement App with live scores and chat",
          tech: ["Android", "Kotlin", "Firebase", "Coroutines"],
          highlights: [
            "Optimized RecyclerView with DiffUtil, reducing API calls by 30%",
            "Built custom chat and moderation system",
          ],
          cover: "/static/fallback-hero.png",
          demo: {
            type: "appetize",
            url: "https://appetize.io/app/b_inc3wwr2nmcjpzqivlnpkzrl64",
          },
          repo: "https://github.com/Shubham-Rajurpalle/Cric",
          featured: true,
          duration: "May 2024 - May 2025",
        },
      ]);
    }

    console.log("✅ Default data initialization complete");
  } catch (error) {
    console.error("❌ Error initializing default data:", error);
  }
}

// Connect to MongoDB
connectToMongoDB();

// Routes

// Root route for testing
app.get("/", (req, res) => {
  res.json({
    message: "🚀 DevFolio API is running!",
    status: "OK",
    timestamp: new Date().toISOString(),
    endpoints: {
      profile: "/api/profile",
      projects: "/api/projects",
      contact: "/api/contact",
      resume: "/api/resume/download",
      health: "/api/health",
    },
  });
});

// GET Profile
app.get("/api/profile", async (req, res) => {
  try {
    console.log("📋 Fetching profile...");
    const profile = await Profile.findOne();

    if (!profile) {
      console.log("❌ Profile not found in database");
      return res.status(404).json({
        error: "Profile not found",
        message: "No profile data exists in the database",
      });
    }

    console.log("✅ Profile found and sent");
    res.json(profile);
  } catch (error) {
    console.error("❌ Error fetching profile:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// GET all projects
app.get("/api/projects", async (req, res) => {
  try {
    console.log("📂 Fetching projects...");
    const { featured } = req.query;
    let query = {};

    if (featured === "true") {
      query.featured = true;
      console.log("🌟 Filtering for featured projects only");
    }

    const projects = await Project.find(query);
    console.log(`✅ Found ${projects.length} projects`);

    res.json(projects);
  } catch (error) {
    console.error("❌ Error fetching projects:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// GET project by slug
app.get("/api/projects/:slug", async (req, res) => {
  try {
    console.log(`📄 Fetching project with slug: ${req.params.slug}`);
    const project = await Project.findOne({ slug: req.params.slug });

    if (!project) {
      console.log(`❌ Project with slug '${req.params.slug}' not found`);
      return res.status(404).json({
        error: "Project not found",
        slug: req.params.slug,
      });
    }

    console.log(`✅ Project '${req.params.slug}' found and sent`);
    res.json(project);
  } catch (error) {
    console.error("❌ Error fetching project:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// POST contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    console.log("📧 Processing contact form submission...");

    // Validate required fields
    if (!name || !email || !message) {
      console.log(
        "❌ Contact form validation failed - missing required fields"
      );
      return res.status(400).json({
        error: "Name, email, and message are required",
      });
    }

    // Log contact form submission
    const contactData = {
      name,
      email,
      subject: subject || "No subject",
      message,
      timestamp: new Date().toISOString(),
    };

    console.log("✅ New contact form submission:", contactData);

    res.json({
      success: true,
      message: "Thank you for your message! I'll get back to you soon.",
    });
  } catch (error) {
    console.error("❌ Error processing contact form:", error);
    res.status(500).json({
      error: "Internal server error",
      details: error.message,
    });
  }
});

// GET resume download
app.get("/api/resume/download", async (req, res) => {
  try {
    console.log("📄 Processing resume download request...");

    const profile = await Profile.findOne();
    if (!profile || !profile.resume || !profile.resume.url) {
      console.log("❌ Resume not found in database");
      return res.status(404).json({
        error: "Resume not found in database",
        message: "No resume URL found in profile data",
      });
    }

    // Try different possible paths for the resume on Render
    const possiblePaths = [
      path.join(
        __dirname,
        "public",
        "Software_engineer_shubham_rajurpalle.pdf"
      ),
      path.join(__dirname, "Software_engineer_shubham_rajurpalle.pdf"),
      path.join(
        __dirname,
        "public",
        profile.resume.url.replace("/static/", "")
      ),
      path.join(__dirname, profile.resume.url.replace("/static", "public")),
    ];

    let resumePath = null;
    const fs = await import("fs");

    for (const testPath of possiblePaths) {
      console.log(`🔍 Checking path: ${testPath}`);
      if (fs.existsSync(testPath)) {
        resumePath = testPath;
        console.log(`✅ Resume found at: ${resumePath}`);
        break;
      }
    }

    // If file found on backend, serve it
    if (resumePath) {
      res.download(resumePath, profile.resume.filename, (err) => {
        if (err) {
          console.error("❌ Error downloading resume:", err);
          // Fallback to frontend if backend download fails
          const frontendResumeUrl = `${
            process.env.FRONTEND_URL || "https://devfolio-six-omega.vercel.app"
          }/Software_engineer_shubham_rajurpalle.pdf`;
          console.log(
            `🔄 Backend download failed, redirecting to: ${frontendResumeUrl}`
          );
          res.redirect(frontendResumeUrl);
        } else {
          console.log("✅ Resume downloaded successfully from backend");
        }
      });
      return;
    }

    // If not found on backend, redirect to frontend
    console.log("❌ Resume file not found on backend, redirecting to frontend");
    const frontendResumeUrl = `${
      process.env.FRONTEND_URL || "https://devfolio-six-omega.vercel.app"
    }/Software_engineer_shubham_rajurpalle.pdf`;
    console.log(`🔗 Redirecting to frontend: ${frontendResumeUrl}`);

    res.redirect(frontendResumeUrl);
  } catch (error) {
    console.error("❌ Error fetching resume:", error);

    // Final fallback - redirect to frontend
    const frontendResumeUrl = `${
      process.env.FRONTEND_URL || "https://devfolio-six-omega.vercel.app"
    }/Software_engineer_shubham_rajurpalle.pdf`;
    console.log(
      `🔄 Server error, redirecting to frontend: ${frontendResumeUrl}`
    );
    res.redirect(frontendResumeUrl);
  }
});

// Health check route
app.get("/api/health", (req, res) => {
  const healthData = {
    status: "OK",
    message: "DevFolio API is running!",
    timestamp: new Date().toISOString(),
    mongodb:
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected",
    uptime: process.uptime(),
  };

  console.log("💚 Health check requested - All systems operational");
  res.json(healthData);
});

// 404 handler for API routes
app.use("/api/*", (req, res) => {
  console.log(`❌ API route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    error: "API route not found",
    method: req.method,
    path: req.url,
    availableRoutes: [
      "GET /api/health",
      "GET /api/profile",
      "GET /api/projects",
      "GET /api/projects/:slug",
      "POST /api/contact",
      "GET /api/resume/download",
    ],
  });
});

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error("❌ Global error handler:", err);
  res.status(500).json({
    error: "Something went wrong!",
    details: err.message,
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`🚀 DevFolio API server running on port ${PORT}`);

  // Show different URLs based on environment
  if (process.env.NODE_ENV === "production") {
    const renderUrl =
      process.env.RENDER_EXTERNAL_URL || `https://your-render-app.onrender.com`;
    console.log(`📍 Health check: ${renderUrl}/api/health`);
    console.log(`📄 Resume download: ${renderUrl}/api/resume/download`);
    console.log(`🌐 Root endpoint: ${renderUrl}/`);
  } else {
    console.log(`📍 Health check: http://localhost:${PORT}/api/health`);
    console.log(
      `📄 Resume download: http://localhost:${PORT}/api/resume/download`
    );
    console.log(`🌐 Root endpoint: http://localhost:${PORT}/`);
  }

  console.log(
    `📊 MongoDB status: ${
      mongoose.connection.readyState === 1 ? "Connected" : "Disconnected"
    }`
  );
});

// Graceful shutdown
process.on("SIGINT", async () => {
  console.log("\n📴 Received SIGINT. Shutting down gracefully...");
  await mongoose.connection.close();
  process.exit(0);
});
