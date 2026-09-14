"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/db";

// Server Action: läuft nur auf dem Server, hat direkten Datenbankzugriff.
// Regel: Eingaben IMMER prüfen, bevor sie in die Datenbank gehen.
export async function eintragAnlegen(formData: FormData): Promise<void> {
  const titel = String(formData.get("titel") ?? "").trim();
  const text = String(formData.get("text") ?? "").trim();

  if (titel.length < 2 || titel.length > 120) return;
  if (text.length > 2000) return;

  await prisma.eintrag.create({ data: { titel, text: text || null } });
  revalidatePath("/beispiel");
}

export async function eintragLoeschen(formData: FormData): Promise<void> {
  const id = Number(formData.get("id"));
  if (!Number.isInteger(id)) return;

  await prisma.eintrag.delete({ where: { id } }).catch(() => undefined);
  revalidatePath("/beispiel");
}
