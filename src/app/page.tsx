'use client';

import { IoLogoGameControllerB } from 'react-icons/io';
import Image from 'next/image';
import {
  CardContainer,
  CardBody,
  CardItem,
} from '@/components/ui/3d-card';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();
  return (
    <div className="flex z-50 mt-36 md:mt-6 flex-col h-screen lg:flex-row items-center justify-between px-6 lg:px-20 py-10 gap-12 max-w-screen-xl mx-auto">

      {/* Left: Text Section */}
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        {/* Badge */}
        <div className="flex items-center gap-4 bg-neutral-100 dark:bg-neutral-800 text-sm px-8 py-4 w-max rounded-full border border-neutral-300 dark:border-neutral-600 font-mono">
          <IoLogoGameControllerB className="text-lg" />
          <div className="w-px h-4 bg-neutral-400" />
          <span>Your Nostalgia Just Got Dangerous.</span>
        </div>

        {/* Heading */}
        <h1 className="text-4xl lg:text-6xl font-extrabold text-white leading-tight">
          Rediscover Classic Gaming
        </h1>

        {/* Description */}
        <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
          Step into nostalgia reimagined with NostroGames. A minimalist, modern approach to the games that defined an era.
        </p>

        {/* CTA Button */}
        <button onClick={()=> router.push("/3sda")} className="bg-black border-1 border-white  text-white text-lg font-medium px-6 py-3 rounded-2xl transition-all w-fit">
          Explore Collection
        </button>
      </div>

      {/* Right: 3D Card Image Section */}
      <div className="w-full hidden md:flex lg:w-1/2 justify-center">
        <CardContainer className="inter-var w-full max-w-[500px]">
          <CardBody className="relative group/card dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-full h-auto rounded-xl p-6 border transition-all">
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
  );
}
