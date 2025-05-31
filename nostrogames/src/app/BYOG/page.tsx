'use client';
import React, { useState } from "react";
import { FileUpload } from "@/components/ui/file-upload";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";

export default function FileUploadDemo() {
    const router = useRouter();
    const [files, setFiles] = useState<File[]>([]);
    const handleFileUpload = (files: File[]) => {
        setFiles(files);
        console.log(files);
    };

    return (
        <BackgroundBeamsWithCollision className="bg-black min-h-screen">
            <button
                onClick={() => router.back()}
                className="fixed top-10 left-14 p-3 rounded-full bg-gray-800 bg-opacity-50 backdrop-blur-md 
                 border border-white/20 text-white hover:bg-gray-700 transition-all shadow-lg"
                aria-label="Go back"
            >
                <FaArrowLeft size={20} />
            </button>
            <div className="min-h-[400px] w-full max-w-4xl mx-auto mt-12 p-8 
                    bg-gradient-to-br from-gray-900 to-gray-800 bg-opacity-50 
                    backdrop-blur-lg rounded-2xl border border-gray-700">

                {/* Heading */}
                <h1 className="text-3xl font-extrabold text-transparent bg-clip-text 
                     bg-gradient-to-r from-yellow-400 to-pink-500 mb-4">
                    BYOG — Bring Your Own Game
                </h1>

                {/* Instructions */}
                <p className="text-gray-300 mb-6">
                    Want to play your own NES ROMs? Download your favorite NES games from{" "}
                    <a
                        href="https://www.emulatorgames.net/roms/nintendo/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 underline"
                    >
                        emulatorgames.net/roms/nintendo
                    </a>
                    . Once you have a <span className="font-mono text-green-300">.nes</span> file,
                    use the upload area below to load it into the browser. Enjoy classic gaming right here!
                </p>

                {/* File Upload Container */}
                <div className="w-full p-6  bg-opacity-10 bg-black bg-opacity-20 
                      backdrop-blur-md rounded-xl border-2 border-dashed border-gray-600 
                      hover:border-gray-500 transition">
                    <FileUpload onChange={handleFileUpload} />
                </div>

                {/* Preview of Selected Files */}
                {files.length > 0 && (
                    <div className="mt-6 space-y-4">
                        <h2 className="text-xl font-semibold text-green-300">Selected ROM(s):</h2>
                        {files.map((fileObj, idx) => (
                            <div
                                key={idx}
                                className="flex justify-between items-center p-4 bg-gray-800 bg-opacity-30 
                         backdrop-blur-sm rounded-lg"
                            >
                                <div>
                                    <p className="text-gray-200">{fileObj.name}</p>
                                    <p className="text-sm text-gray-400">
                                        {(fileObj.size / 1024).toFixed(2)} KB
                                    </p>
                                </div>
                                <button
                                    onClick={() => {
                                        const newFiles = [...files];
                                        newFiles.splice(idx, 1);
                                        setFiles(newFiles);
                                    }}
                                    className="text-red-400 hover:text-red-600 font-semibold"
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </BackgroundBeamsWithCollision>
    );
}
