export default async function handler(req, res) {
  console.log("req.query===========>", req.query);
  try {
    const response = await fetch(
      `https://api.ibanapi.com/v1/validate/${req.query.iban}?api_key=${process.env.NEXT_PUBLIC_IBAN_API_KEY}`
    );
    if (!response.ok) {
      return res
        .status(response.status)
        .json({ error: "Failed to fetch data" });
    }

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching IBAN API:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
