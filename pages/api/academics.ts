import {
  fetchInstitutionByName,
  fetchInstitutions,
  filterInstitutionsByName,
} from "@/utils/db/institutionCRUD";
import { Institution } from "@/utils/db/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Institution[] | { error: string }>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let { page, pageSize, search, name } = req.query;
  if (!page && !name) {
    res.status(400).json({ error: "page parameter is required" });
    return;
  }

  let institutions: Institution[];
  if (search) {
    institutions = await filterInstitutionsByName(
      search as string,
      parseInt(page as string),
      parseInt(pageSize as string) || 50
    );
  } else if (name) {
    const institution = await fetchInstitutionByName(name as string);
    institutions = institution ? [institution] : [];
  } else {
    institutions = await fetchInstitutions(
      parseInt(page as string),
      parseInt(pageSize as string) || 50
    );
  }
  res.status(200).json(institutions);
}
