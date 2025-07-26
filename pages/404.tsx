import Head from "next/head";

export default function Custom404() {
  return (
    <>
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      <div style={styles.container}>
        <div style={styles.card}>
          <h1 style={styles.title}>🚫 404</h1>
          <p style={styles.message}>Sorry, the page you’re looking for doesn’t exist.</p>
          <a href="/" style={styles.button}>Back to Home</a>
        </div>

        <style jsx global>{`
          body {
            margin: 0;
            padding: 0;
            background: #f4f4f7;
            color: #2f3542;
            font-family: 'Segoe UI', sans-serif;
          }

          @media (prefers-color-scheme: dark) {
            body {
              background: #1e1e1e;
              color: #ffffff;
            }

            .card {
              background: #2a2a2a !important;
              box-shadow: 0 8px 24px rgba(0, 0, 0, 0.6) !important;
            }

            .button {
              background: #0a84ff !important;
            }

            code {
              background: #333 !important;
              color: #fff !important;
            }
          }
        `}</style>
      </div>
    </>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "2rem",
  },
  card: {
    background: "#ffffff",
    padding: "3rem 2rem",
    borderRadius: "12px",
    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
    maxWidth: "420px",
    width: "100%",
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
