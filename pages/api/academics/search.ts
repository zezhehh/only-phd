import meiliSearch from "@/utils/search/search";
import { Institution } from "@/utils/db/types";
import { NextApiRequest, NextApiResponse } from "next";
import { fetchInstitutionByID } from "@/utils/db/institutionCRUD";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Institution[] | { error: string }>
) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  let { page, pageSize, search } = req.query;
  if (!page || !search) {
    res.status(400).json({ error: "page and search parameter is required" });
    return;
  }

  const pageNum = parseInt(page as string);
  const offset = (parseInt(pageSize as string) || 50) * (pageNum - 1);
  const ids = await meiliSearch(search as string, pageNum, offset);

  let institutions: Institution[] = [];
  for (let i = 0; i < ids.length; i++) {
    const institution = await fetchInstitutionByID(ids[i]);
    if (institution) {
      institutions.push(institution);
    }
  }
  res.status(200).json(institutions);
}
