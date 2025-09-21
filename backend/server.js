import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import Project from "./models/Project.js"; // ✅ new import

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ---- MongoDB ----
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ---- Routes ----
app.get("/api/projects", async (_req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.get("/api/projects/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
