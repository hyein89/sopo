// pages/index.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  redirectUrl: string;
  imageUrl: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const urlParam = context.query.url as string;

  if (!urlParam || !urlParam.includes("+")) {
    return {
      notFound: true,
    };
  }

  const [redirectUrl, imageUrl] = urlParam.split("+");

  if (!redirectUrl || !imageUrl) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      redirectUrl,
      imageUrl,
    },
  };
};

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
        <title>Mengarahkan...</title>
        <meta name="description" content={`Anda akan diarahkan ke ${redirectUrl}`} />
        <meta property="og:title" content="Membuka link..." />
        <meta property="og:description" content={`Menuju ${redirectUrl}`} />
        <meta property="og:image" content={imageUrl} />
        <meta property="og:url" content={redirectUrl} />
      </Head>
      <main style={styles.container}>
        <div style={styles.loader}></div>
        <p style={{ marginTop: 20, color: "#555", fontSize: "1.1rem" }}>
          Mengarahkan ke <br />
          <code>{redirectUrl}</code>
        </p>
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
