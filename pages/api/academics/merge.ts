import { mergeInstitutions } from "@/utils/db/institutionCRUD";
import { Institution } from "@/utils/db/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Institution | { error: string }>
) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  const { id1, id2 } = req.query;
  const token = req.headers.authorization;

  if (!id1 || !id2 || !token) {
    res
      .status(400)
      .json({ error: "id1, id2 and token parameters are required" });
    return;
  }

  if (token !== process.env.ADMIN_TOKEN) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  const institution = await mergeInstitutions(
    parseInt(id1 as string),
    parseInt(id2 as string)
  );

  res.status(200).json(institution);
}
