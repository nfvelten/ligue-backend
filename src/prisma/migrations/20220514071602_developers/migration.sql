-- CreateEnum
CREATE TYPE "Sex" AS ENUM ('M', 'F');

-- CreateTable
CREATE TABLE "Developer" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "sex" "Sex" NOT NULL,
    "age" INTEGER NOT NULL,
    "hobby" TEXT NOT NULL,
    "birthdate" TIMESTAMP(3),

    CONSTRAINT "Developer_pkey" PRIMARY KEY ("id")
);
