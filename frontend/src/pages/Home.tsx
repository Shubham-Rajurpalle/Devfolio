import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Calendar, MapPin, Award, Code, Briefcase, GraduationCap, Star, ExternalLink, Target, Trophy, Globe, User } from "lucide-react";
import Header from "../components/Header";
import Hero3D from "../components/Hero3D";
import ProjectCard from "../components/ProjectCard";
import Contact from "../components/Contact";
import DemoEmbed from "../components/DemoEmbed";
import { getProjects, getProjectBySlug } from "../lib/api";
import type { Project } from "../lib/types";

export default function Home() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [showProjectDetail, setShowProjectDetail] = useState(false);

  useEffect(() => {
    getProjects().then((fetchedProjects) => {
      console.log("Fetched projects:", fetchedProjects);
      setProjects(fetchedProjects);
    });
  }, []);

  const handleProjectClick = async (project: Project) => {
    const fullProject = await getProjectBySlug(project.slug);
    if (fullProject) {
      setSelectedProject(fullProject);
      setShowProjectDetail(true);
    }
  };

  const closeProjectDetail = () => {
    setShowProjectDetail(false);
    setSelectedProject(null);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  const sectionVariants: Variants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.43, 0.13, 0.23, 0.96] }
    }
  };

  return (
    <>
      <Header />

      {/* Enhanced Project Detail Modal */}
      {showProjectDetail && selectedProject && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 overflow-y-auto"
          onClick={closeProjectDetail}
        >
          <div className="min-h-screen px-4 py-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 50 }}
              className="max-w-6xl mx-auto glass p-10 border border-white/20 rounded-3xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10 rounded-3xl" />

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="flex-1">
                    <motion.h2
                      className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent mb-4"
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                    >
                      {selectedProject.title}
                    </motion.h2>
                    {selectedProject.role && (
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <User size={16} className="text-white" />
                        </div>
                        <p className="text-cyan-400 text-xl font-semibold">
                          {selectedProject.role}
                        </p>
                      </div>
                    )}
                    {selectedProject.duration && (
                      <p className="text-slate-400 flex items-center gap-2 text-lg">
                        <Calendar size={18} />
                        {selectedProject.duration}
                      </p>
                    )}
                  </div>
                  <motion.button
                    onClick={closeProjectDetail}
                    className="w-12 h-12 bg-white/10 hover:bg-white/20 rounded-xl border border-white/20 flex items-center justify-center text-slate-400 hover:text-white transition-all duration-300 hover:scale-110"
                    whileHover={{ rotate: 90 }}
                  >
                    <span className="text-2xl font-light">×</span>
                  </motion.button>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                  <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative group mb-8">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <img
                        src={selectedProject.cover}
                        alt={selectedProject.title}
                        className="relative w-full rounded-2xl transition-transform duration-500 group-hover:scale-[1.02] border border-white/10"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            "/fallback-hero.png";
                        }}
                      />
                    </div>

                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-lg flex items-center justify-center">
                          <Star size={16} className="text-white" />
                        </div>
                        Description
                      </h3>
                      <p className="text-slate-300 leading-relaxed text-lg">
                        {selectedProject.description || selectedProject.short}
                      </p>
                    </div>

                    <div className="mb-8">
                      <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-lg flex items-center justify-center">
                          <Code size={16} className="text-white" />
                        </div>
                        Technologies
                      </h3>
                      <div className="flex flex-wrap gap-3">
                        {selectedProject.tech.map((tech, index) => (
                          <motion.span
                            key={tech}
                            className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border border-cyan-400/30 rounded-full text-cyan-300 font-medium hover:scale-105 transition-transform duration-200"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.05 }}
                          >
                            {tech}
                          </motion.span>
                        ))}
                      </div>
                    </div>

                    {selectedProject.highlights &&
                      selectedProject.highlights.length > 0 && (
                        <div className="mb-8">
                          <h3 className="text-2xl font-semibold text-white mb-4 flex items-center gap-3">
                            <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-lg flex items-center justify-center">
                              <Award size={16} className="text-white" />
                            </div>
                            Key Highlights
                          </h3>
                          <ul className="space-y-3">
                            {selectedProject.highlights.map(
                              (highlight, index) => (
                                <motion.li
                                  key={index}
                                  className="flex items-start gap-4 text-slate-300 text-lg p-3 bg-white/5 rounded-xl border border-white/10"
                                  initial={{ opacity: 0, x: -20 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: index * 0.1 }}
                                >
                                  <div className="w-6 h-6 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                                    <span className="text-white text-xs font-bold">
                                      ✓
                                    </span>
                                  </div>
                                  <span>{highlight}</span>
                                </motion.li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    <div className="flex gap-4">
                      {selectedProject.repo && (
                        <motion.a
                          href={selectedProject.repo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 glass border border-white/20 text-white rounded-xl hover:bg-white/20 hover:scale-105 transition-all duration-200 font-semibold flex items-center gap-2"
                          whileHover={{ y: -2 }}
                        >
                          <Code size={18} />
                          View Code
                        </motion.a>
                      )}
                      {selectedProject.liveUrl && (
                        <motion.a
                          href={selectedProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-xl hover:scale-105 transition-all duration-200 font-semibold shadow-lg shadow-cyan-500/25 flex items-center gap-2"
                          whileHover={{ y: -2 }}
                        >
                          <ExternalLink size={18} />
                          Live Project
                        </motion.a>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="text-2xl font-semibold text-white mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-green-500 rounded-lg flex items-center justify-center">
                        <Target size={16} className="text-white" />
                      </div>
                      Live Demo
                    </h3>
                    <div className="rounded-2xl overflow-hidden shadow-2xl">
                      <DemoEmbed
                        type={selectedProject.demo?.type || "appetize"}
                        url={selectedProject.demo?.url || ""}
                      />
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      <main className="w-full px-0 pt-24 pb-8">
        {/* Hero Section */}
        <Hero3D />

        {/* Featured Projects Section */}
        <section id="projects" className="mt-32 py-20 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 rounded-3xl" />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
              Featured Projects
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Explore my latest creations in mobile and web development,
              showcasing innovative solutions and cutting-edge technologies
            </p>
          </motion.div>

        <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="max-w-6xl mx-auto relative z-10"
            >
              {/* First row: 3 projects */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 justify-items-center mb-6">
                {projects.slice(0, 3).map((project) => (
                  <motion.div key={project.slug} variants={itemVariants}>
                    <ProjectCard
                      project={project}
                      onClick={() => handleProjectClick(project)}
                    />
                  </motion.div>
                ))}
              </div>
              
              {/* Second row: 2 projects centered */}
              <div className="flex justify-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl">
                  {projects.slice(3, 6).map((project) => (
                    <motion.div key={project.slug} variants={itemVariants}>
                      <ProjectCard
                        project={project}
                        onClick={() => handleProjectClick(project)}
                      />
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
        </section>

        {/* Education Section */}
        <section id="education" className="mt-32 py-20 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 via-transparent to-teal-500/5 rounded-3xl" />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-500 to-cyan-400 bg-clip-text text-transparent mb-6">
              Education Journey
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-emerald-400 to-teal-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Academic foundation and continuous learning that shaped my
              technical expertise and problem-solving capabilities
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-3 gap-8"
            >
              {/* Bachelor's Degree */}
              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-emerald-500/20 transition-all duration-500 border border-white/10 group-hover:border-emerald-400/30 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-emerald-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-emerald-500/25">
                      <GraduationCap size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300">
                        B.Tech CSE
                      </h3>
                      <p className="text-emerald-400 font-semibold text-lg">
                        Computer Science & Engineering
                      </p>
                      <p className="text-slate-400 flex items-center gap-2 mt-2">
                        <Calendar size={16} />
                        2022 - 2026
                      </p>
                      <p className="text-slate-400 flex items-center gap-2 mt-1">
                        <MapPin size={16} />
                        SGGSIE&T, Nanded
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "CGPA: 8.65/10", icon: "🎯" },
                      {
                        label: "Specialized in Mobile Development",
                        icon: "📱",
                      },
                      { label: "Active in Hackathons", icon: "🏆" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-slate-300">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 12th Grade */}
              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-teal-500/20 transition-all duration-500 border border-white/10 group-hover:border-teal-400/30 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-teal-400 to-cyan-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-teal-500/25">
                      <Award size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-teal-400 transition-colors duration-300">
                        12th Grade
                      </h3>
                      <p className="text-teal-400 font-semibold text-lg">
                        Science Stream
                      </p>
                      <p className="text-slate-400 flex items-center gap-2 mt-2">
                        <Calendar size={16} />
                        2020 - 2021
                      </p>
                      <p className="text-slate-400 flex items-center gap-2 mt-1">
                        <MapPin size={16} />
                        Vidhyadham Prashala, Pune
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Percentage: 84.83%", icon: "📊" },
                      { label: "PCM Stream", icon: "🔬" },
                      { label: "Strong Foundation", icon: "💪" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-slate-300">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>

              {/* 10th Grade */}
              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 border border-white/10 group-hover:border-cyan-400/30 h-full">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/25">
                      <Star size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                        10th Grade
                      </h3>
                      <p className="text-cyan-400 font-semibold text-lg">
                        Secondary School
                      </p>
                      <p className="text-slate-400 flex items-center gap-2 mt-2">
                        <Calendar size={16} />
                        2018 - 2019
                      </p>
                      <p className="text-slate-400 flex items-center gap-2 mt-1">
                        <MapPin size={16} />
                        S.S.R.B Gujar Prashala, Pune
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    {[
                      { label: "Percentage: 92%", icon: "⭐" },
                      { label: "School Topper", icon: "🥇" },
                      { label: "Academic Excellence", icon: "🎓" },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center gap-3 p-2 bg-white/5 rounded-lg border border-white/10"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <span className="text-lg">{item.icon}</span>
                        <span className="text-slate-300">{item.label}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="mt-32 py-20 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 via-transparent to-pink-500/5 rounded-3xl" />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-pink-500 to-red-400 bg-clip-text text-transparent mb-6">
              Professional Experience
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-pink-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Building innovative solutions and gaining valuable industry
              experience through meaningful projects and collaborations
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto relative z-10">
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-purple-400 via-pink-500 to-transparent hidden md:block" />

            <div className="space-y-12">
              {/* OrderHub Experience */}
              <motion.div
                variants={itemVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                className="relative glass p-8 ml-0 md:ml-16 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-white/10 group"
              >
                <div className="absolute -left-4 top-8 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full border-4 border-slate-900 hidden md:block group-hover:scale-125 transition-transform duration-300 shadow-lg shadow-purple-500/50" />
                <div className="flex items-start gap-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                    <Briefcase size={28} className="text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-purple-400 transition-colors duration-300">
                      React Native Developer
                    </h3>
                    <p className="text-purple-400 font-semibold text-lg mb-2">
                      OrderHub - Ecommerce Store Management
                    </p>
                    <p className="text-slate-400 flex items-center gap-2 mb-6">
                      <Calendar size={16} />
                      Dec 2024 - Jan 2025
                    </p>
                    <div className="grid gap-4">
                      {[
                        "Collaborated with stakeholders to define app flows and create user journeys through detailed Figma wireframes",
                        "Designed intuitive UI screens following Google's Material Design system for cross-platform consistency",
                        "Planned multi-channel order management (WhatsApp, Telegram), PhonePe payment verification, and real-time updates",
                        "Focused on designing scalable flows, taking inspiration from distributed system concepts",
                      ].map((desc, index) => (
                        <motion.div
                          key={index}
                          className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors duration-300"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="w-6 h-6 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <span className="text-white text-xs font-bold">
                              ✓
                            </span>
                          </div>
                          <span className="text-slate-300">{desc}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Leadership Section */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <h3 className="text-3xl font-bold text-white mb-8 text-center">
                Leadership & Initiative
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {/* YouTube Channel */}
                <motion.div
                  variants={itemVariants}
                  className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-red-400/20 transition-all duration-500 border border-white/10 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/25">
                      <span className="text-white font-bold text-2xl">▶</span>
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                        Founder, YouTube Channel
                      </h4>
                      <p className="text-red-400 font-semibold">
                        "Story Network" (250K+ Subscribers)
                      </p>
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed">
                    Scaled channel from scratch by managing creators and
                    executing engagement-driven strategies, boosting viewership
                    by 40%
                  </p>
                  <div className="mt-4 flex items-center gap-4 text-sm">
                    <div className="flex items-center gap-2 text-red-400">
                      <Globe size={16} />
                      <span>250K+ Reach</span>
                    </div>
                    <div className="flex items-center gap-2 text-orange-400">
                      <Trophy size={16} />
                      <span>40% Growth</span>
                    </div>
                  </div>
                </motion.div>

                {/* Team Leadership */}
                <motion.div
                  variants={itemVariants}
                  className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 border border-white/10 group"
                >
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-yellow-500/25">
                      <Award size={28} className="text-white" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                        Team Lead - National Hackathons
                      </h4>
                      <p className="text-yellow-400 font-semibold">
                        Multiple Wins (2025)
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <motion.div
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">🥈</span>
                      </div>
                      <span className="text-slate-300">
                        JobIt - AI job prep app, 1st Runner-Up at Hackspectra
                        (50+ teams)
                      </span>
                    </motion.div>
                    <motion.div
                      className="flex items-start gap-3 p-3 bg-white/5 rounded-xl border border-white/10"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      <div className="w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <span className="text-white text-xs font-bold">🥈</span>
                      </div>
                      <span className="text-slate-300">
                        CampusCore - College management app, 1st Runner-Up at
                        Hack Fusion (100+ teams)
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Problem Solving Skills Section */}
        <section id="skills" className="mt-32 py-20 scroll-mt-20 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 via-transparent to-blue-500/5 rounded-3xl" />

          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="text-center mb-16 relative z-10"
          >
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6">
              Problem Solving Excellence
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-green-400 to-blue-500 mx-auto mb-6 rounded-full" />
            <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
              Competitive programming achievements and technical expertise
              across multiple platforms, demonstrating consistent
              problem-solving capabilities
            </p>
          </motion.div>

          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16"
            >
              {/* Statistics Cards */}
              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl text-center hover:shadow-2xl hover:shadow-green-400/20 transition-all duration-500 border border-white/10 group-hover:border-green-400/30 group-hover:scale-105">
                  <div className="w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-green-500/25">
                    <span className="text-3xl font-bold text-white">G</span>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-green-400 transition-colors duration-300">
                    GeeksforGeeks
                  </h3>
                  <p className="text-4xl font-bold text-green-400 mb-2">460+</p>
                  <p className="text-slate-400">Problems Solved</p>
                  <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "85%" }}
                      transition={{ duration: 1.5, delay: 0.5 }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl text-center hover:shadow-2xl hover:shadow-blue-400/20 transition-all duration-500 border border-white/10 group-hover:border-blue-400/30 group-hover:scale-105">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-blue-500/25">
                    <Star size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    Max Rating
                  </h3>
                  <p className="text-4xl font-bold text-blue-400 mb-2">1532</p>
                  <p className="text-slate-400">Contest Rating</p>
                  <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "76%" }}
                      transition={{ duration: 1.5, delay: 0.7 }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl text-center hover:shadow-2xl hover:shadow-purple-400/20 transition-all duration-500 border border-white/10 group-hover:border-purple-400/30 group-hover:scale-105">
                  <div className="w-20 h-20 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-purple-500/25">
                    <Trophy size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-purple-400 transition-colors duration-300">
                    Institute Rank
                  </h3>
                  <p className="text-4xl font-bold text-purple-400 mb-2">
                    Top 50
                  </p>
                  <p className="text-slate-400">Global Ranking</p>
                  <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "95%" }}
                      transition={{ duration: 1.5, delay: 0.9 }}
                    />
                  </div>
                </div>
              </motion.div>

              <motion.div variants={itemVariants} className="group">
                <div className="glass p-8 rounded-2xl text-center hover:shadow-2xl hover:shadow-red-400/20 transition-all duration-500 border border-white/10 group-hover:border-red-400/30 group-hover:scale-105">
                  <div className="w-20 h-20 bg-gradient-to-br from-red-400 to-orange-500 rounded-2xl mx-auto mb-6 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg shadow-red-500/25">
                    <Globe size={32} className="text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3 group-hover:text-red-400 transition-colors duration-300">
                    YouTube
                  </h3>
                  <p className="text-4xl font-bold text-red-400 mb-2">250K+</p>
                  <p className="text-slate-400">Subscribers</p>
                  <div className="mt-3 w-full bg-slate-700 rounded-full h-2">
                    <motion.div
                      className="h-2 bg-gradient-to-r from-red-400 to-orange-500 rounded-full"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      transition={{ duration: 1.5, delay: 1.1 }}
                    />
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Technical Skills Grid */}
            <motion.div
              variants={sectionVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="mt-16"
            >
              <h3 className="text-3xl font-bold text-white mb-12 text-center">
                Technical Arsenal
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {[
                  {
                    name: "Kotlin",
                    color: "from-purple-400 to-violet-500",
                    icon: "K",
                  },
                  {
                    name: "Java",
                    color: "from-orange-400 to-red-500",
                    icon: "J",
                  },
                  {
                    name: "JavaScript",
                    color: "from-yellow-400 to-orange-500",
                    icon: "JS",
                  },
                  {
                    name: "C++",
                    color: "from-blue-400 to-indigo-500",
                    icon: "C++",
                  },
                  {
                    name: "Python",
                    color: "from-green-400 to-emerald-500",
                    icon: "PY",
                  },
                  {
                    name: "SQL",
                    color: "from-cyan-400 to-blue-500",
                    icon: "SQL",
                  },
                  {
                    name: "Android SDK",
                    color: "from-green-500 to-teal-500",
                    icon: "A",
                  },
                  {
                    name: "Jetpack Compose",
                    color: "from-blue-500 to-cyan-600",
                    icon: "JC",
                  },
                  {
                    name: "React Native",
                    color: "from-cyan-400 to-blue-600",
                    icon: "RN",
                  },
                  {
                    name: "React.js",
                    color: "from-cyan-400 to-blue-600",
                    icon: "R",
                  },
                  {
                    name: "Node.js",
                    color: "from-green-500 to-teal-500",
                    icon: "N",
                  },
                  {
                    name: "Firebase",
                    color: "from-yellow-500 to-orange-600",
                    icon: "F",
                  },
                  {
                    name: "MongoDB",
                    color: "from-green-600 to-emerald-600",
                    icon: "M",
                  },
                  {
                    name: "Git",
                    color: "from-orange-500 to-red-600",
                    icon: "G",
                  },
                  {
                    name: "Docker",
                    color: "from-blue-500 to-cyan-600",
                    icon: "D",
                  },
                  {
                    name: "Figma",
                    color: "from-purple-500 to-pink-600",
                    icon: "Fi",
                  },
                ].map((skill, index) => (
                  <motion.div
                    key={skill.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="glass p-4 rounded-xl text-center hover:shadow-xl hover:shadow-white/10 transition-all duration-500 border border-white/10 group-hover:scale-105 group-hover:border-white/20">
                      <div
                        className={`w-10 h-10 bg-gradient-to-r ${skill.color} rounded-lg mx-auto mb-2 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300 shadow-lg`}
                      >
                        <span className="text-white font-bold text-xs">
                          {skill.icon}
                        </span>
                      </div>
                      <p className="text-white font-medium text-sm group-hover:text-cyan-400 transition-colors duration-300">
                        {skill.name}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>

        {/* Contact Section */}
        <div id="contact" className="scroll-mt-20 mt-32">
          <Contact />
        </div>

        {/* Enhanced Footer */}
        <footer className="mt-32 py-16 border-t border-white/10 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/5 via-transparent to-purple-500/5" />
          <div className="max-w-6xl mx-auto px-4 relative z-10">
            <div className="text-center mb-12">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="mb-8"
              >
                <h3 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent mb-4">
                  Shubham.dev
                </h3>
                <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
                  Crafting digital experiences with passion, precision, and
                  innovation. Always eager to collaborate on exciting projects
                  and bring ideas to life.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                className="flex justify-center gap-8 mb-12"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {[
                  {
                    name: "LinkedIn",
                    url: "https://linkedin.com/in/shubham-rajurpalle",
                    color: "hover:text-blue-400",
                  },
                  {
                    name: "GitHub",
                    url: "https://github.com/Shubham-Rajurpalle",
                    color: "hover:text-gray-300",
                  },
                  {
                    name: "Email",
                    url: "mailto:rajurpalleshubham1802@gmail.com",
                    color: "hover:text-cyan-400",
                  },
                  { name: "YouTube", url: "#", color: "hover:text-red-400" },
                ].map((link) => (
                  <motion.a
                    key={link.name}
                    href={link.url}
                    target={link.name !== "Email" ? "_blank" : undefined}
                    rel={
                      link.name !== "Email" ? "noopener noreferrer" : undefined
                    }
                    className={`text-slate-400 ${link.color} transition-colors duration-300 font-medium text-lg`}
                    whileHover={{ scale: 1.1, y: -2 }}
                  >
                    {link.name}
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Bottom Section */}
            <div className="border-t border-white/10 pt-8">
              <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                <motion.p
                  className="text-slate-400 text-center md:text-left"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  © 2024 Shubham Rajurpalle. Built with React, TypeScript &
                  Framer Motion.
                </motion.p>
                <motion.div
                  className="flex items-center gap-2 text-slate-500"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ delay: 0.6 }}
                >
                  <span>Designed and developed with</span>
                  <motion.span
                    className="text-red-400 text-lg"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                  >
                    ❤️
                  </motion.span>
                  <span>in India</span>
                </motion.div>
              </div>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}