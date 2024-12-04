import { isValid } from "iban";

export default async function handler(req, res) {
  try {
    if (!isValid(req.query.iban)) {
      return res.status(400).json({ error: "Invalid IBAN" });
    }
    res.status(200).json({ result: "Valid IBAN" });
  } catch (error) {
    console.error("Error fetching IBAN API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
