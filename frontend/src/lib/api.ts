import axios from "axios";
import type { Project } from "./types";

const api = axios.create({ baseURL: import.meta.env.VITE_API_BASE || "" });

export async function getProjects(): Promise<Project[]> {
  try {
    const { data } = await api.get("/api/projects");
    return Array.isArray(data) ? data : [];
  } catch {
    // fallback example
    return [
      {
        title: "CricXone",
        slug: "cricxone",
        role: "Application Developer",
        short: "Real-time cricket fan engagement app",
        tech: ["Android", "Firebase", "React Native"],
        highlights: [
          "Reduced API calls by 30%",
          "Built chat + moderation system",
        ],
        cover: "/fallback-hero.png",
        demo: { type: "appetize", url: "https://appetize.io/embed/APP_ID" },
        repo: "https://github.com/Shubham-Rajurpalle/CricXone",
        featured: true,
      },
    ];
  }
}
