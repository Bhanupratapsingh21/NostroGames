'use client';
import Image from 'next/image';
import Link from 'next/link';
import retroGames from '@/Data/Games';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { gametypes } from '@/types/Game.type';
import { FaArrowLeft, FaArrowRight, FaGamepad } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { FiArrowRight, FiInfo } from 'react-icons/fi';
import ColourfulText from './ui/colourful-text';

const Slider = () => {
    const [activeGame, setActiveGame] = useState<gametypes | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const id = useId();
    
    const featuredGames = retroGames.slice(0, 6);

    useOutsideClick(ref, () => setActiveGame(null));

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));
    };

    return (
        <div className="w-full font-main">
            {/* Featured Games Section Header */}
            <section className="mb-12 relative max-w-7xl mx-auto">
                <div className="flex flex-col md:flex-row items-end justify-between mb-8 gap-4">
                    <div>
                        <div className="bg-pink-500 text-white font-retro text-[10px] px-2 py-1 w-fit mb-2 border-2 border-black neubrutalism-shadow">
                            TOP PICKS
                        </div>
                        <h2 className="text-4xl md:text-5xl font-black text-black uppercase italic italic tracking-tighter">
                            Featured <span className="text-cyan-500 underline decoration-8 decoration-black">Releases</span>
                        </h2>
                    </div>
                    
                    {/* Retro Console Style Navigation */}
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="bg-white border-4 border-black p-4 neubrutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-gray-100"
                        >
                            <FaArrowLeft className="text-black" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="bg-white border-4 border-black p-4 neubrutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all active:bg-gray-100"
                        >
                            <FaArrowRight className="text-black" />
                        </button>
                    </div>
                </div>

                {/* Main Slider Card */}
                <div className="relative bg-white border-8 border-black neubrutalism-shadow min-h-[550px] overflow-hidden">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 1.05 }}
                            transition={{ duration: 0.4 }}
                            className="absolute inset-0 flex flex-col md:flex-row"
                        >
                            {/* Left Side: Game Art (The "Cartridge" Image) */}
                            <div className="w-full md:w-1/2 h-[250px] md:h-auto relative border-b-8 md:border-b-0 md:border-r-8 border-black bg-gray-100 overflow-hidden">
                                <Image
                                    src={featuredGames[currentSlide].imgUrl}
                                    alt={featuredGames[currentSlide].name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute top-4 left-4 bg-yellow-400 border-2 border-black px-2 py-1 font-retro text-[8px] neubrutalism-shadow">
                                    NEW ROM
                                </div>
                            </div>

                            {/* Right Side: Game Content */}
                            <div className="w-full md:w-1/2 p-6 md:p-12 flex flex-col justify-center bg-white relative">
                                {/* Diagonal Background Pattern (Decoration) */}
                                <div className="absolute top-0 right-0 w-32 h-32 opacity-10 pointer-events-none">
                                    <div className="w-full h-full bg-[repeating-linear-gradient(45deg,black,black_10px,transparent_10px,transparent_20px)]" />
                                </div>

                                <motion.div
                                    initial={{ x: 20, opacity: 0 }}
                                    animate={{ x: 0, opacity: 1 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <h3 className="text-4xl md:text-6xl font-black text-black mb-2 uppercase leading-none">
                                        {featuredGames[currentSlide].name}
                                    </h3>
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="bg-pink-100 text-pink-600 font-bold px-3 py-1 border-2 border-black text-xs uppercase">
                                            {featuredGames[currentSlide].type}
                                        </span>
                                        <span className="font-retro text-[10px] text-gray-400">ID: 00{featuredGames[currentSlide].id}</span>
                                    </div>
                                    
                                    <p className="text-gray-700 font-medium mb-8 line-clamp-3 text-lg border-l-4 border-yellow-400 pl-4">
                                        {featuredGames[currentSlide].description}
                                    </p>

                                    <div className="flex flex-wrap gap-4 relative z-10">
                                        <button
                                            onClick={() => setActiveGame(featuredGames[currentSlide])}
                                            className="px-6 py-4 bg-white border-4 border-black font-black text-black uppercase flex items-center gap-2 neubrutalism-shadow hover:bg-gray-50 transition-all active:translate-y-1 active:shadow-none"
                                        >
                                            <FiInfo strokeWidth={3} /> Details
                                        </button>
                                        <Link
                                            href={`/Games?game=${featuredGames[currentSlide].id}`}
                                            className="px-8 py-4 bg-green-400 border-4 border-black font-black text-black uppercase flex items-center gap-2 neubrutalism-shadow hover:bg-green-300 transition-all active:translate-y-1 active:shadow-none"
                                        >
                                            Start Game <FiArrowRight strokeWidth={3} />
                                        </Link>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Slider Indicators - Styled like Controller Buttons */}
                <div className="flex justify-center gap-4 mt-10">
                    {featuredGames.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-4 h-4 border-2 border-black transition-all ${
                                currentSlide === index 
                                ? 'bg-pink-500 scale-125 rotate-45' 
                                : 'bg-white hover:bg-gray-200'
                            }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Detailed Info Modal */}
            <AnimatePresence>
                {activeGame && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-yellow-400/40 backdrop-blur-sm z-[100]"
                        />

                        <div className="fixed inset-0 grid place-items-center z-[110] p-4 pointer-events-none">
                            <motion.div
                                layoutId={`card-${activeGame.id}-${id}`}
                                ref={ref}
                                className="w-full max-w-2xl bg-white border-8 border-black p-0 neubrutalism-shadow pointer-events-auto overflow-hidden"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <div className="relative h-64 w-full border-b-8 border-black">
                                    <Image
                                        src={activeGame.imgUrl}
                                        alt={activeGame.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                    <button
                                        onClick={() => setActiveGame(null)}
                                        className="absolute top-4 right-4 bg-red-500 text-white border-4 border-black p-2 font-black hover:bg-white hover:text-red-500 transition-colors"
                                    >
                                        [X]
                                    </button>
                                </div>

                                <div className="p-8">
                                    <h2 className="text-4xl font-black text-black uppercase italic mb-2">
                                        {activeGame.name}
                                    </h2>
                                    <div className="font-retro text-[10px] text-pink-600 mb-6 flex items-center gap-2">
                                        <FaGamepad /> CLASSIC_ROM_v1.0
                                    </div>

                                    <div className="bg-gray-50 border-4 border-black p-4 mb-8">
                                        <p className="text-gray-700 font-medium leading-relaxed">
                                            {activeGame.description}
                                        </p>
                                    </div>

                                    <div className="flex gap-4">
                                        <Link
                                            href={`/Games?game=${activeGame.id}`}
                                            className="flex-1 text-center py-4 bg-cyan-400 text-black font-black border-4 border-black neubrutalism-shadow uppercase italic"
                                        >
                                            PLAY NOW
                                        </Link>
                                        <button
                                            onClick={() => setActiveGame(null)}
                                            className="px-8 py-4 bg-white border-4 border-black font-black text-black neubrutalism-shadow uppercase"
                                        >
                                            BACK
                                        </button>
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

export default Slider;