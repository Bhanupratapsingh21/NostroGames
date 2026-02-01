'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft, FaGamepad, FaInfoCircle } from 'react-icons/fa';
import { FileUpload } from '@/components/ui/file-upload';
import { motion, AnimatePresence } from 'framer-motion';
import ColourfulText from "@/components/ui/colourful-text";

// Emulator container - Styled like a Retro Monitor
const EmulatorContainer = ({ romUrl }: { romUrl: string }) => {
    const [srcDoc, setSrcDoc] = useState<string>('');

    useEffect(() => {
        if (!romUrl) return;

        const html = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <style>
          html, body { margin: 0; padding: 0; width: 100%; height: 100%; background: #000; overflow: hidden; }
          #game { width: 100%; height: 100%; }
          /* CRT Scanline effect inside emulator */
          body::after {
            content: " ";
            z-index: 100;
            position: absolute;
            top: 0; left: 0; bottom: 0; right: 0;
            background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.1) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
            background-size: 100% 3px, 3px 100%;
            pointer-events: none;
          }
        </style>
      </head>
      <body>
        <div id="game"></div>
        <script>
          window.EJS_player = '#game';
          window.EJS_core = 'nes';
          window.EJS_pathtodata = 'https://cdn.emulatorjs.org/latest/data/';
          window.EJS_gameUrl = '${romUrl}';
          window.EJS_startOnLoaded = true;
        </script>
        <script src="https://cdn.emulatorjs.org/latest/data/loader.js"></script>
      </body>
      </html>
    `.trim();
        setSrcDoc(html);
    }, [romUrl]);

    return (
        <div className="relative p-2 bg-black border-[6px] border-black neubrutalism-shadow rounded-sm">
            <iframe
                srcDoc={srcDoc}
                sandbox="allow-scripts allow-same-origin"
                className="w-full h-[300px] md:h-[500px] border-none block"
            />
        </div>
    );
};

export default function PlayCustomROM() {
    const router = useRouter();
    const [romUrl, setRomUrl] = useState<string | null>(null);

    const handleFileUpload = (files: File[]) => {
        if (files.length > 0) {
            const file = files[0];
            const url = URL.createObjectURL(file);
            setRomUrl(url);
        }
    };

    return (
        <div className="min-h-screen bg-grid-pattern font-main p-4 md:p-10 flex flex-col items-center">
            
            {/* Back Button - Neubrutalism Style */}
            <button
                onClick={() => router.back()}
                className="fixed top-6 left-6 z-50 p-4 bg-white border-4 border-black neubrutalism-shadow hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all"
            >
                <FaArrowLeft size={20} className="text-black" />
            </button>

            <div className="w-full max-w-4xl mt-12">
                <AnimatePresence mode="wait">
                    {!romUrl ? (
                        <motion.div
                            key="upload-section"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-8"
                        >
                            {/* Header */}
                            <div className="text-center space-y-4">
                                <div className="inline-block bg-yellow-400 border-4 border-black px-4 py-1 neubrutalism-shadow -rotate-2 mb-4">
                                    <span className="font-retro text-xs text-black">CUSTOM CARTRIDGE SLOT</span>
                                </div>
                                <h1 className="text-4xl md:text-6xl font-black text-black leading-tight uppercase italic">
                                    BRING YOUR <br />
                                    <ColourfulText text="OWN GAME" />
                                </h1>
                            </div>

                            {/* Info Box */}
                            <div className="bg-cyan-100 border-4 border-black p-6 flex gap-4 items-start neubrutalism-shadow">
                                <FaInfoCircle className="text-cyan-600 text-3xl shrink-0" />
                                <div>
                                    <p className="font-bold text-black uppercase text-sm mb-1">How to play:</p>
                                    <p className="text-gray-700 text-sm">
                                        Download a <span className="font-bold">.nes</span> ROM from 
                                        <a href="https://www.emulatorgames.net/roms/nintendo/" target="_blank" className="mx-1 text-pink-600 underline font-black">emulatorgames.net</a> 
                                        and drop it below. No data is sent to our servers; it stays in your browser!
                                    </p>
                                </div>
                            </div>

                            {/* Upload Area Wrapper */}
                            <div className="bg-white border-8 border-black p-4 md:p-8 neubrutalism-shadow relative">
                                <div className="absolute -top-6 -right-6 w-12 h-12 bg-pink-500 border-4 border-black rounded-full animate-bounce flex items-center justify-center">
                                    <FaGamepad className="text-white" />
                                </div>
                                <div className="bg-gray-50 border-4 border-dashed border-gray-400 p-2">
                                    <FileUpload onChange={handleFileUpload} />
                                </div>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="player-section"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="space-y-6"
                        >
                            {/* Emulator UI */}
                            <div className="flex justify-between items-end mb-4">
                                <div className="bg-black text-white px-4 py-2 font-retro text-[10px] flex items-center gap-2">
                                    <div className="w-2 h-2 bg-red-500 animate-pulse rounded-full" />
                                    LIVE_EMULATION_ACTIVE
                                </div>
                                <button
                                    onClick={() => setRomUrl(null)}
                                    className="bg-red-500 text-white font-black px-6 py-2 border-4 border-black neubrutalism-shadow hover:shadow-none hover:translate-x-1 hover:translate-y-1 transition-all uppercase italic"
                                >
                                    Eject Disk
                                </button>
                            </div>

                            <EmulatorContainer romUrl={romUrl} />

                            {/* Instructions below game */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { k: 'Arrows', a: 'Move' },
                                    { k: 'Z / X', a: 'A / B' },
                                    { k: 'Enter', a: 'Start' },
                                    { k: 'Shift', a: 'Select' },
                                ].map((item, i) => (
                                    <div key={i} className="bg-white border-2 border-black p-2 text-center">
                                        <div className="text-[10px] font-retro text-gray-400 uppercase">{item.a}</div>
                                        <div className="font-bold text-black uppercase">{item.k}</div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* Decorative Background Elements */}
            <div className="fixed bottom-10 right-10 opacity-10 pointer-events-none hidden lg:block">
                <h2 className="text-[12rem] font-black leading-none -rotate-12">NES</h2>
            </div>
        </div>
    );
}