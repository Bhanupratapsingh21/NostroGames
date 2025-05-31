'use client';
"use client";
import React from "react";
import { Boxes } from "@/components/ui/background-boxes";
import { IoLogoGameControllerB } from 'react-icons/io';
import Image from 'next/image';
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/ui/3d-card';
import { useRouter } from 'next/navigation';
import "./globals.css"
import ColourfulText from "@/components/ui/colourful-text";

export default function Home() {
  const router = useRouter();
  return (
    <div className=" relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
      <div className="absolute inset-0 w-full h-full bg-slate-900 z-20 [mask-image:radial-gradient(transparent,white)] pointer-events-none" />

      {/* Main Content */}
      <div className="relative z-10 mt-36 md:mt-6 flex flex-col h-screen lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-12 max-w-screen-xl mx-auto">
        <Boxes />
        {/* Left: Text Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-6">
          {/* Badge */}
          <div className="flex z-50 items-center gap-4 bg-white/10 text-white text-sm px-8 py-4 w-max rounded-full border border-white/20 font-mono backdrop-blur-md">
            <IoLogoGameControllerB className="text-lg" />
            <div className="w-px h-4 bg-white/40" />
            <span>Your Nostalgia Just Got Dangerous.</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl z-50 lg:text-6xl font-extrabold text-white leading-tight">
            Rediscover Classic <ColourfulText text="Gameing" />
          </h1>

          {/* Description */}
          <p className="text-lg z-50 text-gray-300 leading-relaxed">
            Step into nostalgia reimagined with NostroGames. A minimalist, modern approach to the games that defined an era.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => router.push("/Allgames")}
            className="bg-white z-50 text-black text-lg font-medium px-6 py-3 rounded-2xl transition-all w-fit hover:bg-gray-200"
          >
            Explore Collection
          </button>
        </div>

        {/* Right: 3D Card Image Section */}
        <div className="w-full hidden md:flex lg:w-1/2 justify-center">
          <CardContainer className="inter-var w-full max-w-[500px]">
            <CardBody className="relative group/card dark:hover:shadow-2xl   w-full h-auto rounded-xl p-6  transition-all backdrop-blur-xl">
              <CardItem
                translateZ="100"
                className="w-full"
                style={{ transform: 'scale(1.05)' }}
              >
                <Image
                  src="https://res.cloudinary.com/dhvkjanwa/image/upload/v1747502053/20250517_2229_Cartoon_Arcade_Controller_simple_compose_01jvfjxys0fjtr667dv88p60fy_kdwui8.png"
                  alt="3D Game Controller"
                  width={1000}
                  height={1000}
                  priority
                  className="w-full h-auto object-contain"
                />
              </CardItem>
            </CardBody>
          </CardContainer>
        </div>
      </div>
    </div>

  );
}
