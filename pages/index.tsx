// pages/index.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  redirectUrl: string;
  imageUrl: string;
  title: string;
}

const offerUrl = "https://example.com/offer"; // 🔁 Ganti dengan URL offer kamu

export const getServerSideProps: GetServerSideProps = async (context) => {
  const encoded = context.query.data as string;
  const fbclid = context.query.fbclid;
  const referringURL = context.req.headers.referer || "";

  if (!encoded) return { notFound: true };

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const { redirectUrl, imageUrl, title } = JSON.parse(decoded);

    if (!redirectUrl || !imageUrl) throw new Error("Invalid data");

    // ⛔ Redirect langsung jika dari Facebook
    if (referringURL.includes("facebook.com") || fbclid) {
      return {
        redirect: {
          destination: offerUrl,
          permanent: false,
        },
      };
    }

    // ✅ Jika bukan dari Facebook, lanjut render loading redirect
    return {
      props: {
        redirectUrl,
        imageUrl,
        title: title || "",
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

const blankZWNJ = "\u200C";

export default function RedirectPage({ redirectUrl, imageUrl, title }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = redirectUrl;
    }, 2500);
    return () => clearTimeout(timer);
  }, [redirectUrl]);

  return (
    <>
      <Head>
        <meta property="og:title" content={title} />
        <meta name="description" content={`Click to read more on this page: ${redirectUrl}`} />
        <meta property="og:url" content={redirectUrl} />
        <meta property="og:type" content="website" />
        <link rel="image_src" href="{imageUrl}/>
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <link rel="shortcut icon" href="/varcel.png" type="image/x-icon" />
      </Head>

      <body style={{ margin: 0, padding: 0 }}>
        {imageUrl && (
          <img
            src={imageUrl}
            width="1200"
            height="630"
            alt={`${title}${blankZWNJ}`}
            style={{ display: "none", width: "100%", height: "auto" }}
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

// Inject spin animation to head
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
