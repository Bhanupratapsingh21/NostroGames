'use client';
import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { FaArrowLeft, FaGamepad, FaSyncAlt } from 'react-icons/fa';
import { IoMdClose } from 'react-icons/io';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EmulatorContainer from '@/components/EmulatorContainer';

export default function GameOnePage() {
  const [game, setGame] = useState<gametypes>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [romUrl, setRomUrl] = useState<string>('');
  const [isPortrait, setIsPortrait] = useState(false);
  const [showOrientationModal, setShowOrientationModal] = useState(false);
  const gameContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  // Check orientation and handle changes
  useEffect(() => {
    const checkOrientation = () => {
      const portrait = window.matchMedia('(orientation: portrait)').matches;
      setIsPortrait(portrait);
      setShowOrientationModal(portrait && isGameRunning);
    };

    checkOrientation();
    window.addEventListener('resize', checkOrientation);
    return () => window.removeEventListener('resize', checkOrientation);
  }, [isGameRunning]);

  // Lock orientation to landscape when game starts (iOS 13+)
  useEffect(() => {
    if (isGameRunning) {
      try {
        // @ts-ignore - This is for iOS Safari
        screen.orientation?.lock('landscape');
      } catch (e) {
        console.log('Orientation lock not supported');
      }
    }

    return () => {
      try {
        // @ts-ignore
        screen.orientation?.unlock();
      } catch (e) {
        console.log('Orientation unlock failed');
      }
    };
  }, [isGameRunning]);

  // Load game data
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('game');
    if (id) {
      const current = retroGames.find((g) => g.id === Number(id));
      setGame(current);
      if (current?.nesUrl) {
        setRomUrl(current.nesUrl);
      }
    }
  }, []);

  const handlePlay = () => {
    setIsGameRunning(true);
    // Show orientation modal if in portrait mode
    if (window.matchMedia('(orientation: portrait)').matches) {
      setShowOrientationModal(true);
    }
  };

  const handleStop = () => {
    setIsGameRunning(false);
    setRomUrl('');
    setShowOrientationModal(false);
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen overflow-y-auto">
      {/* Back Button */}
      <button
        onClick={() => router.back()}
        className="fixed top-4 left-4 z-50 p-3 rounded-full bg-gray-800 bg-opacity-50 backdrop-blur-md 
                   border border-white/20 text-white hover:bg-gray-700 transition-all shadow-lg"
        aria-label="Go back"
      >
        <FaArrowLeft size={20} />
      </button>

      <div className="max-w-4xl mx-auto p-4 pt-16">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-4 md:p-6 shadow-lg">
          {!isGameRunning ? (
            <>
              {/* Game Info View */}
              <div className="mb-6">
                <div className="w-full overflow-hidden rounded-xl">
                  <Image
                    src={game?.imgUrl || '/game/game1.png'}
                    alt={game?.name || 'Game banner'}
                    width={1000}
                    height={200}
                    className="w-full h-auto object-cover"
                    unoptimized
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mb-4 space-y-4 md:space-y-0">
                <h1 className="text-2xl md:text-3xl font-bold text-red-500">
                  {game?.name}
                </h1>
                <div className="flex space-x-4">
                  <button
                    onClick={handlePlay}
                    disabled={!game?.nesUrl}
                    className="px-6 py-2 rounded-xl font-bold text-white disabled:opacity-50 transition
                               bg-gradient-to-br from-green-500 to-green-700 bg-opacity-30 backdrop-blur-md
                               shadow-lg border border-white/20 hover:from-green-600 hover:to-green-800"
                  >
                    {game?.nesUrl ? 'Play' : 'Coming Soon'}
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap items-center font-bold mb-6 gap-4 md:gap-6">
                <div className="flex items-center gap-2">
                  <div className="p-2 md:p-3 bg-white/10 backdrop-blur-sm rounded-full">
                    <FaGamepad className="text-white text-sm md:text-base" />
                  </div>
                  <span className="text-gray-200 text-sm md:text-base">{game?.type || 'Single Player'}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6 text-sm md:text-base">
                {game?.description}
              </p>
            </>
          ) : (
            <>
              {/* Game Running View */}
              <div
                ref={gameContainerRef}
                className="relative w-full aspect-video bg-black rounded-xl overflow-hidden"
              >
                {romUrl && <EmulatorContainer romUrl={romUrl} />}

                {/* Orientation Warning Modal */}
                {showOrientationModal && (
                  <div className="absolute inset-0 bg-black/90 z-20 flex flex-col items-center justify-center p-6 text-center">
                    <div className="animate-spin-slow mb-6">
                      <FaSyncAlt size={48} className="text-yellow-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Rotate Your Device</h3>
                    <p className="text-gray-300 mb-6">
                      For the best gaming experience, please rotate your device to landscape mode.
                    </p>
                    <button
                      onClick={() => setShowOrientationModal(false)}
                      className="px-6 py-2 rounded-lg font-medium text-white
                                 bg-gradient-to-br from-blue-500 to-blue-700 transition"
                    >
                      Continue Anyway
                    </button>
                  </div>
                )}
              </div>

              {/* Controls Section */}
              <div className="mt-6">
                <div className="flex justify-between items-center">
                  <div className="hidden md:flex items-center gap-2 text-sm text-gray-300">
                    <FaGamepad className="text-blue-400" />
                    <span>Use keyboard: Arrow keys, Z, X, Enter</span>
                  </div>

                  <button
                    onClick={handleStop}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg font-medium text-white
                               bg-gradient-to-br from-red-600 to-red-800 bg-opacity-30 backdrop-blur-md
                               shadow-lg border border-white/20 hover:from-red-700 hover:to-red-900 transition"
                  >
                    <IoMdClose /> Stop Game
                  </button>
                </div>

                {/* Mobile Controls Info */}
                <div className="md:hidden mt-4 text-sm text-gray-400 text-center">
                  <p>Touch controls are automatically enabled in landscape mode</p>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}