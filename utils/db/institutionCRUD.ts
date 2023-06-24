import prisma from "./client";

import { Institution, Subject, SubjectOffered } from "./types";
import _ from "lodash";

export const fetchInstitutions = async (
  page: number,
  pageSize: number = 50
): Promise<Institution[]> => {
  const institutions = await prisma.institution.findMany({
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return institutions;
};

export const filterInstitutionsByName = async (
  name: string,
  page: number,
  pageSize: number = 50
): Promise<Institution[]> => {
  name = name.toLowerCase();
  const filteredInstitutions = await prisma.institution.findMany({
    where: {
      lowerCaseName: {
        contains: name,
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });
  return filteredInstitutions;
};

export const updateInstitutionWebsite = async (
  id: number,
  website: string
): Promise<Institution> => {
  return await prisma.institution.update({
    where: {
      id,
    },
    data: {
      website,
    },
  });
};

export const mergeInstitutions = async (
  institutionID1: number,
  institutionID2: number
): Promise<Institution> => {
  const institution1 = await prisma.institution.findUnique({
    where: {
      id: institutionID1,
    },
  });

  const institution2 = await prisma.institution.findUnique({
    where: {
      id: institutionID2,
    },
  });

  if (!institution1 || !institution2) {
    throw new Error("Invalid institution ID");
  }

  const subjectsOfferedBy1 = await prisma.subjectOffered.findMany({
    where: {
      institutionId: institutionID1,
    },
  });
  const subjectsOfferedBy2 = await prisma.subjectOffered.findMany({
    where: {
      institutionId: institutionID2,
    },
  });

  const newSubjectsOffered = _.without(
    subjectsOfferedBy2,
    ...subjectsOfferedBy1
  );

  await prisma.subjectOffered.createMany({
    data: newSubjectsOffered.map((subjectOffered: SubjectOffered) => ({
      subjectId: subjectOffered.subjectId,
      institutionId: institutionID1,
    })),
  });

  const newInstitution = await prisma.institution.update({
    where: {
      id: institutionID1,
    },
    data: {
      name:
        institution1.name.length > institution2.name.length
          ? institution1.name
          : institution2.name,
      qsScore: institution1.qsScore || institution2.qsScore,
      timesScore: institution1.timesScore || institution2.timesScore,
      website: institution1.website || institution2.website,
    },
  });

  await prisma.institution.delete({
    where: {
      id: institutionID2,
    },
  });

  return newInstitution;
};

export const hideInstitution = async (id: number): Promise<void> => {
  await prisma.institution.update({
    where: {
      id,
    },
    data: {
      hidden: true,
    },
  });
};
