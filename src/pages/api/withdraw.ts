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
      return res.status(400).json({ error: "Invalid withdrawal amount." });
    }

    const account = await prisma.account.findUnique({ where: { iban } });

    if (!account || account.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds." });
    }

    const updatedAccount = await prisma.account.update({
      where: { iban },
      data: {
        balance: { decrement: amount },
        transactions: {
          create: {
            amount: -amount,
            type: "withdrawal"
          }
        }
      }
    });

    res
      .status(200)
      .json({ message: "Withdrawal successful", account: updatedAccount });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
