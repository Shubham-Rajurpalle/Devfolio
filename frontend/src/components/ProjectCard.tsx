import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import type { Project } from "../lib/types";

export default function ProjectCard({ p }: { p: Project }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className="max-w-md"
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareColor="rgba(255,255,255,0.15)" // softer white
        glareMaxOpacity={0.2}
        glarePosition="all"
        scale={1.02}
      >
        <div className="glass p-4 hover:shadow-xl hover:shadow-primary/20 transition-shadow duration-300">
          <img
            src={p.cover}
            className="rounded-lg w-full h-56 object-cover"
            alt={p.title}
          />
          <h3 className="mt-3 text-xl font-semibold">{p.title}</h3>
          <p className="text-slate-300 text-sm">{p.short}</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {p.tech.map((t) => (
              <span
                key={t}
                className="text-xs px-2 py-1 rounded-full bg-white/10 border border-white/10"
              >
                {t}
              </span>
            ))}
          </div>
          <div className="mt-3 flex gap-2">
            {p.demo?.url && (
              <a
                href={`/#/projects/${p.slug}`}
                className="px-3 py-1.5 rounded-lg bg-primary text-white text-sm"
              >
                Live Demo
              </a>
            )}
            {p.repo && (
              <a
                href={p.repo}
                className="px-3 py-1.5 rounded-lg bg-white/10 border border-white/10 text-sm"
                target="_blank"
              >
                GitHub
              </a>
            )}
          </div>
        </div>
      </Tilt>
    </motion.div>
  );
}
