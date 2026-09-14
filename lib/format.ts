// Einheitliche deutsche Darstellung von Datum und Uhrzeit in der Oberfläche.
// Regel: immer 10.09.2026 und 14:30, nie ISO- oder US-Format im UI.

const datum = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  timeZone: "Europe/Berlin",
});

const datumZeit = new Intl.DateTimeFormat("de-DE", {
  day: "2-digit",
  month: "2-digit",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "Europe/Berlin",
});

/** 10.09.2026 */
export function formatDatum(wert: Date | string | number): string {
  return datum.format(new Date(wert));
}

/** 10.09.2026, 14:30 */
export function formatDatumZeit(wert: Date | string | number): string {
  return datumZeit.format(new Date(wert));
}
