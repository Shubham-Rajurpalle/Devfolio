import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home", color: "hover:text-cyan-400" },
    { name: "Projects", href: "#projects", color: "hover:text-blue-400" },
    { name: "Education", href: "#education", color: "hover:text-emerald-400" },
    { name: "Experience", href: "#experience", color: "hover:text-purple-400" },
    { name: "Skills", href: "#skills", color: "hover:text-green-400" },
    { name: "Contact", href: "#contact", color: "hover:text-pink-400" },
  ];

  const scrollToSection = (href) => {
    setOpen(false);
    const element = document.querySelector(href);
    if (element) {
      const headerHeight = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <motion.header
      className="fixed top-0 left-0 w-full z-50"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {/* Enhanced background with improved gradient */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-2xl border-b border-white/10 shadow-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      {/* Animated gradient border */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400/50 to-transparent" />

      <div className="relative w-full px-6 md:px-8 h-20 flex items-center justify-between">
        {/* Enhanced Logo */}
        <motion.button
          onClick={() => scrollToSection("#home")}
          className="relative group"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          {/* Logo background glow */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-all duration-500" />

          <div className="relative px-4 py-2">
            <span className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent drop-shadow-[0_0_8px_rgba(59,130,246,0.8)] group-hover:drop-shadow-[0_0_12px_rgba(59,130,246,1)] transition-all duration-300">
              Shubham.dev
            </span>
            {/* Animated underline */}
            <motion.div
              className="absolute bottom-0 left-4 h-0.5 bg-gradient-to-r from-blue-400 to-cyan-400"
              initial={{ width: 0 }}
              whileHover={{ width: "calc(100% - 2rem)" }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </motion.button>

        {/* Enhanced Desktop Navigation */}
        <nav className="hidden md:flex gap-2 lg:gap-4">
          {navLinks.map((link, index) => (
            <motion.button
              key={link.name}
              onClick={() => scrollToSection(link.href)}
              className={`relative px-4 lg:px-6 py-3 text-slate-300 font-semibold tracking-wide rounded-xl
                         transition-all duration-300 group ${link.color}
                         hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg`}
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 + 0.5, duration: 0.5 }}
            >
              {/* Hover background effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <span className="relative z-10">{link.name}</span>

              {/* Animated underline */}
              <motion.div
                className="absolute bottom-1 left-1/2 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                initial={{ width: 0, x: "-50%" }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 0.3 }}
              />

              {/* Glow effect */}
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-400/0 via-cyan-400/10 to-cyan-400/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.button>
          ))}
        </nav>

        {/* Enhanced Mobile Toggle */}
        <motion.button
          className="md:hidden relative w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center text-cyan-300 hover:text-cyan-200 hover:bg-white/20 transition-all duration-300"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.05 }}
          aria-label="Toggle menu"
        >
          <AnimatePresence mode="wait">
            {open ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <X size={24} />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Menu size={24} />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Enhanced Mobile Menu */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />

            {/* Mobile Navigation */}
            <motion.nav
              key="mobile-nav"
              initial={{ y: -300, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -300, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              className="md:hidden relative bg-slate-800/95 backdrop-blur-2xl border-b border-white/20 shadow-2xl"
            >
              {/* Animated gradient background */}
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 via-blue-500/10 to-purple-500/10" />

              <div className="relative flex flex-col items-center gap-2 py-8 px-6">
                {navLinks.map((link, index) => (
                  <motion.button
                    key={link.name}
                    onClick={() => scrollToSection(link.href)}
                    className={`w-full max-w-sm px-6 py-4 text-slate-300 text-lg font-semibold tracking-wide
                               rounded-xl transition-all duration-300 group ${link.color}
                               hover:bg-white/10 hover:backdrop-blur-sm hover:shadow-lg
                               border border-transparent hover:border-white/20`}
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.02, x: 10 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {/* Background gradient effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                    <div className="relative flex items-center justify-between">
                      <span>{link.name}</span>
                      <motion.div
                        className="w-2 h-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-400 opacity-0 group-hover:opacity-100"
                        initial={{ scale: 0 }}
                        whileHover={{ scale: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    </div>
                  </motion.button>
                ))}

                {/* Mobile menu decoration */}
                <motion.div
                  className="mt-6 w-16 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: "4rem" }}
                  transition={{ delay: 0.8, duration: 0.5 }}
                />
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
