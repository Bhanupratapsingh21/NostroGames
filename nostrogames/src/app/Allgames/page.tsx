'use client';
import Image from 'next/image';
import Link from 'next/link';
import retroGames from '@/Data/Games';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { gametypes } from '@/types/Game.type';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiPlay } from 'react-icons/fi';
import Slider from '@/components/Slider';

const MiniGamesSection = () => {
    const [activeGame, setActiveGame] = useState<gametypes | null>(null);
    const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const id = useId();
    const router = useRouter();

    const allGames = retroGames;

    useOutsideClick(ref, () => setActiveGame(null));

    return (
        <div className="w-full bg-[#fdfdfd] text-black px-4 sm:px-6 lg:px-8 py-16 relative min-h-screen font-retro overflow-hidden">
            {/* Retro Polka Dot Background */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{ backgroundImage: 'radial-gradient(#000 1.5px, transparent 1.5px)', backgroundSize: '30px 30px' }}
            ></div>

            {/* Back Button */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-6 z-30 px-4 py-2 bg-yellow-400 border-4 border-black flex items-center gap-2 shadow-[4px_4px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all font-bold"
            >
                <FaArrowLeftLong size={20} />
                <span className="hidden sm:inline">BACK</span>
            </button>

            {/* Hero Section */}
            <div className="max-w-7xl mx-auto text-center mb-16 relative z-10 mt-8">
                <motion.h1
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="text-4xl md:text-7xl font-black mb-6 tracking-tight drop-shadow-[6px_6px_0px_#3b82f6]"
                >
                    RETRO ARCADE
                </motion.h1>
                <p className="text-lg md:text-xl font-bold bg-pink-500 text-white inline-block px-4 py-2 border-2 border-black rotate-2 shadow-[4px_4px_0px_0px_#000000]">
                    PRESS START TO PLAY!
                </p>
            </div>

            {/* Slider Section Container */}
            <div className="relative z-10 mb-20 max-w-7xl mx-auto border-4 border-black bg-white shadow-[12px_12px_0px_0px_#000000] p-1">
                <Slider />
            </div>

            {/* All Games Grid */}
            <section className="max-w-7xl mx-auto relative z-10">
                <div className="mb-10 inline-flex items-center gap-3 border-b-4 border-black pb-2">
                    <span className="h-6 w-6 bg-red-500 border-2 border-black rounded-full animate-bounce"></span>
                    <h2 className="text-3xl font-black text-black">ALL GAMES</h2>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {allGames.map((game, idx) => {
                        // Alternate colors for tags based on index
                        const tagColors = ['bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-400'];
                        const colorClass = tagColors[idx % tagColors.length];

                        return (
                            <motion.div
                                layoutId={`card-${game.id}-${id}`}
                                key={game.id}
                                onClick={() => setActiveGame(game)}
                                whileHover={{ scale: 1.03, rotate: -1 }}
                                className="group bg-white border-4 border-black cursor-pointer shadow-[8px_8px_0px_0px_#000000] hover:shadow-[12px_12px_0px_0px_#ec4899] transition-all duration-200 flex flex-col overflow-hidden"
                            >
                                <div className="relative h-56 w-full border-b-4 border-black bg-gray-100 p-2">
                                    <div className="relative w-full h-full border-2 border-black overflow-hidden">
                                        <Image
                                            src={game.imgUrl}
                                            alt={game.name}
                                            fill
                                            unoptimized
                                            className="object-cover group-hover:scale-110 transition-transform duration-500"
                                        />
                                    </div>
                                </div>

                                <div className="p-5 flex-grow bg-[#fffbef]">
                                    <div className="flex justify-between items-start mb-3">
                                        <h3 className="text-xl font-black text-black line-clamp-1">{game.name}</h3>
                                        <span className={`${colorClass} text-white border-2 border-black px-2 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_#000000]`}>
                                            {game.type}
                                        </span>
                                    </div>
                                    <p className="text-sm font-medium text-gray-700 line-clamp-2">{game.quote}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* BYOG CTA */}
            <div className="max-w-7xl mx-auto text-center mt-24 mb-10 relative z-10">
                <Link
                    href="/BYOG"
                    className="inline-flex items-center bg-green-500 px-8 py-6 text-xl font-black text-white border-4 border-black shadow-[8px_8px_0px_0px_#000000] hover:shadow-none hover:translate-x-2 hover:translate-y-2 transition-all active:bg-green-600 group"
                >
                    <span className="mr-3">BRING YOUR OWN GAME</span>
                    <FiArrowRight size={24} className="group-hover:translate-x-2 transition-transform" />
                </Link>
            </div>

            {/* Expanded Game Modal */}
            <AnimatePresence>
                {activeGame && (
                    <>
                        {/* Dim Overlay with slight color */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-blue-900/60 z-[60] backdrop-blur-sm"
                        />

                        <div className="fixed inset-0 grid place-items-center z-[70] p-4">
                            <motion.div
                                layoutId={`card-${activeGame.id}-${id}`}
                                ref={ref}
                                className="w-full max-w-3xl bg-white border-4 border-black shadow-[16px_16px_0px_0px_#ec4899] flex flex-col md:flex-row overflow-hidden"
                            >
                                {/* Left Side: Image */}
                                <div className="relative w-full md:w-1/2 h-64 md:h-auto border-b-4 md:border-b-0 md:border-r-4 border-black bg-gray-100 p-4">
                                    <div className="relative w-full h-full border-4 border-black">
                                        <Image
                                            src={activeGame.imgUrl}
                                            alt={activeGame.name}
                                            fill
                                            className="object-cover"
                                            unoptimized
                                        />
                                    </div>
                                </div>

                                {/* Right Side: Content */}
                                <div className="w-full md:w-1/2 p-6 flex flex-col justify-between bg-[#fffbef]">
                                    <div>
                                        <div className="flex justify-between items-start mb-4">
                                            <h2 className="text-3xl font-black text-black leading-tight">
                                                {activeGame.name}
                                            </h2>
                                            <button
                                                onClick={() => setActiveGame(null)}
                                                className="bg-red-500 text-white p-1 border-2 border-black shadow-[2px_2px_0px_0px_#000000] active:shadow-none active:translate-y-1"
                                            >
                                                [X]
                                            </button>
                                        </div>
                                        <span className="bg-blue-500 text-white px-2 py-1 border-2 border-black font-bold text-xs shadow-[2px_2px_0px_0px_#000000]">
                                            {activeGame.type}
                                        </span>
                                        <p className="mt-6 text-sm font-medium leading-relaxed text-gray-800">
                                            {activeGame.description}
                                        </p>
                                    </div>

                                    <div className="mt-8">
                                        <Link
                                            href={`/Games?game=${activeGame.id}`}
                                            className="w-full flex justify-center items-center gap-2 bg-yellow-400 py-4 font-black text-black text-lg border-4 border-black shadow-[6px_6px_0px_0px_#000000] hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all"
                                        >
                                            <FiPlay size={20} className="fill-black" />
                                            PLAY NOW
                                        </Link>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default MiniGamesSection;