import Tilt from "react-parallax-tilt";
import { motion } from "framer-motion";
import {
  ExternalLink,
  Github,
  Play,
  Star,
  Calendar,
  Code2,
} from "lucide-react";
import type { Project } from "../lib/types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ y: -8 }}
      className="w-full max-w-sm cursor-pointer group relative"
      onClick={onClick}
    >
      <Tilt
        tiltMaxAngleX={8}
        tiltMaxAngleY={8}
        glareEnable
        glareColor="rgba(6,182,212,0.2)"
        glareMaxOpacity={0.3}
        glarePosition="all"
        scale={1.02}
        className="h-full"
      >
        <div className="glass p-6 hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 h-full flex flex-col group-hover:border-cyan-400/30 rounded-2xl border border-white/10 relative overflow-hidden">
          {/* Background gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />

          {/* Project Image with enhanced overlay */}
          <div className="relative overflow-hidden rounded-xl mb-6 z-10">
            <div className="relative group/image">
              <img
                src={project.cover}
                className="w-full h-48 object-cover transition-all duration-700 group-hover:scale-110"
                alt={project.title}
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/fallback-hero.png";
                }}
              />

              {/* Image overlay with play button */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <motion.div
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center border border-white/30"
                  initial={{ scale: 0, rotate: -180 }}
                  whileHover={{ scale: 1, rotate: 0 }}
                  whileInView={{ scale: 0.8 }}
                  transition={{ duration: 0.3 }}
                >
                  <Play size={24} className="text-white ml-1" />
                </motion.div>
              </div>

              {/* Corner badge */}
              {project.role && (
                <div className="absolute top-3 left-3 px-3 py-1 bg-black/70 backdrop-blur-sm text-cyan-400 text-xs font-semibold rounded-full border border-cyan-400/50">
                  {project.role}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          <div className="flex-1 flex flex-col relative z-10">
            {/* Header */}
            <div className="mb-4">
              <div className="flex items-start justify-between mb-2">
                <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300 line-clamp-2">
                  {project.title}
                </h3>
                <div className="flex items-center gap-1 text-yellow-400 ml-2 flex-shrink-0">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-medium">New</span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-slate-300 leading-relaxed line-clamp-3 mb-4 flex-1 group-hover:text-slate-200 transition-colors duration-300">
              {project.short}
            </p>

            {/* Duration */}
            {project.duration && (
              <div className="flex items-center gap-2 text-slate-400 text-sm mb-4 group-hover:text-slate-300 transition-colors duration-300">
                <Calendar size={14} />
                <span>{project.duration}</span>
              </div>
            )}

            {/* Tech Stack with improved styling */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <Code2 size={16} className="text-slate-400" />
                <span className="text-slate-400 text-sm font-medium">
                  Tech Stack
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tech.slice(0, 4).map((tech, index) => (
                  <motion.span
                    key={tech}
                    className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 text-cyan-300 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30 transition-all duration-200 font-medium"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    {tech}
                  </motion.span>
                ))}
                {project.tech.length > 4 && (
                  <motion.span
                    className="text-xs px-3 py-1.5 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/20 border border-purple-400/30 text-purple-300 font-semibold"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.05, y: -1 }}
                  >
                    +{project.tech.length - 4} more
                  </motion.span>
                )}
              </div>
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex gap-3 mt-auto">
              {project.demo?.url && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (project.demo.type === "appetize") {
                      window.open(project.demo.url, "_blank");
                    } else {
                      onClick?.();
                    }
                  }}
                  className="group/btn flex items-center gap-2 px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-semibold hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 hover:scale-105 active:scale-95 flex-1 justify-center shadow-lg shadow-cyan-500/25 hover:shadow-cyan-500/40"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300">
                    <ExternalLink size={12} />
                  </div>
                  <span>Demo</span>
                </motion.button>
              )}

              {project.repo && (
                <motion.button
                  onClick={(e) => {
                    e.stopPropagation();
                    window.open(project.repo, "_blank");
                  }}
                  className="group/btn flex items-center gap-2 px-4 py-3 rounded-xl glass border border-white/20 text-white hover:bg-white/20 hover:border-white/40 transition-all duration-300 hover:scale-105 active:scale-95 flex-1 justify-center font-semibold"
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-5 h-5 bg-white/20 rounded-md flex items-center justify-center group-hover/btn:scale-110 transition-transform duration-300">
                    <Github size={12} />
                  </div>
                  <span>Code</span>
                </motion.button>
              )}
            </div>
          </div>

          {/* Hover glow effect */}
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/5 to-blue-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Corner decoration */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
        </div>
      </Tilt>
    </motion.div>
  );
}
