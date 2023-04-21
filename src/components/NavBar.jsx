import * as React from "react";
// UI imports..
import {
  AppBar,
  Toolbar,
  Typography,
  Badge,
  styled,
  Avatar,
  Button,
  Box,
  InputBase,
  Menu,
  MenuItem,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import EmailIcon from "@mui/icons-material/Email";
import BadgeUnstyled from "@mui/base/BadgeUnstyled";
import NotificationsIcon from "@mui/icons-material/Notifications";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import ListItemIcon from "@mui/material/ListItemIcon";
import PersonIcon from "@mui/icons-material/Person";
import CreateIcon from "@mui/icons-material/Create";
import { LoadingButton } from "@mui/lab";

// service imports..
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

// Wallet connection..
import { useWallet } from "use-wallet";

// Custom styling to components
const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const SearchBar = styled("div")(({ theme }) => ({
  backgroundColor: "white",
  padding: "0 10px",
  borderRadius: theme.shape.borderRadius,
  width: "100%",
}));

const UserActions = styled("div")(({ theme }) => ({
  display: "none",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "40px",
  padding: "10 10px",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    display: "flex",
  },
}));

const UserProfile = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  gap: "10px",
  borderRadius: theme.shape.borderRadius,
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

function NavBar() {
  // hooks ..
  const [profileMenuDisplayStatus, setProfileMenuDisplayStatus] =
    useState(false);
  // hooks..
  const [responseMsg, setResponseMsg] = React.useState(""); // to display error messages.
  const [showResponse, setShowResponse] = React.useState(false); // To know whether error occured. ⁉ why not use length of error message
  const [responseSeverity, setResponseSeverity] = React.useState("error");
  const navigate = useNavigate();

  const wallet = useWallet();

  const { currentUserCredentials, signout } = useAuth();

  const handleSignout = async () => {
    // set the response activations to default.
    setShowResponse(false);
    setResponseMsg("");
    setResponseSeverity("error"); // doesn't allowing to have empty, so kept this. Anyway, as showing is false, no worries.

    // do signout.
    try {
      await signout();
      navigate("/sign-in"); // navigate to sign-in page, after successful logout.
    } catch (error) {
      setShowResponse(true);
      setResponseMsg(error.message);
      setResponseSeverity("error");
    }
  };

  return (
    <AppBar position="sticky" sx={{ backgroundImage: 'linear-gradient(to right, #FFFFFF, #E0E0E0)', boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)" }}>
      <StyledToolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h5"
            sx={{
              color: "black",
              fontFamily: "Arial",
              fontWeight: "bold",
              fontSize: "1.25rem",
              cursor: "pointer",
            }}
            onClick={() => navigate("/")}
          >
            GreaterFund
          </Typography>
        </Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="outlined"
            sx={{ mr: 2, borderColor: "black" }}
            onClick={() => navigate("/create-campaign")}
          >
            Create Campaign
          </Button>
          {wallet.status === "connected" ? (
            <>
              <Button
                variant="text"
                endIcon={<ExpandMoreIcon />}
                onClick={() => setProfileMenuDisplayStatus(true)}
                color="primary"
              >
                <Typography variant="body1" sx={{ color: "black" }}>{wallet.account.substr(0, 10) + "..."}</Typography>
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="contained"
                sx={{ color: "white", backgroundColor: "black", mr: 2 }}
                endIcon={<AccountBalanceWalletIcon />}
                onClick={() => wallet.connect()}
              >
                Connect MetaMask
              </Button>
            </>
          )}
        </Box>
      </StyledToolbar>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        open={profileMenuDisplayStatus}
        onClose={(e) => setProfileMenuDisplayStatus(false)}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => wallet.reset()}>
          <ListItemIcon>
            <AccountBalanceWalletIcon fontSize="small" />
          </ListItemIcon>
          Disconnect Wallet
        </MenuItem>
        <MenuItem onClick={() => navigate("/profile")}>
          <ListItemIcon>
            <PersonIcon fontSize="small" />
          </ListItemIcon>
          Profile
        </MenuItem>
      </Menu>
    </AppBar>
  );
};

export default NavBar;