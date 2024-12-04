import api from "@/utils/api";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { iban, amount } = req.body;

    if (!iban || !amount) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const ibanCheck = await api.get(`/validate-iban?iban=${iban}`);

    if (ibanCheck.data.result !== 200) {
      return res.status(400).json({ error: "Iban is not valid!" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid deposit amount." });
    }

    const account = await prisma.account.update({
      where: { iban },
      data: {
        balance: { increment: amount },
        transactions: {
          create: {
            amount,
            type: "deposit"
          }
        }
      }
    });

    res.status(200).json({ message: "Deposit successful", account });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
