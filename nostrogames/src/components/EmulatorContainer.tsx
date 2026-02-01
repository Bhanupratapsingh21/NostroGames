'use client';
import { useEffect, useRef, useState } from 'react';
import { FaArrowUp, FaArrowDown, FaArrowLeft, FaArrowRight } from 'react-icons/fa';

interface EmulatorContainerProps {
  romUrl: string;
}

export default function EmulatorContainer({ romUrl }: EmulatorContainerProps) {
  const [srcDoc, setSrcDoc] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Show controls on touch devices OR small/medium screens (tablets/mobile)
    const checkMobile = () => {
      const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
      const isSmallScreen = window.innerWidth <= 1024; // Show on tablets and smaller
      setIsMobile(hasTouch || isSmallScreen);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (!romUrl) {
      setSrcDoc('');
      return;
    }

    const html = `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
          <style>
            html, body { 
              margin: 0; 
              padding: 0; 
              width: 100%; 
              height: 100%; 
              overflow: hidden; 
              background: black; 
            }
            #game { width: 100%; height: 100%; }
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

  // Send key events to iframe
  const sendKey = (key: string, type: 'keydown' | 'keyup') => {
    if (!iframeRef.current?.contentWindow) return;
    
    const event = new KeyboardEvent(type, {
      key: key,
      code: key === 'ArrowUp' ? 'ArrowUp' : 
            key === 'ArrowDown' ? 'ArrowDown' :
            key === 'ArrowLeft' ? 'ArrowLeft' :
            key === 'ArrowRight' ? 'ArrowRight' :
            key === 'z' ? 'KeyZ' :
            key === 'x' ? 'KeyX' :
            key === 'Enter' ? 'Enter' : 'Space',
      bubbles: true,
      cancelable: true
    });
    
    iframeRef.current.contentWindow.document.dispatchEvent(event);
  };

  const handleTouchButton = (key: string) => {
    return {
      onTouchStart: (e: React.TouchEvent) => {
        e.preventDefault();
        sendKey(key, 'keydown');
      },
      onTouchEnd: (e: React.TouchEvent) => {
        e.preventDefault();
        sendKey(key, 'keyup');
      },
      onMouseDown: () => sendKey(key, 'keydown'),
      onMouseUp: () => sendKey(key, 'keyup'),
      onMouseLeave: () => sendKey(key, 'keyup'),
    };
  };

  return (
    <div className="relative w-full h-full">
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-same-origin"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
      
      {/* Custom Touch Controls - Only show on mobile/tablets */}
      {isMobile && (
        <div className="absolute inset-0 pointer-events-none z-20">
          {/* D-Pad - Bottom Left */}
          <div className="absolute bottom-6 left-6 pointer-events-auto">
            <div className="relative w-36 h-36 md:w-44 md:h-44">
              {/* Up */}
              <button
                {...handleTouchButton('ArrowUp')}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 border-4 border-black flex items-center justify-center active:bg-yellow-300 touch-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <FaArrowUp className="text-black" size={20} />
              </button>
              
              {/* Down */}
              <button
                {...handleTouchButton('ArrowDown')}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 border-4 border-black flex items-center justify-center active:bg-yellow-300 touch-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <FaArrowDown className="text-black" size={20} />
              </button>
              
              {/* Left */}
              <button
                {...handleTouchButton('ArrowLeft')}
                className="absolute left-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 border-4 border-black flex items-center justify-center active:bg-yellow-300 touch-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <FaArrowLeft className="text-black" size={20} />
              </button>
              
              {/* Right */}
              <button
                {...handleTouchButton('ArrowRight')}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/90 border-4 border-black flex items-center justify-center active:bg-yellow-300 touch-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
              >
                <FaArrowRight className="text-black" size={20} />
              </button>
              
              {/* Center */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-gray-300 border-3 border-black rounded-full" />
            </div>
          </div>

          {/* Action Buttons - Bottom Right */}
          <div className="absolute bottom-6 right-6 pointer-events-auto flex gap-4">
            {/* B Button */}
            <button
              {...handleTouchButton('x')}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-red-500 border-4 border-black flex items-center justify-center font-black text-white text-2xl active:bg-red-600 touch-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] transition-all"
            >
              B
            </button>
            
            {/* A Button */}
            <button
              {...handleTouchButton('z')}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-green-500 border-4 border-black flex items-center justify-center font-black text-white text-2xl active:bg-green-600 touch-none shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[3px] active:translate-y-[3px] transition-all"
            >
              A
            </button>
          </div>

          {/* Start/Select - Bottom Center */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 pointer-events-auto flex gap-3">
            <button
              {...handleTouchButton(' ')}
              className="px-5 py-3 md:px-6 md:py-3 bg-gray-400 border-4 border-black font-bold text-sm text-black active:bg-gray-500 touch-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              SELECT
            </button>
            <button
              {...handleTouchButton('Enter')}
              className="px-5 py-3 md:px-6 md:py-3 bg-yellow-400 border-4 border-black font-bold text-sm text-black active:bg-yellow-500 touch-none shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
            >
              START
            </button>
          </div>
        </div>
      )}
    </div>
  );
}