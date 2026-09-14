-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateTable
CREATE TABLE "Eintrag" (
    "id" SERIAL NOT NULL,
    "titel" TEXT NOT NULL,
    "text" TEXT,
    "erstellt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Eintrag_pkey" PRIMARY KEY ("id")
);

