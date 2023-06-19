import { fetchInstitutions } from "@/utils/db/retrieval";
import { NextApiRequest, NextApiResponse } from "next";
import { Institution } from "@/utils/db/types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Institution[] | { error: string }>
) {
  if (req.method === "GET") {
    let { page, pageSize } = req.query;
    if (!page) {
      res.status(400).json({ error: "page parameter is required" });
    }

    const institutions = await fetchInstitutions(
      parseInt(page as string),
      parseInt(pageSize as string) || 50
    );
    res.status(200).json(institutions);
  }
}
