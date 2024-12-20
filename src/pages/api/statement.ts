import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import api from "@/utils/api";

// interface Transaction {
//   date: string; // Or `Date` if it's a Date object
//   amount: number;
//   balance: number;
// }

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { iban } = req.query;

    if (!iban) {
      return res.status(400).json({ error: "Iban is required!" });
    }

    const ibanCheck = await api.get(`/validate-iban?iban=${iban}`);

    if (ibanCheck.data.result !== 200) {
      return res.status(400).json({ error: "Iban is not valid!" });
    }

    const account = await prisma.account.findUnique({
      where: { iban: String(iban) },
      include: { transactions: true }
    });

    // Type guard: Check if account is found (not null)
    if (!account) {
      return res.status(404).json({ error: "Account not found." });
    }

    const transactions = account.transactions.sort((a, b) => {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    res.status(200).json({
      iban: account.iban,
      balance: account.balance,
      transactions
    });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
