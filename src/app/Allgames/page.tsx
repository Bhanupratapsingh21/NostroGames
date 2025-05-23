'use client';
import Image from 'next/image';
import Link from 'next/link';
import retroGames from '@/Data/Games';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect, useId } from 'react';
import { useOutsideClick } from '@/hooks/use-outside-click';
import { gametypes } from '@/types/Game.type';

const MiniGamesSection = () => {
    const [activeGame, setActiveGame] = useState<gametypes | null>();
    const ref = useRef<HTMLDivElement>(null) as React.RefObject<HTMLDivElement>;
    const id = useId();

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

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 via-purple-900 to-gray-800 px-14 sm:px-6 lg:px-8 py-24 relative">
            {/* Expanded Game Modal */}
            <AnimatePresence>
                {activeGame && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/70 z-10"
                        />

                        <div className="fixed inset-0 grid place-items-center z-20">
                            <motion.div
                                layoutId={`card-${activeGame.id}-${id}`}
                                ref={ref}
                                className="w-full max-w-4xl h-full md:h-[90vh] flex flex-col bg-accent-foreground  rounded-xl overflow-hidden border border-gray-700"
                            >
                                <motion.div layoutId={`image-${activeGame.id}-${id}`} className="relative h-96 w-full">
                                    <Image
                                        src={activeGame.imgUrl}
                                        alt={activeGame.name}
                                        fill
                                        className="object-cover"
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
                                        className="mt-6 text-gray-300 space-y-4"
                                    >
                                        <p>{activeGame.description}</p>
                                        <div className="flex gap-4">
                                            <Link
                                                href={`/Games?game=${activeGame.id}`}
                                                className="px-6 mt-6 py-3 bg-cyan-500 hover:bg-cyan-600 rounded-lg font-medium text-white transition-colors"
                                            >
                                                Play Now
                                            </Link>
                                        </div>
                                    </motion.div>
                                </div>
                            </motion.div>
                        </div>
                    </>
                )}
            </AnimatePresence>

            {/* Featured Games Section */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-300">
                        Featured Games
                    </h2>
                </div>

                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {retroGames.slice(retroGames.length / 2).map((game) => (
                        <motion.div
                            layoutId={`card-${game.id}-${id}`}
                            key={game.id}
                            onClick={() => setActiveGame(game)}
                            className="group flex flex-col rounded-xl bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                        >
                            <div className="relative h-96 w-full overflow-hidden rounded-t-xl">
                                <Image
                                    src={game.imgUrl}
                                    alt={game.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{game.name}</h3>
                                        <p className="text-base text-cyan-400 mt-2">{game.type}</p>
                                    </div>
                                    <span className="bg-gray-900/80 text-cyan-400 text-sm px-3 py-1 rounded-full">
                                        {game.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-4">{game.quote}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* Trending Games Section */}
            <section className="mb-16">
                <div className="flex items-center justify-between mb-8 max-w-4xl mx-auto">
                    <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-400">
                        Trending Now
                    </h2>

                </div>

                <div className="grid grid-cols-1 gap-6 max-w-4xl mx-auto">
                    {retroGames.slice(0, retroGames.length / 2).map((game) => (
                        <motion.div
                            layoutId={`card-${game.id}-${id}`}
                            key={game.id}
                            onClick={() => setActiveGame(game)}
                            className="group flex flex-col rounded-xl bg-gray-800/50 backdrop-blur-lg border border-gray-700 hover:border-cyan-400/30 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/10 cursor-pointer"
                        >
                            <div className="relative h-96 w-full overflow-hidden rounded-t-xl">
                                <Image
                                    src={game.imgUrl}
                                    alt={game.name}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                            </div>

                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">{game.name}</h3>
                                        <p className="text-base text-cyan-400 mt-2">{game.type}</p>
                                    </div>
                                    <span className="bg-gray-900/80 text-cyan-400 text-sm px-3 py-1 rounded-full">
                                        {game.type}
                                    </span>
                                </div>
                                <p className="text-sm text-gray-300 mt-4">{game.quote}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </section>
        </div>
    );
};

export default MiniGamesSection;