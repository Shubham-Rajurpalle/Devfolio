// components/Hero3D.tsx
import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF, Environment } from "@react-three/drei";

function Phone() {
  const { scene } = useGLTF("/models/phone.glb", true);
  return <primitive object={scene} scale={1.5} position={[0, -3, 0]} />;
}

export default function Hero3D() {
  const supportsMotion = useMemo(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    return !mq.matches;
  }, []);

  return (
    <div
      id="home"
      className="relative w-full h-[520px] rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 to-slate-950 bg-grid px-6 md:px-12 flex flex-col md:flex-row items-center justify-between"
    >
      {/* LEFT SIDE - Text */}
      <div className="z-10 max-w-xl flex flex-col gap-6 text-center md:text-left">
        <h1 className="text-3xl md:text-6xl font-extrabold font-inter leading-tight">
          <span className="text-5xl block">Shubham Rajurpalle</span>
          <span className="text-3xl text-primary bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
            Android & React Native Developer
          </span>
        </h1>

        <p className="text-slate-300 text-lg leading-relaxed">
          Mobile-first engineer specializing in{" "}
          <span className="font-semibold text-green-400">Android</span> &{" "}
          <span className="font-semibold text-blue-400">React Native</span>. I
          also bring{" "}
          <span className="font-semibold text-indigo-400">web development</span>{" "}
          skills to build seamless cross-platform experiences.
        </p>

        {/* Skill Badges */}
        <div className="flex flex-wrap gap-3">
          <span className="px-3 py-1 rounded-lg bg-green-500/20 text-green-400 text-sm font-semibold">
            Android (Java/Kotlin)
          </span>
          <span className="px-3 py-1 rounded-lg bg-blue-500/20 text-blue-400 text-sm font-semibold">
            React Native
          </span>
          <span className="px-3 py-1 rounded-lg bg-indigo-500/20 text-indigo-400 text-sm font-semibold">
            Web (MERN)
          </span>
        </div>

        {/* Buttons */}
        <div className="flex flex-wrap gap-4 mt-4 justify-center md:justify-start">
          <a
            href="#projects"
            className="px-6 py-3 rounded-xl bg-primary text-white font-semibold shadow-lg shadow-primary/40 hover:scale-105 transition-transform duration-300"
          >
            🚀 View Projects
          </a>
          <a
            href="/resume_shubham.pdf"
            className="px-6 py-3 rounded-xl bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-colors duration-300"
          >
            📄 Download Resume
          </a>
        </div>
      </div>

      {/* RIGHT SIDE - 3D Model */}
      <div className="relative w-full md:w-[45%] h-[320px] md:h-[420px] mt-10 md:mt-0">
        {supportsMotion ? (
          <Canvas camera={{ fov: 35, position: [0, 0, 8] }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[5, 5, 5]} intensity={1} />
            <Suspense fallback={null}>
              <Phone />
              <Environment preset="city" />
            </Suspense>
            <OrbitControls
              enableZoom={false}
              enablePan={false}
              autoRotate
              autoRotateSpeed={2}
              target={[0, -1.5, 0]}
            />
          </Canvas>
        ) : (
          <img
            src="/fallback-hero.png"
            alt="Hero fallback"
            className="w-full h-full object-contain"
          />
        )}
      </div>
    </div>
  );
}
