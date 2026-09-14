import Link from "next/link";

export default function NotFound() {
  return (
    <section style={{ textAlign: "center", paddingBlock: "4rem" }}>
      <h1>Seite nicht gefunden</h1>
      <p>Die aufgerufene Seite gibt es nicht oder nicht mehr.</p>
      <Link href="/" className="button">
        Zur Startseite
      </Link>
    </section>
  );
}
