-- CreateTable
CREATE TABLE "subjects" (
    "id" SERIAL NOT NULL,
    "name" TEXT,

    CONSTRAINT "subjects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institutions" (
    "id" SERIAL NOT NULL,
    "qs_score" REAL,
    "times_score" REAL,
    "name" TEXT,
    "lower_case_name" TEXT,
    "country_code" TEXT,
    "website" TEXT,

    CONSTRAINT "institutions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "subject_offered" (
    "id" SERIAL NOT NULL,
    "institution_id" INTEGER,
    "subject_id" INTEGER,

    CONSTRAINT "subject_offered_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "subjects_name_key" ON "subjects"("name");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_name_key" ON "institutions"("name");

-- CreateIndex
CREATE UNIQUE INDEX "institutions_lower_case_name_key" ON "institutions"("lower_case_name");

-- CreateIndex
CREATE UNIQUE INDEX "subject_offered_institution_id_subject_id_key" ON "subject_offered"("institution_id", "subject_id");

