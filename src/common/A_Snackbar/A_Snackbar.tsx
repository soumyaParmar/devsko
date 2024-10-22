"use client"
import * as React from "react";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import { Alert } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@/utils/store/hooks";
import { closeSnackbar } from "@/utils/store/features/snackbar/snackbarSlice";

interface State extends SnackbarOrigin { }

const A_Snackbar = () => {

  const dispatch = useAppDispatch();
  const { autohide, message, open, severity } = useAppSelector((state) => state.snackbar)

  const handleClose = () => {
    dispatch(closeSnackbar());
  };

  const state: State = {
    vertical: "top",
    horizontal: "center",
  };

  const { vertical, horizontal } = state;

  return (
    <Snackbar
      anchorOrigin={{ vertical, horizontal }}
      open={open}
      onClose={handleClose}
      key={vertical + horizontal}
      autoHideDuration={autohide}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default A_Snackbar;
