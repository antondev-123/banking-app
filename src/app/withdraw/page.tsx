"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import api from "@/utils/api";

export default function Withdraw() {
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await api.post("/withdraw", {
        iban,
        amount: parseFloat(amount)
      });
      alert(response.data.message);
    } catch (error: any) {
      alert(error.response?.data?.error || "Something went wrong");
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Withdraw Money
      </Typography>
      <TextField
        label="IBAN"
        fullWidth
        sx={{ mb: 2 }}
        value={iban}
        onChange={(e) => setIban(e.target.value)}
      />
      <TextField
        label="Amount"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <Button variant="contained" fullWidth onClick={handleSubmit}>
        Withdraw
      </Button>
    </Box>
  );
}
