import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<{ isAdmin: boolean } | { error: string }>
) {
  if (req.method === "GET") {
    res.status(405).json({ error: "HTTP method not allowed" });
    return;
  }

  if (req.headers["content-type"] !== "application/json") {
    res.status(400).json({ error: "Content-Type must be application/json" });
    return;
  }

  const body = req.body;

  if (body.token === process.env.ADMIN_TOKEN) {
    res.status(200).json({ isAdmin: true });
    return;
  }

  res.status(200).json({ isAdmin: false });
}
