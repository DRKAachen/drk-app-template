import type { Metadata } from "next";
import Link from "next/link";
import "@/styles/globals.scss";
import styles from "./layout.module.scss";

// Name der App: in der Oberfläche, im Browser-Tab und im Footer.
const APP_NAME = "Meine DRK-App";

export const metadata: Metadata = {
  title: { default: APP_NAME, template: `%s · ${APP_NAME}` },
  description: "Eine App des DRK Kreisverband Aachen e. V.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const mitLogin = (process.env.AUTH_MODE ?? "none") !== "none";

  return (
    <html lang="de">
      <body>
        <a href="#inhalt" className="skip-link">
          Zum Inhalt springen
        </a>
        <header className={styles.header}>
          <div className={`container ${styles.headerInner}`}>
            <Link href="/" className={styles.brand}>
              <strong>DRK</strong> {APP_NAME}
            </Link>
            <nav className={styles.nav} aria-label="Hauptnavigation">
              <Link href="/">Start</Link>
              <Link href="/beispiel">Beispiel</Link>
              {mitLogin && <a href="/abmelden">Abmelden</a>}
            </nav>
          </div>
        </header>
        <main id="inhalt" className="container" tabIndex={-1}>
          {children}
        </main>
        <footer className={styles.footer}>
          <div className={`container ${styles.footerInner}`}>
            <span>© {new Date().getFullYear()} DRK Kreisverband Aachen e. V.</span>
            <Link href="/impressum">Impressum</Link>
            <Link href="/datenschutz">Datenschutz</Link>
          </div>
        </footer>
      </body>
    </html>
  );
}
