import type { Metadata } from "next";
import LoginForm from "./LoginForm";
import styles from "./login.module.scss";

export const metadata: Metadata = { title: "Anmelden" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ weiter?: string }>;
}) {
  const { weiter } = await searchParams;
  return (
    <section className={styles.box}>
      <h1>Anmelden</h1>
      <p>Diese App ist passwortgeschützt. Das Passwort bekommst du von der Person, die die App betreut.</p>
      <LoginForm weiter={weiter ?? "/"} />
    </section>
  );
}
