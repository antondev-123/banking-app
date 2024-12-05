import { NextApiRequest, NextApiResponse } from "next";
import { isValid } from "iban";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const iban = req.query.iban;

    if (typeof iban !== "string") {
      return res.status(400).json({ error: "Invalid IBAN format" });
    }

    if (!isValid(iban)) {
      return res.status(400).json({ error: "Invalid IBAN" });
    }

    res.status(200).json({ result: "Valid IBAN" });
  } catch (error) {
    console.error("Error fetching IBAN API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
