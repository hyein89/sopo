import { GetServerSideProps } from "next";
import Head from "next/head";
import { useEffect } from "react";

interface Props {
  url: string;
  ogImage?: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.url as string;

  if (!url) {
    return {
      notFound: true,
    };
  }

  let ogImage: string | undefined;

  try {
    const res = await fetch(url, { headers: { "User-Agent": "bot" }, timeout: 5000 });
    const html = await res.text();

    const match = html.match(/<meta[^>]+property=["']og:image["'][^>]+content=["']([^"']+)["']/i);
    if (match && match[1]) {
      ogImage = match[1];
    }
  } catch (err) {
    console.warn("Gagal ambil OG image dari target:", err);
  }

  return {
    props: { url, ogImage },
  };
};

export default function RedirectPage({ url, ogImage }: Props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.href = url;
    }, 2500); // 2.5 detik
    return () => clearTimeout(timer);
  }, [url]);

  return (
    <>
      <Head>
        <title>Mengarahkan...</title>
        <meta name="description" content={`Anda akan diarahkan ke ${url}`} />
        <meta property="og:title" content="Membuka link..." />
        <meta property="og:description" content={`Menuju ${url}`} />
        <meta property="og:image" content={ogImage || "https://via.placeholder.com/800x420?text=Redirecting"} />
        <meta property="og:url" content={url} />
      </Head>

      <main style={styles.container}>
        <div style={styles.loader}></div>
        <p style={{ marginTop: 20, color: "#555", fontSize: "1.1rem" }}>
          Mengarahkan ke <br />
          <code>{url}</code>
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

// Inject animation CSS
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
