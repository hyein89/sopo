// pages/index.tsx
import { GetServerSideProps } from "next";
import Head from "next/head";

interface Props {
  url: string;
  title: string;
  description: string;
  image: string;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const url = context.query.url as string;

  if (!url) {
    return {
      redirect: {
        destination: "https://google.com",
        permanent: false,
      },
    };
  }

  // Metadata fallback (bisa diganti dengan scraping/og-fetch di masa depan)
  const title = "Sedang diarahkan...";
  const description = `Anda akan diarahkan ke ${url}`;
  const image = "https://via.placeholder.com/800x420?text=Redirecting";

  return {
    props: { url, title, description, image },
  };
};

export default function Home({ url, title, description, image }: Props) {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta property="og:url" content={url} />
        <meta httpEquiv="refresh" content={`3;url=${url}`} />
      </Head>
      <main style={{ padding: "2rem", textAlign: "center" }}>
        <h1>🔁 Redirecting...</h1>
        <p>Anda akan diarahkan ke:</p>
        <code>{url}</code>
      </main>
    </>
  );
}
