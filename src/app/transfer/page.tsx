"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import api from "../../utils/api";

export default function Transfer() {
  const [senderIban, setSenderIban] = useState("");
  const [receiverIban, setReceiverIban] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    // Validate input
    if (!senderIban || !receiverIban || !amount) {
      alert("All fields are required!");
      return;
    }

    if (parseFloat(amount) <= 0) {
      alert("Amount must be greater than 0.");
      return;
    }

    setLoading(true);

    try {
      const response = await api.post("/transfer", {
        senderIban,
        receiverIban,
        amount: parseFloat(amount)
      });

      alert(response.data.message || "Transfer successful!");
      setSenderIban("");
      setReceiverIban("");
      setAmount("");
    } catch (error: unknown) {
      if (isAxiosError(error)) {
        alert(
          error.response?.data?.error ||
            "An error occurred during the transfer."
        );
      } else if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ mt: 4, maxWidth: "500px", mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Transfer Money
      </Typography>
      <TextField
        label="Your IBAN"
        fullWidth
        sx={{ mb: 2 }}
        value={senderIban}
        onChange={(e) => setSenderIban(e.target.value)}
        placeholder="Enter your IBAN"
      />
      <TextField
        label="Receiver's IBAN"
        fullWidth
        sx={{ mb: 2 }}
        value={receiverIban}
        onChange={(e) => setReceiverIban(e.target.value)}
        placeholder="Enter receiver's IBAN"
      />
      <TextField
        label="Amount"
        type="number"
        fullWidth
        sx={{ mb: 2 }}
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter transfer amount"
      />
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Transfer"}
      </Button>
    </Box>
  );
}

function isAxiosError(
  err: unknown
): err is { response?: { data?: { error: string } } } {
  return typeof err === "object" && err !== null && "response" in err;
}
