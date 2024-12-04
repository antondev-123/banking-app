"use client";

import { Box, TextField, Button, Typography } from "@mui/material";
import { useState } from "react";
import api from "../../utils/api";
import ConfirmModal from "../components/confirmModal";

export default function Deposit() {
  const [iban, setIban] = useState("");
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const response = await api.post("/deposit", {
        iban,
        amount: parseFloat(amount)
      });
      alert(response.data.message || "Deposit successful");
      setIban("");
      setAmount("");
    } catch (error) {
      alert(error.response?.data?.error || "Something went wrong");
    } finally {
      setLoading(false);
    }
    // setShowModal(true);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Deposit Money
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
      <Button
        variant="contained"
        fullWidth
        onClick={handleSubmit}
        disabled={loading}
      >
        {loading ? "Processing..." : "Deposit"}
      </Button>
      {/* <ConfirmModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleSubmit}
      /> */}
    </Box>
  );
}
