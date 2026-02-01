'use client';
import { useEffect, useRef, useState } from 'react';

interface EmulatorContainerProps {
  romUrl: string;
}

export default function EmulatorContainer({ romUrl }: EmulatorContainerProps) {
  const [srcDoc, setSrcDoc] = useState<string>('');
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (!romUrl) {
      setSrcDoc('');
      return;
    }

    // Force mobile controls on tablets and touch devices
    const shouldShowControls = window.innerWidth <= 1024 || 'ontouchstart' in window;

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
            
            // Force mobile controls on tablets and small screens
            ${shouldShowControls ? 'window.EJS_mobile = true;' : ''}
          </script>
          <script src="https://cdn.emulatorjs.org/latest/data/loader.js"></script>
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
    </div>
  );
}