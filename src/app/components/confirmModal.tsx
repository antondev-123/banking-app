import { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

interface ConfirmModalProps {
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
  targetIban?: string;
  amount?: number | null;
}

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4
};

export default function ConfirmModal(props: ConfirmModalProps) {
  const { showModal, setShowModal, handleSubmit, targetIban, amount } = props;

  const handleClose = () => {
    setShowModal(false);
  };

  const handleConfirm = () => {
    handleSubmit();
    setShowModal(false);
  };

  return (
    <Modal
      open={showModal}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Confirm Transfer
        </Typography>
        {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <strong>Target IBAN:</strong> {targetIban}
        </Typography> */}
        {/* <Typography sx={{ mt: 1 }}>
          <strong>Amount:</strong> {amount} USD
        </Typography> */}
        <Box sx={{ mt: 3, display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleClose} color="secondary" variant="outlined">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" variant="contained">
            Confirm
          </Button>
        </Box>
      </Box>
    </Modal>
  );
}
