import { useEffect } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Play, Smartphone, Youtube, Monitor } from "lucide-react";
import type { DemoType } from "../lib/types";

interface DemoEmbedProps {
  type: DemoType;
  url?: string;
}

export default function DemoEmbed({ type, url }: DemoEmbedProps) {
  useEffect(() => {
    if (type === "appetize" && url) {
      // Don't auto-open for appetize, let user click the button
    }
  }, [type, url]);

  if (!url || type === "none") {
    return (
      <motion.div
        className="w-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-8 text-center">
          <div className="w-16 h-16 bg-gradient-to-br from-slate-600 to-slate-700 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <Smartphone size={24} className="text-slate-400" />
          </div>
          <p className="text-slate-400 text-lg font-medium mb-2">
            Demo Coming Soon
          </p>
          <p className="text-slate-500 text-sm">
            This project demo will be available shortly
          </p>
        </div>
      </motion.div>
    );
  }

  const commonClasses = "w-full border-0 rounded-2xl shadow-2xl";

  if (type === "snack") {
    return (
      <motion.div
        className="w-full glass border border-white/10 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-cyan-500/20 transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative bg-gradient-to-br from-cyan-500/10 to-blue-600/10 p-4">
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium">
              <Smartphone size={14} />
              Interactive Demo
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Online
            </div>
          </div>

          {/* Demo preview area */}
          <div className="mt-8 mb-4 flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <Smartphone size={32} className="text-cyan-400 mx-auto mb-2" />
              <p className="text-white font-medium">Expo Snack Demo</p>
              <p className="text-slate-400 text-sm">
                Interactive code playground
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-lg">
              Live Mobile Demo
            </h4>
            <div className="flex items-center gap-2 text-cyan-400 text-sm">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              Online
            </div>
          </div>

          <iframe
            src={url}
            loading="lazy"
            style={{ width: "100%", height: 500 }}
            className={`${commonClasses} border border-white/10 bg-slate-900`}
            title="Interactive Expo Snack Demo"
          />

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-400">Powered by Expo Snack</span>
            <button
              onClick={() => window.open(url, "_blank")}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              Open in New Tab
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === "youtube") {
    const getYouTubeId = (url: string): string => {
      const regex = /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\n?#]+)/;
      const match = url.match(regex);
      return match ? match[1] : "dQw4w9WgXcQ";
    };

    const videoId = getYouTubeId(url);

    return (
      <motion.div
        className="w-full glass border border-white/10 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-red-400/20 transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative bg-gradient-to-br from-red-500/10 to-pink-600/10 p-4">
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium">
              <Youtube size={14} className="text-red-400" />
              Video Demo
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-red-500/10 border border-red-400/20 rounded-full">
              <Play size={12} className="text-red-400" />
              <span className="text-red-400 text-sm font-medium">HD Video</span>
            </div>
          </div>

          {/* Video preview area */}
          <div className="mt-8 mb-4 flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <Monitor size={32} className="text-red-400 mx-auto mb-2" />
              <p className="text-white font-medium">YouTube Demo</p>
              <p className="text-slate-400 text-sm">
                Project walkthrough video
              </p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-white font-semibold text-lg">
              Project Walkthrough
            </h4>
          </div>

          <div className="relative rounded-2xl overflow-hidden bg-slate-900 border border-white/10">
            <iframe
              className={commonClasses}
              style={{ width: "100%", height: 400 }}
              src={`https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1&color=white&theme=dark`}
              title="Project Demo Video"
              loading="lazy"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>

          <div className="mt-4 flex items-center justify-between text-sm">
            <span className="text-slate-400">YouTube Demo</span>
            <button
              onClick={() => window.open(url, "_blank")}
              className="flex items-center gap-2 text-red-400 hover:text-red-300 transition-colors duration-200"
            >
              <ExternalLink size={14} />
              Watch on YouTube
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  if (type === "appetize") {
    return (
      <motion.div
        className="w-full glass border border-white/10 rounded-2xl overflow-hidden group hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-500"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="relative bg-gradient-to-br from-purple-500/10 to-pink-600/10 p-4">
          <div className="absolute top-4 left-4">
            <div className="flex items-center gap-2 px-3 py-1 bg-black/40 backdrop-blur-md rounded-full text-white text-sm font-medium">
              <Smartphone size={14} />
              Live App Demo
            </div>
          </div>
          <div className="absolute top-4 right-4">
            <div className="flex items-center gap-2 text-emerald-400 text-sm bg-black/40 backdrop-blur-md rounded-full px-3 py-1">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></div>
              Interactive
            </div>
          </div>

          {/* Interactive demo preview */}
          <div className="mt-8 mb-4 flex items-center justify-center h-32 bg-white/5 rounded-xl border border-white/10">
            <div className="text-center">
              <div className="relative">
                <Smartphone
                  size={32}
                  className="text-purple-400 mx-auto mb-2"
                />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
              </div>
              <p className="text-white font-medium">Live Mobile App</p>
              <p className="text-slate-400 text-sm">Real-time interaction</p>
            </div>
          </div>
        </div>

        <div className="p-8 text-center">
          <div className="mb-6">
            <h4 className="text-white font-semibold text-xl mb-2">
              Experience the Live App
            </h4>
            <p className="text-slate-300 leading-relaxed">
              Interact with the actual mobile application in real-time through
              Appetize.io's cloud-based device simulation
            </p>
          </div>

          <div className="space-y-4">
            <motion.button
              onClick={() => window.open(url, "_blank", "width=400,height=800")}
              className="w-full px-8 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-2xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 flex items-center justify-center gap-3 text-lg shadow-lg shadow-purple-500/25 group"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Smartphone size={18} />
              </div>
              <span>Launch Interactive Demo</span>
              <ExternalLink
                size={18}
                className="group-hover:translate-x-1 transition-transform duration-300"
              />
            </motion.button>

            <div className="text-center text-slate-400 text-sm">
              <p>Opens in optimized popup window for best experience</p>
              <p className="mt-1 text-xs opacity-75">Powered by Appetize.io</p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="mt-6 grid grid-cols-3 gap-4 text-center">
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-purple-400 mb-1">⚡</div>
              <p className="text-white text-sm font-medium">Instant</p>
              <p className="text-slate-400 text-xs">No download</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-cyan-400 mb-1">📱</div>
              <p className="text-white text-sm font-medium">Native Feel</p>
              <p className="text-slate-400 text-xs">Real device</p>
            </div>
            <div className="p-3 bg-white/5 rounded-xl border border-white/10">
              <div className="text-emerald-400 mb-1">🔄</div>
              <p className="text-white text-sm font-medium">Live Data</p>
              <p className="text-slate-400 text-xs">Real-time</p>
            </div>
          </div>
        </div>
      </motion.div>
    );
  }

  return null;
}
