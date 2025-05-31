'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import {
  FaUserFriends,
  FaArrowUp,
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
} from 'react-icons/fa';
import EyeIcon from '@/components/Icons/eye';
import { gametypes } from '@/types/Game.type';
import retroGames from '@/Data/Games';
import EmulatorContainer from '@/components/EmulatorContainer'; // adjust the path if needed

export default function GameOnePage() {
  const [game, setGame] = useState<gametypes>();
  const [isGameRunning, setIsGameRunning] = useState(false);
  const [romUrl, setRomUrl] = useState<string>('');
  const router = useRouter();

  // On mount, pick up ?game=ID
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
    // When clicking “Play”, show the <iframe> with romUrl
    setIsGameRunning(true);
  };

  const handleStop = () => {
    // Unmount the EmulatorContainer (iframe) and clear URL
    setIsGameRunning(false);
    setRomUrl('');
  };

  return (
    <div className="bg-gray-900 text-white">
      <button
        onClick={() => router.back()}
        className="fixed top-10 left-14 p-3 rounded-full bg-gray-800 bg-opacity-50 backdrop-blur-md 
                       border border-white/20 text-white hover:bg-gray-700 transition-all shadow-lg"
        aria-label="Go back"
      >
        <FaArrowLeft size={20} />
      </button>
      <div className="max-w-4xl min-h-screen mx-auto p-4 ">
        <div className="bg-gray-800 bg-opacity-50 backdrop-blur-md rounded-xl p-6 shadow-lg">
          {!isGameRunning ? (
            <>
              {/* ▶️ BANNER & PLAY UI */}
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

              <div className="flex flex-wrap items-center font-bold mb-6 space-x-6">
                <div className="flex items-center space-x-2">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
                    <FaUserFriends className="text-white" />
                  </div>
                  <span className="text-gray-200">{game?.type || 'Single Player'}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="p-3 bg-white/10 backdrop-blur-sm rounded-full">
                    <EyeIcon />
                  </div>
                  <span className="text-gray-200">{game?.quote}</span>
                </div>
              </div>

              <p className="text-gray-300 leading-relaxed mb-6">
                {game?.description}
              </p>
            </>
          ) : (
            <>
              {/* 🎮 EMBEDDED EMULATOR (iframe) */}
              <div className="w-full h-[480px] bg-black rounded-xl overflow-hidden">
                {romUrl && <EmulatorContainer romUrl={romUrl} />}
              </div>

              {/* 🛑 STOP BUTTON */}
              <div className="mt-6 flex justify-between">
                <button
                  className="px-6 py-2 rounded-xl font-bold text-white
                       bg-gradient-to-br from-blue-500 to-blue-700 bg-opacity-30 backdrop-blur-md
                       shadow-lg border border-white/20 hover:from-blue-600 hover:to-blue-800 transition mr-4"
                  aria-label="Use Keyboard"
                  type="button"
                  tabIndex={-1}
                  disabled
                >
                  Use Button In Your Keyboard As It’s Shown Below
                </button>

                <button
                  onClick={handleStop}
                  className="px-6 py-2 rounded-xl font-bold text-white
                             bg-gradient-to-br from-red-600 to-red-800 bg-opacity-30 backdrop-blur-md
                             shadow-lg border border-white/20 hover:from-red-700 hover:to-red-900 transition"
                >
                  Stop Game
                </button>
              </div>

              {/* 🎛️ ON-SCREEN CONTROLLER UI */}
              <div className="mt-12 flex md:flex-row justify-between px-14 flex-col items-center space-y-8">
                {/* D-PAD */}
                <div className="grid grid-cols-3 grid-rows-3 gap-2">
                  <div /> {/* empty */}
                  <button
                    className="w-14 h-14 flex items-center justify-center rounded-full
                               bg-gradient-to-br from-indigo-600 to-purple-600 bg-opacity-30
                               backdrop-blur-md text-white text-lg font-bold shadow-lg border border-white/20"
                    aria-label="Up"
                  >
                    <FaArrowUp />
                  </button>
                  <div /> {/* empty */}
                  <button
                    className="w-14 h-14 flex items-center justify-center rounded-full
                               bg-gradient-to-br from-indigo-600 to-purple-600 bg-opacity-30
                               backdrop-blur-md text-white text-lg font-bold shadow-lg border border-white/20"
                    aria-label="Left"
                  >
                    <FaArrowLeft />
                  </button>
                  <div /> {/* center blank */}
                  <button
                    className="w-14 h-14 flex items-center justify-center rounded-full
                               bg-gradient-to-br from-indigo-600 to-purple-600 bg-opacity-30
                               backdrop-blur-md text-white text-lg font-bold shadow-lg border border-white/20"
                    aria-label="Right"
                  >
                    <FaArrowRight />
                  </button>
                  <div /> {/* empty */}
                  <button
                    className="w-14 h-14 flex items-center justify-center rounded-full
                               bg-gradient-to-br from-indigo-600 to-purple-600 bg-opacity-30
                               backdrop-blur-md text-white text-lg font-bold shadow-lg border border-white/20"
                    aria-label="Down"
                  >
                    <FaArrowDown />
                  </button>
                  <div /> {/* empty */}
                </div>

                {/* Action Buttons: Z, X, Enter */}
                <div className="flex flex-col items-center space-y-4">
                  <div className="flex space-x-6">
                    <button
                      className="w-14 h-14 flex items-center justify-center rounded-full
                                 bg-gradient-to-br from-pink-500 to-red-500 bg-opacity-30
                                 backdrop-blur-md text-white text-lg font-bold shadow-lg border border-white/20"
                      aria-label="Button Z"
                    >
                      Z
                    </button>
                    <button
                      className="w-14 h-14 flex items-center justify-center rounded-full
                                 bg-gradient-to-br from-pink-500 to-red-500 bg-opacity-30
                                 backdrop-blur-md text-white text-lg font-bold shadow-lg border border-white/20"
                      aria-label="Button X"
                    >
                      X
                    </button>
                  </div>
                  <button
                    className="px-8 py-2 rounded-full font-bold text-white
                               bg-gradient-to-br from-yellow-500 to-yellow-700 bg-opacity-30
                               backdrop-blur-md shadow-lg border border-white/20
                               hover:from-yellow-600 hover:to-yellow-800 transition"
                    aria-label="Enter"
                  >
                    Enter
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
