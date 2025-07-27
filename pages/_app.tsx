// pages/_app.tsx
import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    // Cek apakah sudah ada script Histats
    if (typeof window !== 'undefined' && !window['_Hasync']) {
      const script = document.createElement('script');
      script.type = 'text/javascript';
      script.async = true;
      script.src = '//s10.histats.com/js15_as.js';

      // Inisialisasi Histats
      window['_Hasync'] = window['_Hasync'] || [];
      window['_Hasync'].push(['Histats.start', '1,4828760,4,0,0,0,00010000']); // Ganti dengan kode kamu
      window['_Hasync'].push(['Histats.fasi', '1']);
      window['_Hasync'].push(['Histats.track_hits', '']);

      document.body.appendChild(script);
    }
  }, []);

  return <Component {...pageProps} />;
}

export default MyApp;
