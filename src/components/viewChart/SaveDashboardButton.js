import React from "react";
import { Button } from "@mui/material";

function SaveDashboardButton({ onSaveClick }) {
  return (
    <Button variant="contained" color="primary" onClick={onSaveClick}>
      Save Dashboard
    </Button>
  );
}

export default SaveDashboardButton;
