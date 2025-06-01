'use client';
import React, { useEffect, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { IoLogoGameControllerB } from 'react-icons/io';
import { FiArrowRight } from 'react-icons/fi';
import Image from 'next/image';
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/ui/3d-card';
import { useRouter } from 'next/navigation';
import "./globals.css"
import ColourfulText from "@/components/ui/colourful-text";
import { motion } from "framer-motion";

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Only generate random values on client side
  const particles = isMounted ? Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 10 + 5,
    duration: Math.random() * 10 + 10
  })) : [];

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-slate-900 flex flex-col items-center justify-center">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-slate-900 via-purple-900/20 to-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Animated Background */}
      <Boxes />

      {/* Floating Particles - Client only */}
      {isMounted && (
        <div className="absolute inset-0 z-0">
          {particles.map((particle) => (
            <motion.div
              key={particle.id}
              className="absolute rounded-full bg-purple-500/20"
              initial={{
                x: particle.x,
                y: particle.y,
                scale: Math.random() * 0.5 + 0.5,
                opacity: 0
              }}
              animate={{
                x: Math.random() * 100,
                y: Math.random() * 100,
                opacity: 0.5,
                transition: {
                  duration: particle.duration,
                  repeat: Infinity,
                  repeatType: "reverse"
                }
              }}
              style={{
                width: `${particle.size}px`,
                height: `${particle.size}px`,
              }}
            />
          ))}
        </div>
      )}

      {/* Main Content */}
      <div className="relative z-30 flex flex-col h-screen lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-12 max-w-screen-xl mx-auto">
        {/* Left: Text Section */}
        <motion.div
          className="w-full lg:w-1/2 flex flex-col gap-8"
          initial={{ opacity: 0, y: 20 }}
          animate={isMounted ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          {/* Badge */}
          <motion.div
            className="flex items-center gap-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-white text-sm px-6 py-3 w-max rounded-full border border-white/10 font-mono backdrop-blur-md"
            initial={{ opacity: 0, x: -20 }}
            animate={isMounted ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <IoLogoGameControllerB className="text-lg" />
            <div className="w-px h-4 bg-white/40" />
            <span>Your Nostalgia Just Got Dangerous</span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            className="text-5xl lg:text-7xl font-bold text-white leading-tight"
            initial={{ opacity: 0, y: 20 }}
            animate={isMounted ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Rediscover Classic <br />
            <ColourfulText text="Gaming" />
          </motion.h1>

          {/* Description */}
          <motion.p
            className="md:text-xl text-md text-gray-300 leading-relaxed max-w-lg"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Step into nostalgia reimagined with NostroGames. A minimalist, modern approach to the games that defined an era.
          </motion.p>

          {/* CTA Button */}
          <motion.button
            onClick={() => router.push("/Allgames")}
            className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-medium px-8 py-4 rounded-2xl transition-all w-fit hover:shadow-lg hover:shadow-purple-500/30 flex items-center gap-2 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={isMounted ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.5 }}
            whileHover={isMounted ? { scale: 1.05 } : {}}
            whileTap={isMounted ? { scale: 0.95 } : {}}
          >
            <span className="relative z-10">Explore Collection</span>
            <FiArrowRight className="relative z-10 transition-transform group-hover:translate-x-1" />
            <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-pink-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
          </motion.button>
        </motion.div>

        {/* Right: 3D Card Image Section */}
        <motion.div
          className="w-full h-max md:flex lg:w-1/2 justify-center"
          initial={{ opacity: 0, x: 50 }}
          animate={isMounted ? { opacity: 1, x: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <CardContainer className="inter-var w-full max-w-[500px]">
            <CardBody className="relative group/card bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 hover:shadow-2xl hover:shadow-purple-500/20 w-full h-auto rounded-2xl p-6 transition-all duration-300">
              <CardItem
                translateZ="100"
                className="w-full"
                style={{ transform: 'scale(1.1)' }}
              >
                <Image
                  src="https://res.cloudinary.com/dhvkjanwa/image/upload/v1747502053/20250517_2229_Cartoon_Arcade_Controller_simple_compose_01jvfjxys0fjtr667dv88p60fy_kdwui8.png"
                  alt="3D Game Controller"
                  width={1000}
                  height={1000}
                  priority
                  className="w-full h-auto object-contain hover:scale-105 transition-transform duration-500"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </motion.div>
      </div>

      {/* Footer Credit - Client only */}
      {isMounted && (
        <motion.div
          className="absolute bottom-6 right-6 text-white/50 text-sm z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          created by <a href="https://bpss.tech/">@bpss.tech</a>
        </motion.div>
      )}
    </div>
  );
}