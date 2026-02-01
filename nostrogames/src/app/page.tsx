'use client';
import React, { useEffect, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { IoLogoGameControllerB, IoLogoGameControllerA } from 'react-icons/io';
import { FiArrowRight, FiPlus, FiSend } from 'react-icons/fi';
import Image from 'next/image';
import { CardContainer, CardBody, CardItem } from '@/components/ui/3d-card';
import { useRouter } from 'next/navigation';
import ColourfulText from "@/components/ui/colourful-text";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog } from '@headlessui/react';

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', gameRequest: '', type: 'request' });

  useEffect(() => { setIsMounted(true); }, []);

  if (!isMounted) return null;

  return (
    <div className="relative w-full min-h-screen overflow-hidden bg-grid-pattern flex flex-col items-center justify-center font-main">
      
      {/* Colorful Floating Blobs for a "Pop" feel */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div animate={{ scale: [1, 1.2, 1], x: [0, 50, 0] }} transition={{ duration: 10, repeat: Infinity }} className="absolute -top-20 -left-20 w-96 h-96 bg-yellow-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <motion.div animate={{ scale: [1, 1.5, 1], x: [0, -50, 0] }} transition={{ duration: 12, repeat: Infinity }} className="absolute top-1/2 -right-20 w-80 h-80 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
        <motion.div animate={{ scale: [1, 1.2, 1], y: [0, 50, 0] }} transition={{ duration: 8, repeat: Infinity }} className="absolute -bottom-20 left-1/3 w-96 h-96 bg-cyan-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      </div>

      <div className="relative z-30 flex flex-col lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-12 max-w-screen-xl mx-auto">
        
        {/* Left Section */}
        <motion.div className="w-full lg:w-1/2 flex flex-col gap-6">
          
          {/* Tag */}
          <motion.div
            initial={{ rotate: -2, scale: 0.9 }}
            animate={{ rotate: 0, scale: 1 }}
            className="flex items-center gap-3 bg-black text-white px-4 py-2 w-max border-2 border-black neubrutalism-shadow"
          >
            <IoLogoGameControllerB className="text-yellow-400 animate-bounce" />
            <span className="font-retro text-[10px] uppercase tracking-tighter">Level 01: Nostalgia</span>
          </motion.div>

          <h1 className="text-6xl lg:text-8xl font-black text-black leading-none tracking-tight">
            PLAY THE <br />
            <ColourfulText text="CLASSICS" />
          </h1>

          <p className="text-xl text-gray-700 font-medium border-l-4 border-black pl-4">
            No downloads. No setups. Just pure 8-bit joy. Step into the colorful world of retro gaming.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-6 pt-4">
            <button
              onClick={() => router.push("/Allgames")}
              className="bg-red-500 text-white font-bold px-8 py-4 border-4 border-black neubrutalism-shadow neubrutalism-shadow-hover transition-all flex items-center gap-3 uppercase italic"
            >
              Start Game <FiArrowRight strokeWidth={3} />
            </button>

            <button
              onClick={() => router.push("/BYOG")}
              className="bg-cyan-400 text-black font-bold px-8 py-4 border-4 border-black neubrutalism-shadow neubrutalism-shadow-hover transition-all flex items-center gap-3 uppercase italic"
            >
              Upload ROM <FiPlus strokeWidth={3} />
            </button>
          </div>

          <button
            onClick={() => { setFormData(prev => ({ ...prev, type: 'request' })); setIsFormOpen(true); }}
            className="w-fit text-sm font-retro text-pink-600 hover:underline mt-2 flex items-center gap-2"
          >
            <IoLogoGameControllerA /> Request a specific game?
          </button>
        </motion.div>

        {/* Right Section - 3D Card with a Lighter, Poppier feel */}
        <motion.div className="w-full lg:w-1/2 flex justify-center">
          <CardContainer className="inter-var">
            <CardBody className="relative bg-white border-4 border-black neubrutalism-shadow w-full max-w-[450px] h-auto rounded-none p-4 group">
                {/* Pixel Art Style Accents */}
                <div className="absolute -top-3 -right-3 w-10 h-10 bg-yellow-400 border-4 border-black z-10" />
                <div className="absolute -bottom-3 -left-3 w-10 h-10 bg-green-400 border-4 border-black z-10" />
                
                <CardItem translateZ="100" className="w-full">
                    <div className="bg-transparent border-4 border-black p-4">
                        <Image
                            src="https://res.cloudinary.com/dhvkjanwa/image/upload/v1747502053/20250517_2229_Cartoon_Arcade_Controller_simple_compose_01jvfjxys0fjtr667dv88p60fy_kdwui8.png"
                            alt="Arcade Controller"
                            width={500}
                            height={500}
                            className="w-full h-auto object-contain"
                        />
                    </div>
                </CardItem>
                <div className="mt-4 flex justify-between items-center font-retro text-[10px] text-black">
                    <span>INSERT COIN</span>
                    <span className="animate-pulse">PRESS START</span>
                </div>
            </CardBody>
          </CardContainer>
        </motion.div>
      </div>

      {/* Form Modal - Light Theme */}
      <AnimatePresence>
        {isFormOpen && (
          <Dialog open={isFormOpen} onClose={() => setIsFormOpen(false)} className="relative z-50">
            <div className="fixed inset-0 bg-yellow-400/40 backdrop-blur-sm" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Dialog.Panel className="w-full max-w-md bg-white border-8 border-black p-8 neubrutalism-shadow relative">
                <button 
                    onClick={() => setIsFormOpen(false)}
                    className="absolute -top-6 -right-6 bg-red-500 text-white border-4 border-black w-12 h-12 font-bold text-xl"
                >X</button>
                
                <Dialog.Title className="text-3xl font-black text-black mb-6 uppercase italic">
                  {formData.type === 'byog' ? 'Bring Your Game' : 'Request Game'}
                </Dialog.Title>

                <form className="space-y-4">
                  <div>
                    <label className="block text-xs font-retro uppercase mb-1">Player Name</label>
                    <input type="text" className="w-full p-3 border-4 border-black bg-gray-50 focus:bg-white outline-none" placeholder="MARIO" />
                  </div>
                  <div>
                    <label className="block text-xs font-retro uppercase mb-1">Game Title</label>
                    <textarea rows={3} className="w-full p-3 border-4 border-black bg-gray-50 focus:bg-white outline-none" placeholder="What's on your mind?" />
                  </div>
                  <button className="w-full bg-green-400 text-black font-black py-4 border-4 border-black neubrutalism-shadow hover:translate-y-1 hover:shadow-none transition-all uppercase italic">
                    Send Signal
                  </button>
                </form>
              </Dialog.Panel>
            </div>
          </Dialog>
        )}
      </AnimatePresence>

      {/* Footer */}
      <div className="fixed bottom-6 px-8 flex justify-between w-full items-center gap-2">
      <div className="flex  items-center gap-1">
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full border border-black" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full border border-black" />
            <div className="w-3 h-3 bg-green-500 rounded-full border border-black" />
        </div>
        <span className="text-[10px] font-retro text-black">SYS_READY</span>
      </div>
      <div className="flex  items-center gap-1" >
          <div className="flex gap-1">
            <div className="w-3 h-3 bg-red-500 rounded-full border border-black" />
            <div className="w-3 h-3 bg-yellow-500 rounded-full border border-black" />
            <div className="w-3 h-3 bg-green-500 rounded-full border border-black" />
        </div>
        <span className="text-[10px] font-retro text-black">Created By <a href="https://bpss.tech" target="_blank" rel="noopener noreferrer">BPSS</a></span>
      </div>
      </div>
    </div>
  );
}