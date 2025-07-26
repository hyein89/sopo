import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Halaman Tidak Ditemukan</title>
      </Head>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🚫 404</h1>
          <p style={styles.message}>
            URL tujuan tidak ditemukan. Mohon sertakan parameter <code style={styles.code}>?url=</code>.
          </p>
          <a href="/" style={styles.button}>Kembali ke Beranda</a>
        </div>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    margin: 0,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #f4f4f7, #dfe4ea)",
    fontFamily: "'Segoe UI', sans-serif",
    color: "#2f3542",
  },
  card: {
    background: "#ffffff",
    padding: "3rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: "420px",
    textAlign: "center",
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  message: {
    fontSize: "1.1rem",
    marginBottom: "2rem",
    lineHeight: 1.5,
  },
  code: {
    background: "#f1f2f6",
    padding: "0.2rem 0.5rem",
    borderRadius: "6px",
    fontFamily: "monospace",
  },
  button: {
    display: "inline-block",
    background: "#0070f3",
    color: "#fff",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: 600,
    transition: "background 0.3s ease",
  },
};
