import { updateInstitutionWebsite } from "@/utils/db/institutionCRUD";
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
  const { website } = req.body;

  if (!pid || !website) {
    res.status(400).json({ error: "pid and website parameters are required" });
    return;
  }

  const institution = await updateInstitutionWebsite(
    parseInt(pid as string),
    website as string
  );

  res.status(200).json(institution);
}
