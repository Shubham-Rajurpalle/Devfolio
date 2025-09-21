import express from "express";
import Project from "../models/Project.js";

const router = express.Router();

// GET all projects
router.get("/", async (_req, res) => {
  const projects = await Project.find();
  res.json(projects);
});

// GET project by slug
router.get("/:slug", async (req, res) => {
  const project = await Project.findOne({ slug: req.params.slug });
  if (!project) return res.status(404).json({ error: "Not found" });
  res.json(project);
});

export default router;
