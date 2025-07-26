import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  url: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.url as string;

  // Kalau url tidak ada → tampilkan 404
  if (!url) {
    return {
      notFound: true,
    };
  }

  return {
    props: { url },
  };
};

export default function RedirectPage({ url }: Props) {
  return (
    <>
      <Head>
        <title>Redirecting to {url}</title>
        <meta name="description" content={`You will be redirected to ${url}`} />
        <meta property="og:title" content="Cek link ini" />
        <meta property="og:description" content={`Link ini akan membawa kamu ke: ${url}`} />
        <meta property="og:image" content="https://via.placeholder.com/800x420?text=Redirecting" />
        <meta property="og:url" content={url} />
        {/* Tidak auto-redirect! */}
      </Head>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>🔗 Anda akan diarahkan ke:</h1>
        <p style={{ fontSize: "1.2rem", color: "#555" }}>{url}</p>
        <a
          href={url}
          style={{
            marginTop: "2rem",
            display: "inline-block",
            padding: "12px 20px",
            background: "#0070f3",
            color: "#fff",
            borderRadius: "5px",
            textDecoration: "none",
          }}
        >
          Klik untuk lanjut
        </a>
      </main>
    </>
  );
}
