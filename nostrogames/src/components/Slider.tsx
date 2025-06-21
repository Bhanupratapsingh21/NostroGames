'use client';
import Image from 'next/image';
import Link from 'next/link';
import retroGames from '@/Data/Games';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { gametypes } from '@/types/Game.type';
import { FaArrowLeft, FaArrowRight, FaArrowLeftLong } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { FiArrowRight } from 'react-icons/fi';

const Slider = () => {
    const [activeGame, setActiveGame] = useState<gametypes | null>(null);
    const [currentSlide, setCurrentSlide] = useState(0);
    const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const id = useId();
    const router = useRouter();
    const sliderRef = useRef<HTMLDivElement>(null);

    // Featured games for the slider (first 6 games or custom selection)
    const featuredGames = retroGames.slice(0, 6);
    const allGames = retroGames;

    useEffect(() => {
        function onKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') {
                setActiveGame(null);
            }
        }

        if (activeGame) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }

        window.addEventListener('keydown', onKeyDown);
        return () => window.removeEventListener('keydown', onKeyDown);
    }, [activeGame]);

    useOutsideClick(ref, () => setActiveGame(null));

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev === featuredGames.length - 1 ? 0 : prev + 1));
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev === 0 ? featuredGames.length - 1 : prev - 1));
    };

    return (
        <div className="w-full">

            {/* Featured Games Slider */}
            <section className="mb-24 relative max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-300">
                        Featured Games
                    </h2>
                    <div className="flex gap-4">
                        <button
                            onClick={prevSlide}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                            aria-label="Previous slide"
                        >
                            <FaArrowLeft className="text-white" />
                        </button>
                        <button
                            onClick={nextSlide}
                            className="p-2 rounded-full bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                            aria-label="Next slide"
                        >
                            <FaArrowRight className="text-white" />
                        </button>
                    </div>
                </div>

                <div className="relative h-[500px] w-full overflow-hidden rounded-2xl">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="absolute inset-0"
                        >
                            <div className="relative h-full w-full">
                                <Image
                                    src={featuredGames[currentSlide].imgUrl}
                                    alt={featuredGames[currentSlide].name}
                                    fill
                                    className="object-cover"
                                    unoptimized
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent" />
                                <div className="absolute bottom-0 left-0 p-8 w-full">
                                    <div className="max-w mx-auto">
                                        <h3 className="text-3xl md:text-5xl font-bold text-white mb-2">
                                            {featuredGames[currentSlide].name}
                                        </h3>
                                        <p className="text-cyan-400 text-lg mb-4">
                                            {featuredGames[currentSlide].type}
                                        </p>
                                        <p className="text-gray-300 mb-6 line-clamp-2">
                                            {featuredGames[currentSlide].description}
                                        </p>
                                        <div className="flex gap-4">
                                            <button
                                                onClick={() => setActiveGame(featuredGames[currentSlide])}
                                                className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-md rounded-lg font-medium text-white transition-colors border border-white/20"
                                            >
                                                View Details
                                            </button>
                                            <Link
                                                href={`/Games?game=${featuredGames[currentSlide].id}`}
                                                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
                                            >
                                                Play Now <FiArrowRight />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Slider Indicators */}
                <div className="flex justify-center gap-2 mt-6">
                    {featuredGames.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentSlide(index)}
                            className={`w-3 h-3 rounded-full transition-all ${currentSlide === index ? 'bg-cyan-400 w-6' : 'bg-gray-600'}`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </section>

            {/* Expanded Game Modal */}
            <AnimatePresence>
                {activeGame && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 z-40 backdrop-blur-sm"
                        />

                        <div className="fixed inset-0 grid place-items-center z-50 p-4">
                            <motion.div
                                layoutId={`card-${activeGame.id}-${id}`}
                                ref={ref}
                                className="w-full max-w-4xl h-full md:h-[90vh] flex flex-col bg-gray-800 rounded-xl overflow-hidden border border-gray-700 shadow-2xl"
                                initial={{ scale: 0.9, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.9, opacity: 0 }}
                            >
                                <motion.div layoutId={`image-${activeGame.id}-${id}`} className="relative h-96 w-full">
                                    <Image
                                        src={activeGame.imgUrl}
                                        alt={activeGame.name}
                                        fill
                                        className="object-cover"
                                        unoptimized
                                    />
                                </motion.div>

                                <div className="p-6 flex-grow overflow-y-auto">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <motion.h2
                                                layoutId={`title-${activeGame.id}-${id}`}
                                                className="text-3xl font-bold text-white"
                                            >
                                                {activeGame.name}
                                            </motion.h2>
                                            <motion.p
                                                layoutId={`type-${activeGame.id}-${id}`}
                                                className="text-lg text-cyan-400 mt-2"
                                            >
                                                {activeGame.type}
                                            </motion.p>
                                        </div>
                                        <motion.button
                                            onClick={() => setActiveGame(null)}
                                            className="p-2 rounded-full bg-gray-700 hover:bg-gray-600 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                                                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                                                <path d="M18 6l-12 12" />
                                                <path d="M6 6l12 12" />
                                            </svg>
                                        </motion.button>
                                    </div>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.2 }}
                                        className="mt-6 text-gray-300 space-y-4"
                                    >
                                        <p>{activeGame.description}</p>
                                        <div className="flex gap-4 pt-4">
                                            <Link
                                                href={`/Games?game=${activeGame.id}`}
                                                className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium text-white transition-colors flex items-center gap-2"
                                            >
                                                Play Now <FiArrowRight />
                                            </Link>
                                            <button
                                                onClick={() => setActiveGame(null)}
                                                className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white transition-colors"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </motion.div>
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