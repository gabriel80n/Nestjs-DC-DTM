/*
  Warnings:

  - You are about to drop the `Paciente` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the column `observacoes` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `pacienteId` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `resultado` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `validado` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `validadoEm` on the `Exam` table. All the data in the column will be lost.
  - You are about to drop the column `validadorId` on the `Exam` table. All the data in the column will be lost.
  - Added the required column `patientId` to the `Exam` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Paciente_documento_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Paciente";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Patient" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "documentType" TEXT NOT NULL,
    "birthDate" DATETIME NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "gender" TEXT NOT NULL,
    "race" TEXT NOT NULL,
    "maritalStatus" TEXT NOT NULL,
    "educationLevel" TEXT NOT NULL,
    "origin" TEXT NOT NULL,
    "annualIncome" REAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Exam" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "patientId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'finished',
    "result" TEXT,
    "observations" TEXT,
    "validated" BOOLEAN,
    "validatorId" INTEGER,
    "validatedAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Exam_patientId_fkey" FOREIGN KEY ("patientId") REFERENCES "Patient" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exam_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Exam_validatorId_fkey" FOREIGN KEY ("validatorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Exam" ("createdAt", "id", "status", "userId") SELECT "createdAt", "id", "status", "userId" FROM "Exam";
DROP TABLE "Exam";
ALTER TABLE "new_Exam" RENAME TO "Exam";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Patient_document_key" ON "Patient"("document");
