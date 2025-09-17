import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json());

// ---- MongoDB ----
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// ---- Models & Routes ----
const DemoSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["appetize", "snack", "youtube", "none"],
    required: true,
  },
  url: String,
});

const ProjectSchema = new mongoose.Schema({
  title: String,
  slug: String,
  role: String,
  short: String,
  tech: [String],
  highlights: [String],
  cover: String,
  demo: DemoSchema,
  repo: String,
  featured: Boolean,
});

const Project = mongoose.model("Project", ProjectSchema);

app.get("/api/projects", async (_req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

app.get("/api/projects/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

// ---- Serve Frontend ----
app.use(express.static(path.join(__dirname, "dist")));
app.get("*", (_req, res) =>
  res.sendFile(path.join(__dirname, "dist", "index.html"))
);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
