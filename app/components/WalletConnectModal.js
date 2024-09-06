import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function WalletConnectModal({
  open,
  handleClose,
  connectWallet,
}) {
  return (
    <Dialog
      open={open}
      TransitionComponent={Transition}
      keepMounted
      onClose={handleClose}
      aria-describedby="alert-dialog-slide-description"
    >
      <DialogTitle>{"Connect Your Wallet"}</DialogTitle>
      <DialogContent>
        <p>
          Please connect your Web3 wallet to proceed with this action (e.g.,
          Send ETH, Withdraw, Whitelist, Transfer Ownership).
        </p>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={connectWallet}>Connect Wallet</Button>
      </DialogActions>
    </Dialog>
  );
}
