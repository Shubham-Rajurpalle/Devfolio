import { motion, type Variants, cubicBezier } from "framer-motion";
import { useEffect, useState } from "react";
import {
  MapPin,
  GraduationCap,
  Award,
  Code,
  Star,
  Briefcase,
  Trophy,
  Target,
} from "lucide-react";
import { getProfile } from "../lib/api";
import type { Profile } from "../lib/types";

export default function About() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  if (!profile) return null;

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.43, 0.13, 0.23, 0.96] },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 3,
        repeat: Infinity,
        ease: [0.43, 0.13, 0.23, 0.96],
      },
    },
  };

  return (
    <section className="mt-20 py-16 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 rounded-3xl" />
      <div className="absolute top-20 left-20 w-32 h-32 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-40 h-40 bg-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 left-10 w-24 h-24 bg-purple-400/10 rounded-full blur-2xl animate-pulse delay-500" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <motion.h2
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          About Me
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 mx-auto mb-6 rounded-full" />
        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
          Passionate developer with expertise in mobile and web technologies,
          creating innovative solutions that bridge design and functionality
        </p>
      </motion.div>

      <motion.div
        className="grid lg:grid-cols-2 gap-16 relative z-10"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {/* Left Side - Bio and Stats */}
        <motion.div className="space-y-8" variants={itemVariants}>
          {/* Bio Section */}
          <motion.div
            className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 border border-white/10 group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-white" size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1 group-hover:text-cyan-400 transition-colors duration-300">
                  Based in {profile.location}
                </h3>
                <p className="text-slate-400">Full-time Developer</p>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed text-lg">
              {profile.bio}
            </p>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-6">
            <motion.div
              className="glass p-6 rounded-2xl text-center hover:shadow-2xl hover:shadow-green-400/20 transition-all duration-500 border border-white/10 group"
              variants={floatingVariants}
              animate="animate"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <Code className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-green-400 transition-colors duration-300">
                {profile.stats.gfgProblems}
              </div>
              <div className="text-slate-400 font-medium">DSA Problems</div>
              <div className="text-slate-500 text-sm mt-1">GeeksforGeeks</div>
            </motion.div>

            <motion.div
              className="glass p-6 rounded-2xl text-center hover:shadow-2xl hover:shadow-yellow-400/20 transition-all duration-500 border border-white/10 group"
              variants={floatingVariants}
              animate="animate"
              style={{ animationDelay: "1s" }}
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:rotate-6 transition-transform duration-300">
                <Star className="text-white" size={28} />
              </div>
              <div className="text-3xl font-bold text-white mb-2 group-hover:text-yellow-400 transition-colors duration-300">
                {profile.stats.maxRating}
              </div>
              <div className="text-slate-400 font-medium">Max Rating</div>
              <div className="text-slate-500 text-sm mt-1">Competitive</div>
            </motion.div>
          </div>

          {/* YouTube Achievement */}
          <motion.div
            className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-red-400/20 transition-all duration-500 border border-white/10 group"
            variants={itemVariants}
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-start gap-6 mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-red-500/25">
                <span className="text-white font-bold text-2xl">▶</span>
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                  Story Network
                </h3>
                <p className="text-red-400 font-semibold text-lg mb-2">
                  {profile.stats.youtubeSubscribers} Subscribers
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <div className="flex items-center gap-2 text-emerald-400">
                    <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
                    Active Channel
                  </div>
                  <span className="text-slate-400">Content Creator</span>
                </div>
              </div>
            </div>
            <p className="text-slate-300 leading-relaxed">
              Founded and scaled YouTube channel from scratch, managing creators
              and executing engagement-driven strategies, boosting viewership by
              40% through data-driven content optimization.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <span className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm">
                Strategy
              </span>
              <span className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm">
                Management
              </span>
              <span className="px-3 py-1 bg-red-500/20 border border-red-400/30 rounded-full text-red-300 text-sm">
                Growth
              </span>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side - Education, Experience, Skills */}
        <motion.div className="space-y-8" variants={itemVariants}>
          {/* Education */}
          <motion.div
            className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-500 border border-white/10 group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-indigo-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <GraduationCap className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors duration-300">
                Education
              </h3>
            </div>
            <div className="space-y-6">
              {profile.education.map((edu, index) => (
                <motion.div
                  key={index}
                  className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <h4 className="text-cyan-400 font-bold text-lg mb-1">
                    {edu.institution}
                  </h4>
                  <p className="text-white font-medium mb-2">{edu.degree}</p>
                  <div className="flex justify-between items-center text-slate-400">
                    <div className="flex items-center gap-2">
                      <Trophy size={14} />
                      <span>CGPA: {edu.cgpa}</span>
                    </div>
                    <span className="text-sm">{edu.year}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Experience */}
          {profile.experience.length > 0 && (
            <motion.div
              className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 border border-white/10 group"
              whileHover={{ scale: 1.02, y: -5 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <Briefcase className="text-white" size={28} />
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-purple-400 transition-colors duration-300">
                  Experience
                </h3>
              </div>
              <div className="space-y-6">
                {profile.experience.map((exp, index) => (
                  <motion.div
                    key={index}
                    className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="text-purple-400 font-bold text-lg">
                          {exp.role}
                        </h4>
                        <p className="text-white font-medium">{exp.company}</p>
                      </div>
                      <span className="text-slate-400 text-sm bg-white/10 px-2 py-1 rounded-full">
                        {exp.duration}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {exp.description.map((desc, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-3 text-slate-300"
                        >
                          <span className="text-purple-400 mt-1 text-lg">
                            •
                          </span>
                          <span className="leading-relaxed">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Achievements */}
          <motion.div
            className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-yellow-500/20 transition-all duration-500 border border-white/10 group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Award className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
                Achievements
              </h3>
            </div>
            <div className="space-y-3">
              {profile.achievements.map((achievement, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 p-3 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-white text-sm font-bold">★</span>
                  </div>
                  <span className="text-slate-300 leading-relaxed">
                    {achievement}
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Skills */}
          <motion.div
            className="glass p-8 rounded-2xl hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500 border border-white/10 group"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-400 to-teal-500 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Target className="text-white" size={28} />
              </div>
              <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors duration-300">
                Technical Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, index) => (
                <motion.span
                  key={index}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 
                           border border-cyan-400/30 rounded-full text-cyan-300 font-medium 
                           hover:scale-105 hover:bg-gradient-to-r hover:from-cyan-500/30 hover:to-blue-500/30
                           transition-all duration-200 cursor-default"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -2 }}
                >
                  {skill}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
