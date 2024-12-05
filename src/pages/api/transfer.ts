import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import api from "@/utils/api";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const { senderIban, receiverIban, amount } = req.body;

    if (!senderIban || !receiverIban || !amount) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    if (amount <= 0) {
      return res.status(400).json({ error: "Invalid transfer amount." });
    }

    const senderIbanCheck = await api.get(`/validate-iban?iban=${senderIban}`);

    if (senderIbanCheck.data.result !== 200) {
      return res.status(400).json({ error: "SenderIban is not valid!" });
    }

    const receiverIbanCheck = await api.get(
      `/validate-iban?iban=${receiverIban}`
    );

    if (receiverIbanCheck.data.result !== 200) {
      return res.status(400).json({ error: "ReceiverIban is not valid!" });
    }

    const sender = await prisma.account.findUnique({
      where: { iban: senderIban }
    });
    const receiver = await prisma.account.findUnique({
      where: { iban: receiverIban }
    });

    if (!sender || !receiver) {
      return res.status(400).json({ error: "Invalid IBAN(s)." });
    }

    if (sender.balance < amount) {
      return res.status(400).json({ error: "Insufficient funds." });
    }

    await prisma.$transaction([
      prisma.account.update({
        where: { iban: senderIban },
        data: {
          balance: { decrement: amount },
          transactions: {
            create: {
              amount: -amount,
              type: "transfer-out",
              targetIban: receiverIban
            }
          }
        }
      }),
      prisma.account.update({
        where: { iban: receiverIban },
        data: {
          balance: { increment: amount },
          transactions: {
            create: {
              amount,
              type: "transfer-in",
              targetIban: senderIban
            }
          }
        }
      })
    ]);

    res.status(200).json({ message: "Transfer successful" });
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
