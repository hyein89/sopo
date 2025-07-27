// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    if (typeof window !== 'undefined' && !window['_Hasync']) {
      // Inisialisasi array Histats
      window['_Hasync'] = window['_Hasync'] || [];
      window['_Hasync'].push(['Histats.start', '1,4828760,4,0,0,0,00010000']); // Ganti dengan ID kamu
      window['_Hasync'].push(['Histats.fasi', '1']);
      window['_Hasync'].push(['Histats.track_hits', '']);

      // Tambah script histats
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//s10.histats.com/js15_as.js';
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <Component {...pageProps} />
      <noscript>
        <a href="/" target="_blank">
          <img
            src="//sstatic1.histats.com/0.gif?4828760&101" // Ganti dengan ID kamu
            alt="counter"
            border="0"
          />
        </a>
      </noscript>
    </>
  );
}

export default MyApp;
