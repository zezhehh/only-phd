import prisma from "./client";

import { Institution, Subject, SubjectOffered } from "./types";

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

export async function filterInstitutionsByName(
  name: string,
  page: number,
  pageSize: number = 50
): Promise<Institution[]> {
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
}
