import meiliSearch from "@/utils/search/search";
import { Institution } from "@/utils/db/types";
import { NextApiRequest, NextApiResponse } from "next";
import { fetchInstitutionsByIDs } from "@/utils/db/institutionCRUD";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Institution[] | { error: string }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({ error: "Content type must be application/json" });
    return;
  }
  const body = req.body;
  let { page, pageSize, search, countries } = body;
  if (!page || (!search && countries.length === 0)) {
    res
      .status(400)
      .json({ error: "page and search/countries parameter is required" });
    return;
  }

  const pageNum = parseInt(page as string);
  const offset = (parseInt(pageSize as string) || 50) * (pageNum - 1);
  const ids = await meiliSearch(
    search as string,
    countries as string[],
    pageNum,
    offset
  );

  const institutions = await fetchInstitutionsByIDs(...ids);
  res.status(200).json(institutions);
}
