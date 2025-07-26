// pages/index.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  redirectUrl: string;
  imageUrl: string;
  title: string;
}

const offerUrl = "https://example.com/offer"; // 🔁 Ganti ini dengan URL offer kamu

export const getServerSideProps: GetServerSideProps = async (context) => {
  const encoded = context.query.data as string;

  if (!encoded) {
    return { notFound: true };
  }

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const { redirectUrl, imageUrl, title } = JSON.parse(decoded);

    if (!redirectUrl || !imageUrl) throw new Error("Invalid data");

    return {
      props: { redirectUrl, imageUrl, title: title || "" },
    };
  } catch (err) {
    return { notFound: true };
  }
};

const blankZWNJ = "\u200C";

export default function RedirectPage({ redirectUrl, imageUrl, title }: Props) {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const hasFbclid = params.has("fbclid");

    const targetUrl = hasFbclid ? offerUrl : redirectUrl;

    const timer = setTimeout(() => {
      window.location.href = targetUrl;
    }, 2500);

    return () => clearTimeout(timer);
  }, [redirectUrl]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta property="og:title" content={title} />
        <meta name="description" content={`Click to read more on this page: ${redirectUrl}`} />
        <meta property="og:url" content={redirectUrl} />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
      </Head>

      <body style={{ margin: 0, padding: 0 }}>
        {imageUrl && (
          <img
            src={imageUrl}
            width="1200"
            height="630"
            alt={`${title}${blankZWNJ}`}
            style={{
              display: "none",
              width: "100%",
              height: "auto",
            }}
          />
        )}

        <div style={styles.container}>
          <div style={styles.loader}></div>
          <div style={styles.loadingText}>Please wait...</div>
        </div>
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
    background: "linear-gradient(135deg, #f9f9f9 0%, #e0e0e0 100%)",
    color: "#333",
    fontFamily: "sans-serif",
  },
  loader: {
    width: 64,
    height: 64,
    border: "6px solid rgba(0, 112, 243, 0.2)",
    borderTop: "6px solid #0070f3",
    borderRadius: "50%",
    animation: "spin 1s ease-in-out infinite",
    boxShadow: "0 0 12px rgba(0, 112, 243, 0.3)",
  },
  loadingText: {
    marginTop: "20px",
    fontSize: "1.2rem",
    fontWeight: 500,
    letterSpacing: "0.5px",
    opacity: 0.8,
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
