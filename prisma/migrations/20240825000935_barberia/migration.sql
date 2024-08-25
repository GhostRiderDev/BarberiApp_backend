/*
  Warnings:

  - Added the required column `ciudad` to the `Barberia` table without a default value. This is not possible if the table is not empty.
  - Added the required column `departamento` to the `Barberia` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `duracion_servicio` on the `Barbero` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Barberia" ADD COLUMN     "ciudad" TEXT NOT NULL,
ADD COLUMN     "departamento" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Barbero" DROP COLUMN "duracion_servicio",
ADD COLUMN     "duracion_servicio" INTEGER NOT NULL;
