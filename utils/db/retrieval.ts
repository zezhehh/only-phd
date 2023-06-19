import getClient from "./client";

import { Institution, Subject, SubjectOffered } from "./types";

export const fetchInstitutions = async (
  page: number,
  pageSize: number = 50
): Promise<Institution[]> => {
  const prisma = await getClient();
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
  const prisma = await getClient();
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
