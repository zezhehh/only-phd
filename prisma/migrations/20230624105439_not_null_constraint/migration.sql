/*
  Warnings:

  - Made the column `qs_score` on table `institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `times_score` on table `institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `lower_case_name` on table `institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `country_code` on table `institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `website` on table `institutions` required. This step will fail if there are existing NULL values in that column.
  - Made the column `institution_id` on table `subject_offered` required. This step will fail if there are existing NULL values in that column.
  - Made the column `subject_id` on table `subject_offered` required. This step will fail if there are existing NULL values in that column.
  - Made the column `name` on table `subjects` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "institutions" ALTER COLUMN "qs_score" SET NOT NULL,
ALTER COLUMN "times_score" SET NOT NULL,
ALTER COLUMN "name" SET NOT NULL,
ALTER COLUMN "lower_case_name" SET NOT NULL,
ALTER COLUMN "country_code" SET NOT NULL,
ALTER COLUMN "website" SET NOT NULL;

-- AlterTable
ALTER TABLE "subject_offered" ALTER COLUMN "institution_id" SET NOT NULL,
ALTER COLUMN "subject_id" SET NOT NULL;

-- AlterTable
ALTER TABLE "subjects" ALTER COLUMN "name" SET NOT NULL;
