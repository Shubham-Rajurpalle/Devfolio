import { Suspense, useMemo, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Environment,
  Float,
  Text3D,
  MeshTransmissionMaterial,
} from "@react-three/drei";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";
import { downloadResume } from "../lib/api";

// Innovative 3D Scene with Glass Morphism
function InnovativeGeometry() {
  const groupRef = useRef();
  const meshRef = useRef();
  const particlesRef = useRef();
  const orbitingElementsRef = useRef();

  useFrame((state) => {
    const time = state.clock.elapsedTime;

    // Main group rotation
    if (groupRef.current) {
      groupRef.current.rotation.y = time * 0.1;
      groupRef.current.rotation.x = Math.sin(time * 0.2) * 0.1;
    }

    // Central mesh with organic movement
    if (meshRef.current) {
      meshRef.current.rotation.x = time * 0.3;
      meshRef.current.rotation.y = time * 0.2;
      meshRef.current.scale.setScalar(1 + Math.sin(time * 0.5) * 0.1);
    }

    // Orbiting elements
    if (orbitingElementsRef.current) {
      orbitingElementsRef.current.children.forEach((child, i) => {
        const radius = 5 + i * 1.5;
        const speed = 0.5 + i * 0.2;
        child.position.x = Math.cos(time * speed + i) * radius;
        child.position.z = Math.sin(time * speed + i) * radius;
        child.position.y = Math.sin(time * 0.3 + i) * 2;
        child.rotation.y = time * (0.5 + i * 0.2);
      });
    }

    // Dynamic particles
    if (particlesRef.current) {
      particlesRef.current.rotation.y = time * 0.05;
      const positions = particlesRef.current.geometry.attributes.position.array;
      for (let i = 0; i < positions.length; i += 3) {
        positions[i + 1] += Math.sin(time + i) * 0.002;
      }
      particlesRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  // Enhanced particle system
  const particleCount = 200;
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 30;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 30;
  }

  return (
    <group ref={groupRef}>
      {/* Central glass sphere */}
      <mesh ref={meshRef} position={[0, 0, -5]}>
        <sphereGeometry args={[2.5, 64, 64]} />
        <MeshTransmissionMaterial
          backside
          samples={4}
          thickness={3}
          chromaticAberration={0.025}
          anisotropy={0.1}
          distortion={0.1}
          distortionScale={0.1}
          temporalDistortion={0.2}
          iridescence={1}
          iridescenceIOR={1}
          iridescenceThicknessRange={[0, 1400]}
        />
      </mesh>

      {/* Orbiting elements */}
      <group ref={orbitingElementsRef}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Float key={i} speed={2 + i * 0.5} rotationIntensity={0.3}>
            <mesh>
              <icosahedronGeometry args={[0.5 + i * 0.1]} />
              <meshStandardMaterial
                color={`hsl(${200 + i * 20}, 70%, 60%)`}
                transparent
                opacity={0.3}
                wireframe={i % 2 === 0}
                emissive={`hsl(${200 + i * 20}, 50%, 30%)`}
                emissiveIntensity={0.2}
              />
            </mesh>
          </Float>
        ))}
      </group>

      {/* Particle field */}
      <points ref={particlesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            array={positions}
            count={particleCount}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          color="#60a5fa"
          size={0.03}
          transparent
          opacity={0.4}
          sizeAttenuation
        />
      </points>

      {/* Geometric frames */}
      <mesh position={[-8, 3, -8]} rotation={[0.3, 0.5, 0]}>
        <torusGeometry args={[1.5, 0.1, 16, 100]} />
        <meshStandardMaterial
          color="#3b82f6"
          transparent
          opacity={0.4}
          emissive="#1e40af"
          emissiveIntensity={0.1}
        />
      </mesh>

      <mesh position={[7, -2, -6]} rotation={[-0.2, -0.8, 0]}>
        <octahedronGeometry args={[1.2]} />
        <meshStandardMaterial
          color="#06b6d4"
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>
    </group>
  );
}

// Advanced typing animation with word-by-word reveal
function AdvancedTypingAnimation({ text, className }) {
  const [displayedText, setDisplayedText] = useState("");
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const words = text.split(" ");

  useEffect(() => {
    if (currentWordIndex < words.length) {
      const timer = setTimeout(() => {
        setDisplayedText(
          (prev) => prev + (prev ? " " : "") + words[currentWordIndex]
        );
        setCurrentWordIndex((prev) => prev + 1);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [currentWordIndex, words]);

  return (
    <span className={className}>
      {displayedText}
      {currentWordIndex < words.length && (
        <motion.span
          animate={{ opacity: [0, 1, 0] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          className="text-cyan-400 ml-1 text-4xl font-thin"
        >
          |
        </motion.span>
      )}
    </span>
  );
}

export default function Hero3D() {
  const [profile, setProfile] = useState(null);
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 1]);

  useEffect(() => {
    setProfile({
      name: "Shubham Rajurpalle",
      title: "Android & Full Stack Developer",
      tagline: "Building Scalable Mobile & Web Solutions",
      bio: "Specialized in Android development with Kotlin, React Native for cross-platform apps, and full-stack web development. Passionate about creating efficient, user-centric digital solutions.",
      stats: {
        gfgProblems: "460+",
        youtubeSubscribers: "250K+",
        hackathonWins: "2x Runner-Up",
        experience: "2+ Years",
      },
    });
  }, []);

  const supportsMotion = useMemo(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    return !mq.matches;
  }, []);

  const handleResumeDownload = async () => {
    try {
      await downloadResume();
      console.log("Resume download initiated successfully");
    } catch (error) {
      console.error("Failed to download resume:", error);
      // Show user-friendly error message
      alert(
        "Sorry, there was an issue downloading the resume. Please try again later or contact me directly."
      );
    }
  };

  const scrollToProjects = () => {
    document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.div
      id="home"
      className="relative w-full min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-blue-900/20 to-slate-900"
      style={{ y, opacity }}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        {supportsMotion && (
          <Canvas
            camera={{ fov: 75, position: [0, 0, 15] }}
            style={{ background: "transparent" }}
          >
            <ambientLight intensity={0.3} color="#3b82f6" />
            <directionalLight
              position={[10, 10, 5]}
              intensity={0.8}
              color="#60a5fa"
            />
            <pointLight
              position={[-10, -10, -5]}
              intensity={0.5}
              color="#06b6d4"
            />
            <Suspense fallback={null}>
              <InnovativeGeometry />
              <Environment preset="night" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={0.3}
            />
          </Canvas>
        )}
      </div>

      {/* Main Content Grid */}
      <div className="relative z-10 min-h-screen grid grid-cols-1 lg:grid-cols-12 items-center px-6 md:px-12 lg:px-20 py-20">
        {/* Left Content - spans 7 columns */}
        <motion.div
          className="lg:col-span-7 space-y-8 max-w-4xl"
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
        >
          {/* Name with animated background */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <motion.div
              className="absolute -inset-4 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-3xl blur-xl"
              animate={{
                scale: [1, 1.05, 1],
                opacity: [0.3, 0.5, 0.3],
              }}
              transition={{ duration: 4, repeat: Infinity }}
            />
            <h1 className="relative text-6xl md:text-7xl lg:text-8xl font-black tracking-tight">
              <span className="block text-white mb-2">Shubham</span>
              <span className="block bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                Rajurpalle
              </span>
            </h1>
          </motion.div>

          {/* Dynamic title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="text-2xl md:text-3xl lg:text-4xl font-bold text-slate-300"
          >
            <AdvancedTypingAnimation text="Android & Full Stack Developer" />
          </motion.div>

          {/* Tagline */}
          <motion.p
            className="text-xl md:text-2xl font-medium bg-gradient-to-r from-slate-300 to-slate-400 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            Building Scalable Mobile & Web Solutions
          </motion.p>

          {/* Enhanced bio */}
          <motion.p
            className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
          >
            Specialized in Android development with Kotlin, React Native for
            cross-platform apps, and full-stack web development. Passionate
            about creating efficient, user-centric digital solutions.
          </motion.p>

          {/* Tech stack badges */}
          <motion.div
            className="flex flex-wrap gap-3"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              {
                name: "Kotlin",
                icon: "🚀",
                color: "from-purple-500 to-blue-500",
              },
              {
                name: "React Native",
                icon: "⚛️",
                color: "from-blue-500 to-cyan-500",
              },
              {
                name: "Full Stack",
                icon: "🛠️",
                color: "from-cyan-500 to-green-500",
              },
              {
                name: "Firebase",
                icon: "🔥",
                color: "from-orange-500 to-red-500",
              },
            ].map((tech, i) => (
              <motion.div
                key={tech.name}
                className={`px-4 py-2 bg-gradient-to-r ${tech.color} rounded-full text-white font-medium text-sm shadow-lg`}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -2 }}
              >
                <span className="mr-2">{tech.icon}</span>
                {tech.name}
              </motion.div>
            ))}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.6, duration: 0.8 }}
          >
            <motion.button
              onClick={scrollToProjects}
              className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-2xl shadow-2xl hover:shadow-cyan-500/25 transition-all duration-300 flex items-center justify-center gap-3"
              whileHover={{ scale: 1.02, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              <span>Explore My Work</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                →
              </motion.div>
            </motion.button>

            <motion.button
              onClick={handleResumeDownload}
              className="px-8 py-4 border-2 border-cyan-400/50 text-cyan-300 hover:bg-cyan-400/10 transition-all duration-300 rounded-2xl font-semibold backdrop-blur-sm flex items-center justify-center gap-2"
              whileHover={{ scale: 1.02, y: -2, borderColor: "#06b6d4" }}
              whileTap={{ scale: 0.98 }}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.979 19.804 4.587 19.412C4.195 19.02 3.99934 18.5493 4 18V15H6V18H18V15H20V18C20 18.55 19.804 19.021 19.412 19.413C19.02 19.805 18.5493 20.0007 18 20H6Z"
                  fill="currentColor"
                />
              </svg>
              Download Resume
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Right Content - Profile & Stats - spans 5 columns */}
        <motion.div
          className="lg:col-span-5 mt-16 lg:mt-0 space-y-12"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
        >
          {/* Profile Photo Section */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            <div className="relative">
              {/* Animated rings */}
              <motion.div
                className="absolute inset-0 w-64 h-64 md:w-72 md:h-72 rounded-full border border-cyan-400/30"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-2 w-60 h-60 md:w-68 md:h-68 rounded-full border border-blue-400/20"
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute inset-4 w-56 h-56 md:w-64 md:h-64 rounded-full border border-purple-400/15"
                animate={{ rotate: 360 }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              />

              {/* Main profile container */}
              <motion.div
                className="relative w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden bg-gradient-to-br from-cyan-500/20 via-blue-500/20 to-purple-500/20 p-1 shadow-2xl backdrop-blur-sm border border-white/20"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="w-full h-full rounded-full bg-slate-800/40 backdrop-blur-md flex items-center justify-center overflow-hidden">
                  {/* Profile Image Placeholder */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-700 to-slate-800 flex items-center justify-center relative overflow-hidden">
                    
                    <img
                      src="/profile-photo.jpg"
                      alt="Shubham Rajurpalle"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              </motion.div>

              {/* Floating badges */}
              <motion.div
                className="absolute -top-2 -left-6 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 px-3 py-1 rounded-lg border border-cyan-400/30 backdrop-blur-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0 }}
              >
                <span className="text-cyan-300 font-semibold text-sm">
                  Android Dev
                </span>
              </motion.div>

              <motion.div
                className="absolute -bottom-2 -left-8 bg-gradient-to-r from-purple-500/20 to-pink-500/20 px-3 py-1 rounded-lg border border-purple-400/30 backdrop-blur-sm"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <span className="text-purple-300 font-semibold text-sm">
                  Full Stack
                </span>
              </motion.div>

              <motion.div
                className="absolute -top-2 -right-8 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 px-3 py-1 rounded-lg border border-blue-400/30 backdrop-blur-sm"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <span className="text-blue-300 font-semibold text-sm">
                  React Native
                </span>
              </motion.div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
            {[
              {
                value: "460+",
                label: "DSA Problems",
                sublabel: "GeeksforGeeks",
                color: "from-emerald-400 to-teal-500",
              },
              {
                value: "250K+",
                label: "Subscribers",
                sublabel: "YouTube Channel",
                color: "from-red-400 to-orange-500",
              },
              {
                value: "2x",
                label: "Runner-Up",
                sublabel: "National Hackathons",
                color: "from-yellow-400 to-orange-500",
              },
              {
                value: "2+",
                label: "Years Exp",
                sublabel: "Mobile Development",
                color: "from-purple-400 to-pink-500",
              },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                className="group relative p-4 glass border border-white/10 rounded-xl hover:border-white/20 transition-all duration-500"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + i * 0.1 }}
                whileHover={{ scale: 1.02, y: -3 }}
              >
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 rounded-xl`}
                />
                <div className="relative z-10 text-center">
                  <div
                    className={`text-xl md:text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent mb-1`}
                  >
                    {stat.value}
                  </div>
                  <div className="text-white font-medium text-xs mb-1">
                    {stat.label}
                  </div>
                  <div className="text-slate-400 text-xs">{stat.sublabel}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Ambient lighting effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse delay-1000" />
      <div className="absolute top-1/2 right-1/3 w-64 h-64 bg-purple-500/5 rounded-full blur-2xl animate-pulse delay-500" />

    </motion.div>
  );
}
