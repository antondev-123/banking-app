"use client";

import { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import api from "../../utils/api";

export default function Statement() {
  const [transactions, setTransactions] = useState([]);
  const [iban, setIban] = useState("test-iban");
  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await api.get(`/statement?iban=${iban}`);
        setTransactions(response.data.transactions || []);
      } catch (error: any) {
        console.error(
          "Error fetching transactions:",
          error.response?.data?.error
        );
      }
    };

    fetchTransactions();
  }, [iban]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Account Statement
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Balance</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions.map((tx, index) => (
            <TableRow key={index}>
              <TableCell>{new Date(tx.date).toLocaleDateString()}</TableCell>
              <TableCell>{tx.amount}</TableCell>
              <TableCell>{tx.balance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}
