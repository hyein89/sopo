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
        <meta name="description" content={blankZWNJ} />
        <meta property="og:title" content={blankZWNJ}/>
        <meta property="og:url" content={redirectUrl} />
      </Head>
      <body style={{ margin: 0, padding: 0 }}>
        {imageUrl && (
          <img
            src={imageUrl}
            width="1200"
            height="630"
            alt="Thumbnail"
            style={{
              display: 'block',
              width: '100%',
              height: 'auto',
            }}
          />
        )}
        <p style={{ textAlign: 'center' }}>Tunggu sebentar...</p>
      </body>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  loader: {
    width: 80,
    height: 80,
    border: "8px solid #eee",
    borderTop: "8px solid #0070f3",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
};

if (typeof window !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}
