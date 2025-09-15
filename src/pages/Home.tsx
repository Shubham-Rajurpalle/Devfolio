import { useEffect, useState } from "react";
import Header from "../components/Header"; // ✅ Import Header
import Hero3D from "../components/Hero3D";
import ProjectCard from "../components/ProjectCard";
import { getProjects } from "../lib/api";
import type { Project } from "../lib/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    getProjects().then(setProjects);
  }, []);

  const featured = projects.filter((p) => p.featured);

  return (
    <>
      {/* Header always at top */}
      <Header />

      {/* Main content starts below header */}
      <main className="max-w-6xl mx-auto px-4 pt-20 pb-8">
        {/* Hero Section */}
        <Hero3D />

        {/* Featured Projects */}
        <section id="projects" className="mt-16">
          <h2 className="text-3xl font-bold mb-6 text-center md:text-left">
            Featured Projects
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((p) => (
              <ProjectCard key={p.slug} p={p} />
            ))}
          </div>
        </section>
      </main>
    </>
  );
}
