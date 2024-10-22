import * as React from "react";
import Button from "@mui/material/Button";
import { styled, Theme } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { StateSetter } from "@/utils/types/statesetter";

interface DialogBoxType {
  title: string;
  children: React.ReactNode;
  open: boolean;
  setOpen: StateSetter<boolean>;
  action: string;
  handlAction: () => void;
  actionBack?: string;
  handlActionBack?: () => void;
  closable?: boolean;
  buttonDisable?:boolean;
  disableAction?:string;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxWidth: "100%",
    borderRadius:'10px'
  },
}));

const DialogBox: React.FC<DialogBoxType> = ({
  children,
  open,
  setOpen,
  action,
  handlAction,
  title,
  actionBack,
  handlActionBack,
  closable = true,
  buttonDisable = false,
  disableAction
}) => {
  const handleClose = (
    event: React.MouseEvent,
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    if (reason !== "backdropClick") {
      setOpen(false);
    }
  };

  return (
    <React.Fragment>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
          {title}
        </DialogTitle>
        {closable && (
          <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme: Theme) => ({
              position: "absolute",
              right: 8,
              top: 8,
              color: theme.palette.grey[500],
            })}
          >
            <CloseIcon />
          </IconButton>
        )}
        <DialogContent
          dividers
          style={{ height: "80vh", width: "80vw", padding: "0" }}
        >
          {children}
        </DialogContent>
        <DialogActions>
          {actionBack && (
            <Button onClick={handlActionBack} variant="outlined">
              {actionBack}
            </Button>
          )}
          <Button onClick={handlAction} variant="contained" disabled={buttonDisable}>
            {buttonDisable ? disableAction : action}
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default DialogBox;
