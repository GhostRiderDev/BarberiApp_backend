/*
  Warnings:

  - Changed the type of `duracion_servicio` on the `Barbero` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Barbero" DROP COLUMN "duracion_servicio",
ADD COLUMN     "duracion_servicio" INTEGER NOT NULL;
