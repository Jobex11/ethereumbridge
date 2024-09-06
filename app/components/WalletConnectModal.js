import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import Slide from "@mui/material/Slide";
import WalletIcon from "@mui/icons-material/Wallet";

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
      PaperProps={{
        sx: {
          backgroundColor: "#1c1c24",
          borderRadius: "0.5rem", // Tailwind rounded-lg
          border: "1px solid #35af74",
        },
      }}
    >
      <DialogTitle
        sx={{ color: "white" }} // Tailwind doesn't apply directly here, use MUI sx for DialogTitle
      >
        {"Connect Your Wallet"}
      </DialogTitle>
      <DialogContent>
        <p className="text-white  items-center space-x-2">
          Please connect your Web3 <WalletIcon /> wallet to proceed with this
          action (e.g., Send ETH, Withdraw, Whitelist, Transfer Ownership).
        </p>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleClose}
          variant="outlined"
          sx={{ borderColor: "#35af74", color: "#35af74" }} // MUI sx for border color
          className="text-white"
        >
          Cancel
        </Button>
        <Button
          onClick={connectWallet}
          variant="outlined"
          sx={{ borderColor: "#35af74", color: "#35af74" }} // MUI sx for border color
          className="text-white"
        >
          Connect Wallet
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/*
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
  

 */
