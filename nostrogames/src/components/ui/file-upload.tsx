'use client';
import { cn } from "@/lib/utils";
import React, { useRef, useState } from "react";
import { motion } from "framer-motion"; // Note: Changed to framer-motion for standard compatibility
import { IconUpload, IconFileDescription, IconX } from "@tabler/icons-react";
import { useDropzone } from "react-dropzone";

const mainVariant = {
  initial: {
    x: 0,
    y: 0,
  },
  animate: {
    x: 10,
    y: -10,
    scale: 1.05,
  },
};

const secondaryVariant = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 1,
  },
};

export const FileUpload = ({
  onChange,
}: {
  onChange?: (files: File[]) => void;
}) => {
  const [files, setFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (newFiles: File[]) => {
    setFiles((prevFiles) => [...prevFiles, ...newFiles]);
    onChange && onChange(newFiles);
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const { getRootProps, isDragActive } = useDropzone({
    multiple: false,
    noClick: true,
    onDrop: handleFileChange,
  });

  return (
    <div className="w-full font-main" {...getRootProps()}>
      <motion.div
        onClick={handleClick}
        whileHover="animate"
        className="p-10 group/file block bg-white border-4 border-black neubrutalism-shadow cursor-pointer w-full relative overflow-hidden transition-colors hover:bg-yellow-50"
      >
        <input
          ref={fileInputRef}
          id="file-upload-handle"
          type="file"
          accept=".nes"
          onChange={(e) => handleFileChange(Array.from(e.target.files || []))}
          className="hidden"
        />

        {/* Decorative Grid Background - Lighter for light theme */}
        <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent)] pointer-events-none">
          <GridPattern />
        </div>

        <div className="flex flex-col items-center justify-center relative z-20">
          <div className="bg-pink-500 border-2 border-black px-3 py-1 mb-4 -rotate-1">
             <p className="font-retro text-[10px] text-white uppercase tracking-tighter">
                Input Slot 01
             </p>
          </div>
          
          <p className="font-black text-2xl text-black uppercase italic tracking-tight">
            Insert Cartridge
          </p>
          <p className="text-gray-600 font-medium text-sm mt-2 text-center">
            Drag & Drop your <span className="text-pink-600 font-bold">.nes</span> file here <br />
            or click to browse local files
          </p>

          <div className="relative w-full mt-10 max-w-xl mx-auto">
            {files.length > 0 ? (
              files.map((file, idx) => (
                <motion.div
                  key={"file" + idx}
                  layoutId={idx === 0 ? "file-upload" : "file-upload-" + idx}
                  className={cn(
                    "relative overflow-hidden z-40 bg-yellow-300 border-4 border-black p-4 mt-4 w-full mx-auto neubrutalism-shadow",
                  )}
                >
                  <div className="flex justify-between w-full items-center gap-4">
                    <div className="flex items-center gap-2">
                        <IconFileDescription className="text-black" />
                        <motion.p
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          layout
                          className="text-base font-bold text-black truncate max-w-xs uppercase"
                        >
                          {file.name}
                        </motion.p>
                    </div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      layout
                      className="px-2 py-1 text-[10px] font-retro bg-black text-white shrink-0"
                    >
                      {(file.size / (1024)).toFixed(0)} KB
                    </motion.p>
                  </div>

                  <div className="flex text-xs items-center w-full mt-3 justify-between font-bold text-black/60 uppercase">
                    <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} layout>
                      Format: {file.name.split('.').pop()}
                    </motion.p>
                    <button 
                        onClick={(e) => {
                            e.stopPropagation();
                            setFiles([]);
                        }}
                        className="text-red-600 hover:text-red-800 flex items-center gap-1"
                    >
                        <IconX size={14} strokeWidth={3} /> Clear
                    </button>
                  </div>
                </motion.div>
              ))
            ) : (
              // Empty State Icon (The "Cartridge" visual)
              <div className="relative">
                <motion.div
                    layoutId="file-upload"
                    variants={mainVariant}
                    transition={{
                    type: "spring",
                    stiffness: 300,
                    damping: 20,
                    }}
                    className={cn(
                    "relative z-40 bg-white border-4 border-black flex items-center justify-center h-32 w-full max-w-[10rem] mx-auto neubrutalism-shadow",
                    isDragActive ? "bg-cyan-300" : "bg-white"
                    )}
                >
                    {isDragActive ? (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-black font-black italic flex flex-col items-center"
                    >
                        DROP!
                        <IconUpload className="h-6 w-6" strokeWidth={3} />
                    </motion.div>
                    ) : (
                        <div className="flex flex-col items-center gap-2">
                            <IconUpload className="h-8 w-8 text-black" strokeWidth={3} />
                            <span className="font-retro text-[8px]">READY</span>
                        </div>
                    )}
                </motion.div>

                {/* The "Ghost" Background border for the animation */}
                <motion.div
                    variants={secondaryVariant}
                    className="absolute border-4 border-dashed border-black/20 inset-0 z-30 bg-transparent flex items-center justify-center h-32 w-full max-w-[10rem] mx-auto"
                />
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export function GridPattern() {
  const columns = 41;
  const rows = 11;
  return (
    <div className="flex shrink-0 flex-wrap justify-center items-center gap-x-px gap-y-px scale-105">
      {Array.from({ length: rows }).map((_, row) =>
        Array.from({ length: columns }).map((_, col) => {
          const index = row * columns + col;
          return (
            <div
              key={`${col}-${row}`}
              className={`w-10 h-10 flex shrink-0 border-[0.5px] border-black/5 ${
                index % 2 === 0 ? "bg-transparent" : "bg-gray-50"
              }`}
            />
          );
        })
      )}
    </div>
  );
}