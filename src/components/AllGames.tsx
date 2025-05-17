
import React from 'react';
import GameCard from '@/components/GameCard';
import { Gamepad2 } from 'lucide-react';

// Game data
const featuredGames = [
    {
        id: "super-mario-bros",
        title: "Super Mario Bros.",
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSvEmnCBYZFuDYAwER1J66lJttcmAw9i1dw-Afq51Q47Bft-bMS68vsAHeKeyhKgg3pRsE&usqp=CAU",
        description: "The iconic platformer that defined a generation of gaming. Help Mario rescue Princess Peach from the evil Bowser.",
        accentColor: "neon-red"
    },
    {
        id: "contra",
        title: "Contra",
        imageUrl: "https://cdn.mobygames.com/screenshots/12523364-contra-nintendo-entertainment-system-title-screen.png",
        description: "A run and gun action game that challenges players with intense combat and platforming sequences.",
        accentColor: "neon-orange"
    },
    {
        id: "pac-man",
        title: "Pac-Man",
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/5/59/Pac-man.png",
        description: "Navigate mazes while eating dots and avoiding colorful ghosts in this timeless arcade classic.",
        accentColor: "neon-yellow"
    },
    {
        id: "street-fighter-ii",
        title: "Street Fighter II",
        imageUrl: "https://m.media-amazon.com/images/I/71jdU2csNHL.jpg",
        description: "Master unique fighting styles and special moves in the game that revolutionized the fighting genre.",
        accentColor: "neon-pink"
    },
    {
        id: "sonic-the-hedgehog",
        title: "Sonic the Hedgehog",
        imageUrl: "https://assetsio.reedpopcdn.com/Sonic-1.jpg?width=1200&height=1200&fit=crop&quality=100&format=png&enable=upscale&auto=webp",
        description: "Speed through vibrant levels as the blue blur in SEGA's answer to Nintendo's Mario.",
        accentColor: "neon-blue"
    }
];

const AllGames = () => {
    return (
        <div className="bg-black py-12 md:px-40">
            <div className="flex items-center gap-4 text-cyan-200 my-12">
                <Gamepad2 className="w-7 h-7 text-neon-blue" />
                <h2 className="text-3xl text-white font-bold">Featured Games</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredGames.map((game) => (
                    <GameCard
                        key={game.id}
                        id={game.id}
                        title={game.title}
                        imageUrl={game.imageUrl}
                        description={game.description}
                        accentColor="neon-blue"
                    />
                ))}
            </div>
        </div>
    );
};

export default AllGames;
