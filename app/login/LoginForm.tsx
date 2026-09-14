"use client";

import { useActionState } from "react";
import { anmelden, type LoginState } from "./actions";
import styles from "./login.module.scss";

export default function LoginForm({ weiter }: { weiter: string }) {
  const [state, action, pending] = useActionState<LoginState, FormData>(anmelden, {});

  return (
    <form action={action} className={styles.form}>
      <input type="hidden" name="weiter" value={weiter} />
      <label htmlFor="passwort">Passwort</label>
      <input id="passwort" name="passwort" type="password" autoComplete="current-password" required autoFocus />
      {state.fehler && (
        <p role="alert" className={styles.fehler}>
          {state.fehler}
        </p>
      )}
      <button type="submit" className="button" disabled={pending}>
        {pending ? "Wird geprüft …" : "Anmelden"}
      </button>
    </form>
  );
}
