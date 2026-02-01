'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaGamepad, FaSyncAlt, FaInfoCircle } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EmulatorContainer from '@/components/EmulatorContainer';
import { motion, AnimatePresence } from 'framer-motion';
import ColourfulText from '@/components/ui/colourful-text';

export default function GameOnePage() {
  const [game, setGame] = useState<gametypes>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [romUrl, setRomUrl] = useState<string>('');
  const [showOrientationModal, setShowOrientationModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('game');
    if (id) {
      const current = retroGames.find((g) => g.id === Number(id));
      setGame(current);
      if (current?.nesUrl) setRomUrl(current.nesUrl);
    }
  }, []);

  const handlePlay = () => {
    setIsGameRunning(true);
    if (window.matchMedia('(orientation: portrait)').matches) {
      setShowOrientationModal(true);
    }
  };

  return (
    <div className="min-h-screen bg-grid-pattern font-main pb-20">
      {/* Neubrutalist Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-6 left-6 z-50 p-4 bg-white border-4 border-black neubrutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
      >
        <FaArrowLeft size={20} className="text-black" />
      </button>

      <div className="max-w-5xl mx-auto px-4 pt-24">
        <AnimatePresence mode="wait">
          {!isGameRunning ? (
            <motion.div 
              key="info"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8"
            >
              {/* Left: Game Box Art Style */}
              <div className="lg:col-span-5 space-y-6">
                <div className="bg-white border-8 border-black p-2 neubrutalism-shadow relative group">
                  <div className="absolute top-4 left-4 bg-red-500 text-white font-retro text-[8px] px-2 py-1 z-10 border-2 border-black">
                    NTSC-U
                  </div>
                  <Image
                    src={game?.imgUrl || '/game/game1.png'}
                    alt={game?.name || 'Game banner'}
                    width={500}
                    height={700}
                    className="w-full h-auto object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
                    unoptimized
                  />
                  <div className="mt-4 border-t-4 border-black pt-4 flex justify-between items-center px-2">
                    <span className="font-retro text-[10px] text-black italic">REV-A</span>
                    <div className="h-6 w-12 bg-gray-200 border-2 border-black rounded-full shadow-inner" />
                  </div>
                </div>

                <button
                  onClick={handlePlay}
                  disabled={!game?.nesUrl}
                  className="w-full py-6 bg-green-400 text-black font-black text-2xl border-4 border-black neubrutalism-shadow neubrutalism-shadow-hover transition-all uppercase italic flex items-center justify-center gap-4"
                >
                  {game?.nesUrl ? (
                    <>POWER ON <FaGamepad /></>
                  ) : (
                    'OUT OF STOCK'
                  )}
                </button>
              </div>

              {/* Right: Manual Style Info */}
              <div className="lg:col-span-7 bg-white border-4 border-black p-8 neubrutalism-shadow">
                <div className="mb-6">
                   <h1 className="text-4xl md:text-6xl font-black text-black leading-tight uppercase mb-2">
                     <ColourfulText text={game?.name || "Loading..."} />
                   </h1>
                   <div className="inline-block bg-yellow-300 border-2 border-black px-3 py-1 font-retro text-[10px] text-black uppercase">
                     {game?.type || 'Adventure'}
                   </div>
                </div>

                <div className="space-y-6 text-gray-800">
                  <div className="bg-cyan-50 border-l-8 border-cyan-400 p-4 font-medium italic">
                    "{game?.quote || "The ultimate retro experience awaits you."}"
                  </div>
                  
                  <div className="prose prose-sm font-medium">
                    <h3 className="font-black text-black uppercase mb-2 flex items-center gap-2">
                      <FaInfoCircle /> Game Briefing
                    </h3>
                    <p className="leading-relaxed">
                      {game?.description}
                    </p>
                  </div>

                  <div className="pt-6 border-t-2 border-dashed border-gray-300">
                    <h3 className="font-black text-black uppercase mb-4">Controller Configuration</h3>
                    <div className="grid grid-cols-2 gap-3">
                       {['Arrows: Move', 'Z Key: A Button', 'X Key: B Button', 'Enter: Start'].map((c) => (
                         <div key={c} className="bg-gray-100 border-2 border-black px-3 py-2 font-bold text-xs">
                           {c}
                         </div>
                       ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="player"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8"
            >
              {/* CRT TV Frame */}
              <div className="relative bg-[#333] border-[12px] border-[#222] rounded-3xl p-4 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.3)] mx-auto max-w-4xl">
                {/* TV Top Buttons */}
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 flex gap-4">
                  <div className="w-8 h-4 bg-[#444] rounded-t-lg border-x-2 border-t-2 border-black" />
                  <div className="w-8 h-4 bg-[#444] rounded-t-lg border-x-2 border-t-2 border-black" />
                </div>

                {/* The Screen */}
                <div className="relative aspect-video bg-black border-8 border-black overflow-hidden rounded-lg">
                   {romUrl && <EmulatorContainer romUrl={romUrl} />}
                   
                   {/* Scanline Overlay */}
                   <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />
                </div>

                {/* TV Side/Bottom Controls */}
                <div className="mt-6 flex justify-between items-center text-white/40">
                   <div className="font-retro text-[8px]">MODEL: NSTR-2024</div>
                   <div className="flex gap-2">
                     <div className="w-3 h-3 rounded-full bg-red-600 animate-pulse shadow-[0_0_10px_red]" />
                     <div className="w-3 h-3 rounded-full bg-green-500 opacity-50" />
                   </div>
                </div>
              </div>

              {/* Player UI Buttons */}
              <div className="flex flex-col md:flex-row justify-between items-center gap-6 max-w-4xl mx-auto px-4">
                <div className="flex items-center gap-4 bg-white border-4 border-black p-4 neubrutalism-shadow">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-white rounded-full">
                    <FaGamepad size={24} />
                  </div>
                  <div>
                    <p className="font-black text-black uppercase leading-none">Controller Active</p>
                    <p className="text-[10px] font-retro text-gray-500 mt-1 uppercase">P1 Connected</p>
                  </div>
                </div>

                <button
                  onClick={() => setIsGameRunning(false)}
                  className="px-10 py-4 bg-red-500 text-white font-black border-4 border-black neubrutalism-shadow hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase italic flex items-center gap-2"
                >
                  <IoMdClose size={24} /> Quit Game
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Orientation Warning */}
      <AnimatePresence>
        {showOrientationModal && (
          <div className="fixed inset-0 bg-yellow-400 z-[100] flex flex-col items-center justify-center p-8 text-center font-main">
            <motion.div 
              animate={{ rotate: 90 }} 
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="mb-8"
            >
              <FaSyncAlt size={80} className="text-black" />
            </motion.div>
            <h2 className="text-4xl font-black text-black uppercase mb-4 italic">Rotate Screen!</h2>
            <p className="text-black font-bold max-w-xs mb-8">
              This arcade cabinet requires Landscape Mode to function correctly.
            </p>
            <button
              onClick={() => setShowOrientationModal(false)}
              className="bg-black text-white px-8 py-4 border-4 border-black neubrutalism-shadow"
            >
              GOT IT
            </button>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}