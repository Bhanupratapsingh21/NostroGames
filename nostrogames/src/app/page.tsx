'use client';
import React, { useEffect, useState } from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { IoLogoGameControllerB, IoLogoGameControllerA } from 'react-icons/io';
import { FiArrowRight, FiPlus, FiSend } from 'react-icons/fi';
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
import { Dialog } from '@headlessui/react';

export default function Home() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    gameRequest: '',
    type: 'request'
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          access_key: process.env.NEXT_PUBLIC_API_KEY, // Replace with your actual key
          subject: `New Game ${formData.type === 'request' ? 'Request' : 'Submission'} On Nostrogames`,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitSuccess(true);
        setFormData({
          name: '',
          email: '',
          gameRequest: '',
          type: formData.type
        });
        setTimeout(() => {
          setIsFormOpen(false);
          setSubmitSuccess(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

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

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
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

            <motion.button
              onClick={() => {
                router.push("/BYOG")
              }}
              className="group relative bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-lg font-medium px-8 py-4 rounded-2xl transition-all w-fit hover:shadow-lg hover:shadow-blue-500/30 flex items-center gap-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={isMounted ? { opacity: 1 } : {}}
              transition={{ delay: 0.9, duration: 0.5 }}
              whileHover={isMounted ? { scale: 1.05 } : {}}
              whileTap={isMounted ? { scale: 0.95 } : {}}
            >
              <span className="relative z-10">Bring Your Game</span>
              <FiPlus className="relative z-10 transition-transform group-hover:rotate-90" />
              <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>

            <motion.button
              onClick={() => {
                setFormData(prev => ({ ...prev, type: 'request' }));
                setIsFormOpen(true);
              }}
              className="group relative bg-gradient-to-r from-green-600 to-teal-600 text-white text-lg font-medium px-8 py-4 rounded-2xl transition-all w-fit hover:shadow-lg hover:shadow-green-500/30 flex items-center gap-2 overflow-hidden"
              initial={{ opacity: 0 }}
              animate={isMounted ? { opacity: 1 } : {}}
              transition={{ delay: 1.0, duration: 0.5 }}
              whileHover={isMounted ? { scale: 1.05 } : {}}
              whileTap={isMounted ? { scale: 0.95 } : {}}
            >
              <span className="relative z-10">Request a Game</span>
              <IoLogoGameControllerA className="relative z-10" />
              <span className="absolute inset-0 bg-gradient-to-r from-green-700 to-teal-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </motion.button>
          </div>
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

      {/* Form Modal */}
      <Dialog
        open={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        className="relative z-50"
      >
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md" aria-hidden="true" />

        {/* Modal Container */}
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-md rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 border border-white/10 p-6 shadow-2xl shadow-purple-500/20">
            <Dialog.Title className="text-2xl font-bold text-white mb-4">
              {formData.type === 'byog' ? 'Bring Your Own Game' : 'Request a Game'}
            </Dialog.Title>

            {submitSuccess ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-center py-8"
              >
                <div className="text-green-500 text-5xl mb-4">✓</div>
                <h3 className="text-xl font-bold text-white mb-2">Thank You!</h3>
                <p className="text-gray-300">
                  Your {formData.type === 'byog' ? 'submission' : 'request'} has been received. We'll get back to you soon!
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <div>
                  <label htmlFor="gameRequest" className="block text-sm font-medium text-gray-300 mb-1">
                    {formData.type === 'byog' ? 'Tell us about your game' : 'Which game would you like to see?'}
                  </label>
                  <textarea
                    id="gameRequest"
                    name="gameRequest"
                    value={formData.gameRequest}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-4 py-3 bg-slate-700/50 border border-white/10 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
                  />
                </div>

                <input type="hidden" name="type" value={formData.type} />

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all ${isSubmitting
                      ? 'bg-purple-700 text-purple-200'
                      : 'bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-lg hover:shadow-purple-500/30'
                      }`}
                  >
                    {isSubmitting ? (
                      'Sending...'
                    ) : (
                      <>
                        <span>{formData.type === 'byog' ? 'Submit Game' : 'Send Request'}</span>
                        <FiSend className="text-lg" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </Dialog.Panel>
        </div>
      </Dialog>

      {/* Footer Credit - Client only */}
      {isMounted && (
        <motion.div
          className="absolute bottom-6 right-6 text-white/50 text-sm z-30"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          created by <a href="https://bpss.tech/" className="hover:text-white/80 transition-colors">@bpss.tech</a>
        </motion.div>
      )}
    </div>
  );
}