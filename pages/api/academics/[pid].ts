import { updateInstitution } from "@/utils/db/institutionCRUD";
import { Institution } from "@/utils/db/types";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Institution | { error: string }>
) {
  if (req.method !== "PUT") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({ error: "Content-Type must be application/json" });
    return;
  }
  const { pid } = req.query;
  const { website, hidden } = req.body;
  const token = req.headers.authorization;

  if (!pid || (!website && !hidden) || !token) {
    res
      .status(400)
      .json({ error: "token, pid and website/hidden parameters are required" });
    return;
  }

  if (token !== process.env.ADMIN_TOKEN) {
    res.status(401).json({ error: "Invalid token" });
    return;
  }

  let institution: Institution;
  if (hidden) {
    institution = await updateInstitution(parseInt(pid as string), { hidden });
  } else {
    institution = await updateInstitution(parseInt(pid as string), { website });
  }

  res.status(200).json(institution);
}
