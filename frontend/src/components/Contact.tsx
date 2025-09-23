import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { Mail, Phone, MapPin, Linkedin, Github, Send, MessageSquare, ExternalLink } from "lucide-react";
import { getProfile } from "../lib/api";
import type { Profile } from "../lib/types";

export default function Contact() {
  const [profile, setProfile] = useState<Profile | null>(null);

  useEffect(() => {
    getProfile().then(setProfile);
  }, []);

  const contactMethods = profile?.contact
    ? [
        {
          icon: <Mail size={24} />,
          label: "Email",
          value: profile.contact.email,
          href: `mailto:${profile.contact.email}`,
          color: "text-cyan-400",
          bgColor: "bg-cyan-500/10 border-cyan-400/20",
          hoverColor: "hover:bg-cyan-500/20 hover:border-cyan-400/40",
          shadowColor: "hover:shadow-cyan-500/20",
          description: "Send me an email"
        },
        {
          icon: <Phone size={24} />,
          label: "Phone",
          value: profile.contact.phone,
          href: `tel:${profile.contact.phone}`,
          color: "text-green-400",
          bgColor: "bg-green-500/10 border-green-400/20",
          hoverColor: "hover:bg-green-500/20 hover:border-green-400/40",
          shadowColor: "hover:shadow-green-500/20",
          description: "Give me a call"
        },
        {
          icon: <Linkedin size={24} />,
          label: "LinkedIn",
          value: "Connect on LinkedIn",
          href: profile.contact.linkedin,
          color: "text-blue-400",
          bgColor: "bg-blue-500/10 border-blue-400/20",
          hoverColor: "hover:bg-blue-500/20 hover:border-blue-400/40",
          shadowColor: "hover:shadow-blue-500/20",
          description: "Professional network"
        },
        {
          icon: <Github size={24} />,
          label: "GitHub",
          value: "View on GitHub",
          href: profile.contact.github,
          color: "text-purple-400",
          bgColor: "bg-purple-500/10 border-purple-400/20",
          hoverColor: "hover:bg-purple-500/20 hover:border-purple-400/40",
          shadowColor: "hover:shadow-purple-500/20",
          description: "Check out my code"
        },
      ]
    : [];

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

  return (
    <section className="mt-20 py-20 relative overflow-hidden">
      {/* Enhanced Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-cyan-500/5 rounded-3xl" />
      <div className="absolute top-20 left-20 w-40 h-40 bg-cyan-400/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-20 w-32 h-32 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-10 w-28 h-28 bg-blue-400/10 rounded-full blur-2xl animate-pulse delay-500" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16 relative z-10"
      >
        <motion.h2 
          className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-purple-400 via-cyan-400 to-blue-500 bg-clip-text text-transparent mb-6"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          Get In Touch
        </motion.h2>
        <div className="w-24 h-1 bg-gradient-to-r from-purple-400 to-cyan-400 mx-auto mb-6 rounded-full" />
        <p className="text-slate-400 text-xl max-w-3xl mx-auto leading-relaxed">
          I'm always open to discussing new opportunities, exciting projects, 
          and innovative collaborations. Let's create something amazing together!
        </p>
      </motion.div>

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Location Banner */}
        {profile?.location && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <motion.div 
              className="inline-flex items-center gap-4 px-8 py-4 glass border border-white/20 rounded-2xl group hover:shadow-xl hover:shadow-cyan-400/20 transition-all duration-300"
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <MapPin className="text-white" size={20} />
              </div>
              <div className="text-left">
                <p className="text-white font-semibold text-lg group-hover:text-cyan-400 transition-colors duration-300">
                  {profile.location}
                </p>
                <p className="text-slate-400 text-sm">Available for opportunities</p>
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Contact Methods Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20"
        >
          {contactMethods.map((method, index) => (
            <motion.a
              key={index}
              href={method.href}
              target={method.href.startsWith("http") ? "_blank" : undefined}
              rel={
                method.href.startsWith("http")
                  ? "noopener noreferrer"
                  : undefined
              }
              variants={itemVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className={`glass p-8 text-center hover:shadow-2xl ${method.shadowColor} transition-all duration-300 group ${method.bgColor} border border-white/10 ${method.hoverColor} rounded-2xl`}
            >
              <div className="relative mb-6">
                <div
                  className={`w-20 h-20 bg-gradient-to-br from-slate-700 to-slate-800 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ${method.color} shadow-lg`}
                >
                  {method.icon}
                </div>
                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-emerald-400 to-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <ExternalLink size={12} className="text-white" />
                </div>
              </div>
              
              <h3 className="text-white font-bold text-xl mb-2 group-hover:text-cyan-400 transition-colors duration-300">
                {method.label}
              </h3>
              <p className="text-slate-400 text-sm mb-3 leading-relaxed">
                {method.description}
              </p>
              <p className="text-slate-300 font-medium break-words">
                {method.value}
              </p>
              
              {/* Hover effect indicator */}
              <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-current to-transparent rounded-full" />
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Enhanced Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="glass p-12 max-w-4xl mx-auto rounded-3xl border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500 relative overflow-hidden">
            {/* Background gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-cyan-500/5 to-blue-500/5 rounded-3xl" />
            
            <div className="relative z-10">
              <motion.div 
                className="w-24 h-24 bg-gradient-to-br from-purple-400 to-cyan-400 rounded-3xl mx-auto mb-8 flex items-center justify-center"
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ type: "spring", stiffness: 200 }}
              >
                <MessageSquare size={36} className="text-white" />
              </motion.div>
              
              <h3 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Let's Work Together!
              </h3>
              <p className="text-slate-300 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Whether you have a project in mind, want to collaborate, or just
                want to say hello, I'd love to hear from you. Feel free to reach
                out through any of the channels above.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                <motion.a
                  href={`mailto:${profile?.contact?.email || ""}`}
                  className="group px-10 py-4 bg-gradient-to-r from-purple-500 to-cyan-500 text-white font-bold rounded-2xl hover:from-purple-600 hover:to-cyan-600 transition-all duration-300 flex items-center gap-4 text-lg shadow-xl shadow-purple-500/25"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Send size={18} />
                  </div>
                  <span>Send Email</span>
                </motion.a>
                
                <motion.a
                  href={profile?.contact?.linkedin || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group px-10 py-4 glass border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 hover:border-cyan-400 hover:text-white transition-all duration-300 rounded-2xl font-bold flex items-center gap-4 text-lg backdrop-blur-sm"
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-8 h-8 bg-cyan-400/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Linkedin size={18} />
                  </div>
                  <span>Connect</span>
                </motion.a>
              </div>
              
              {/* Additional contact info */}
              <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-emerald-400 mb-2">⚡</div>
                  <p className="text-white font-semibold mb-1">Quick Response</p>
                  <p className="text-slate-400 text-sm">Usually within 24 hours</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-cyan-400 mb-2">🌍</div>
                  <p className="text-white font-semibold mb-1">Remote Ready</p>
                  <p className="text-slate-400 text-sm">Available worldwide</p>
                </div>
                <div className="p-6 bg-white/5 rounded-2xl border border-white/10">
                  <div className="text-purple-400 mb-2">💼</div>
                  <p className="text-white font-semibold mb-1">Open to Work</p>
                  <p className="text-slate-400 text-sm">Full-time & freelance</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}