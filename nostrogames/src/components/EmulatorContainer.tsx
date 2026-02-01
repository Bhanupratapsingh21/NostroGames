'use client';
import { useEffect, useRef, useState } from 'react';

interface EmulatorContainerProps {
  romUrl: string;
}

export default function EmulatorContainer({ romUrl }: EmulatorContainerProps) {
  const [srcDoc, setSrcDoc] = useState<string>('');
  const [isMobile, setIsMobile] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Detect if device is mobile/touch-enabled
    setIsMobile('ontouchstart' in window || navigator.maxTouchPoints > 0);
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
              touch-action: none;
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
            
            // Enable mobile virtual controls
            window.EJS_mobile = true;
            
            // Additional mobile-friendly settings
            window.EJS_gameParent = '#game';
            window.EJS_biosUrl = '';
            window.EJS_gameName = 'Retro Game';
            window.EJS_color = '#000000';
            window.EJS_startOnLoaded = true;
          </script>
          <script
            src="https://cdn.emulatorjs.org/latest/data/loader.js"
            onerror="console.error('Failed to load EmulatorJS loader.js')"
          ></script>
        </body>
      </html>
    `.trim();

    setSrcDoc(html);
  }, [romUrl]);

  return (
    <div className="relative w-full h-full">
      <iframe
        ref={iframeRef}
        srcDoc={srcDoc}
        sandbox="allow-scripts allow-same-origin"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
      
      {/* Optional: Show mobile indicator */}
      {isMobile && (
        <div className="absolute top-2 right-2 bg-green-500/80 text-white text-xs px-2 py-1 rounded font-bold z-10 pointer-events-none">
          TOUCH CONTROLS ON
        </div>
      )}
    </div>
  );
}