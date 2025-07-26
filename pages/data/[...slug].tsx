import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  redirectUrl: string;
  imageUrl: string;
  title: string;
  shouldRedirect: boolean;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slugParts = context.params?.slug || [];
  const encoded = Array.isArray(slugParts) ? slugParts.join("/") : slugParts;

  if (!encoded) return { notFound: true };

  try {
    const json = Buffer.from(encoded, "base64").toString("utf-8");
    const { redirectUrl, imageUrl, title } = JSON.parse(json);

    const fbclid = context.query.fbclid || "";
    const referer = context.req.headers.referer || "";
    const ua = context.req.headers["user-agent"] || "";

    const isFacebookBot =
      ua.includes("facebookexternal") ||
      ua.includes("Facebot") ||
      fbclid ||
      referer.includes("facebook.com");

    return {
      props: {
        redirectUrl,
        imageUrl,
        title: title || "Redirecting...",
        shouldRedirect: !isFacebookBot, // jangan redirect kalau bot
      },
    };
  } catch (e) {
    return { notFound: true };
  }
};

export default function RedirectPage({
  redirectUrl,
  imageUrl,
  title,
  shouldRedirect,
}: Props) {
  useEffect(() => {
    if (shouldRedirect) {
      const timer = setTimeout(() => {
        window.location.href = redirectUrl;
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [redirectUrl, shouldRedirect]);

  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={`Read more at ${redirectUrl}`} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content="Click to read more on this page." />
        <meta property="og:url" content={redirectUrl} />
        <meta property="og:type" content="website" />
        {imageUrl && <meta property="og:image" content={imageUrl} />}
        <link rel="image_src" href={imageUrl} />
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
        <div style={styles.loadingText}>
          {shouldRedirect ? "Please wait..." : "Preview ready for Facebook"}
        </div>
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
