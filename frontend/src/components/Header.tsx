// components/Header.tsx
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";

export default function Header() {
  const [open, setOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "Projects", href: "#projects" },
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50">
      {/* Background with neon gradient sweep */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] 
                   from-cyan-500/30 via-transparent to-transparent
                   backdrop-blur-xl border-b border-cyan-400/20 shadow-[0_0_25px_rgba(0,255,255,0.3)]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      />

      <div className="relative max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        {/* Logo with animated gradient text + glow */}
        <motion.a
          href="#home"
          className="text-2xl md:text-3xl font-extrabold bg-gradient-to-r 
                     from-cyan-400 via-blue-500 to-purple-500 bg-clip-text text-transparent
                     drop-shadow-[0_0_6px_rgba(56,189,248,0.8)]"
          whileHover={{ scale: 1.08, rotate: 1 }}
          transition={{ type: "spring", stiffness: 200 }}
        >
          Shubham.dev
        </motion.a>

        {/* Desktop Nav with animated underline */}
        <nav className="hidden md:flex gap-10">
          {navLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.href}
              className="relative text-slate-200 font-medium tracking-wide
                         after:absolute after:left-0 after:bottom-0 after:h-[2px]
                         after:w-0 after:bg-gradient-to-r after:from-cyan-400 after:to-blue-500
                         hover:after:w-full after:transition-all after:duration-300"
              whileHover={{ scale: 1.05 }}
            >
              {link.name}
            </motion.a>
          ))}
        </nav>

        {/* Mobile Toggle */}
        <motion.button
          className="md:hidden text-cyan-300 hover:text-cyan-200"
          onClick={() => setOpen(!open)}
          whileTap={{ scale: 0.9 }}
          aria-label="Toggle menu"
        >
          {open ? <X size={30} /> : <Menu size={30} />}
        </motion.button>
      </div>

      {/* Mobile Overlay & Menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black"
              onClick={() => setOpen(false)}
            />
            <motion.nav
              key="menu"
              initial={{ y: -40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ type: "spring", stiffness: 200 }}
              className="md:hidden relative bg-slate-900/95 backdrop-blur-md border-t border-cyan-400/20"
            >
              <div className="flex flex-col items-center gap-6 py-10">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="text-cyan-300 hover:text-cyan-200 text-lg font-semibold tracking-wide"
                    onClick={() => setOpen(false)}
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}
