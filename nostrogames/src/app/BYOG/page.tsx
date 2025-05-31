'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { FaArrowLeft } from 'react-icons/fa';
import { FileUpload } from '@/components/ui/file-upload';
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision';

// Emulator container
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
          html, body {
            margin: 0;
            padding: 0;
            width: 100%;
            height: 100%;
            background: black;
            overflow: hidden;
          }
          #game {
            width: 100%;
            height: 100%;
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
        <iframe
            srcDoc={srcDoc}
            sandbox="allow-scripts allow-same-origin"
            style={{
                width: '100%',
                height: '500px',
                border: 'none',
                borderRadius: '0.75rem',
                background: 'black',
            }}
        />
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

    const handleStop = () => {
        setRomUrl(null);
    };

    return (
        <div className="bg-black md:pt-20 min-h-screen">
            <button
                onClick={() => router.back()}
                className="fixed top-10 left-14 p-3 rounded-full bg-gray-800 bg-opacity-50 backdrop-blur-md 
                 border border-white/20 text-white hover:bg-gray-700 transition-all shadow-lg"
                aria-label="Go back"
            >
                <FaArrowLeft size={20} />
            </button>

            <div className="max-w-4xl mx-auto p-6 bg-gradient-to-br from-gray-900 to-gray-800 
                      bg-opacity-50 backdrop-blur-lg rounded-2xl border border-gray-700 shadow-xl">

                {!romUrl ? (
                    <>
                        <h1 className="text-3xl font-extrabold text-transparent bg-clip-text 
                           bg-gradient-to-r from-yellow-400 to-pink-500 mb-4">
                            BYOG — Bring Your Own Game
                        </h1>

                        <p className="text-gray-300 mb-6">
                            Download NES ROMs from{" "}
                            <a
                                href="https://www.emulatorgames.net/roms/nintendo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-yellow-400 hover:text-yellow-300 underline"
                            >
                                emulatorgames.net/roms/nintendo
                            </a>
                            , then upload a <span className="font-mono text-green-300">.nes</span> file below to play.
                        </p>

                        <div className="w-full p-6 bg-opacity-10 bg-black bg-opacity-20 
                            backdrop-blur-md rounded-xl border-2 border-dashed border-gray-600 
                            hover:border-gray-500 transition">
                            <FileUpload onChange={handleFileUpload} />
                        </div>
                    </>
                ) : (
                    <>
                        <div className="w-full h-[500px] bg-black rounded-xl overflow-hidden">
                            <EmulatorContainer romUrl={romUrl} />
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                onClick={handleStop}
                                className="px-6 py-2 rounded-xl font-bold text-white
                           bg-gradient-to-br from-red-600 to-red-800 bg-opacity-30 backdrop-blur-md
                           shadow-lg border border-white/20 hover:from-red-700 hover:to-red-900 transition"
                            >
                                Stop Game
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
