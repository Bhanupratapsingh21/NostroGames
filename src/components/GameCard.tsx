
import React from 'react';
import Link from 'next/link';
import { Play } from 'lucide-react';

export interface GameCardProps {
  id: string;
  title: string;
  imageUrl: string;
  description: string;
  accentColor?: string;
}

const GameCard = ({ id, title, imageUrl, description, accentColor = 'neon-blue' }: GameCardProps) => {
  return (
    <Link
      href={`/game/${id}`}
      className={`block bg-black rounded-lg overflow-hidden game-card-hover pixel-corners border border-${accentColor}/20`}
    >
      <div className="aspect-video relative overflow-hidden">
        <img 
          src={imageUrl} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105" 
        />
        <div className="absolute inset-0 bg-gradient-href-t from-background href-transparent" />
        <div 
          className={`absolute hrefp-4 right-4 bg-${accentColor}/20 p-2 rounded-full backdrop-blur-sm
          hover:bg-${accentColor}/40 transition-colors`}
        >
          <Play className={`w-5 h-5 text-${accentColor}`} />
        </div>
      </div>
      <div className="p-4">
        <h3 className={`text-xl font-bold text-gray-400`}>{title}</h3>
        <p className="mt-2 text-sm text-gray-500 line-clamp-2">{description}</p>
      </div>
    </Link>
  );
};

export default GameCard;
