import { Avatar, Button, Chip, Popover, Typography } from "@mui/material";
import { shortenIfAddress } from "@usedapp/core";
import { useEffect, useRef, useState } from "react";
import web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { tokenContract } from "services/contracts";
import { AuthActions } from "../store/auth";
import AuthSelectors from "../store/auth/selectors";
import { Box, useTheme } from "@mui/system";

const WalletButton = () => {
  const user = useSelector(AuthSelectors.getCurrentUser);
  const dispatch = useDispatch();
  const [tokenAmount, setTokenAmount] = useState("0");
  const [popoverOpen, setPopoverOpen] = useState(false);
  useEffect(() => {
    (async () => {
      if (!user?.walletAddress) {
        return;
      }
      const result = await tokenContract.functions.balanceOf(
        user.walletAddress
      );
      setTokenAmount(web3.utils.fromWei(result[0].toString()));
    })();
  }, [user?.walletAddress]);

  const anchorEl = useRef(null);
  const theme = useTheme();

  return (
    <>
      <Popover
        open={popoverOpen}
        anchorEl={anchorEl.current}
        onClose={() => {
          setPopoverOpen(false);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {user && (
          <Box p={2}>
            <Typography style={{ marginBottom: "8px" }}>
              {user.username}
            </Typography>
            <Typography
              style={{
                margin: "8px 0",
                color: "white",
              }}
              variant="caption"
              component="div"
            >
              {shortenIfAddress(user.walletAddress)}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                dispatch(AuthActions.logoutRequest());
              }}
            >
              Logout
            </Button>
          </Box>
        )}
      </Popover>
      <Chip
        ref={anchorEl}
        size="medium"
        style={{
          backgroundColor: "rgb(120 145 156 / 19%)",
          padding: "20px 0",
          borderRadius: "20px",
        }}
        label={
          user ? (
            <Box flexDirection="row" display="flex" alignItems="center">
              <Avatar
                sx={{
                  width: 28,
                  height: 28,
                  bgcolor: theme.palette.secondary.main,
                }}
              >
                <Typography
                  style={{ color: theme.palette.primary.contrastText }}
                >
                  {user.username[0]}
                </Typography>
              </Avatar>
              <Typography
                style={{ marginLeft: "8px" }}
              >{`${tokenAmount} ELL`}</Typography>
            </Box>
          ) : (
            "Connect"
          )
        }
        onClick={() => {
          console.log(user);
          if (!user) {
            dispatch(AuthActions.loginRequest());
          } else {
            setPopoverOpen(true);
          }
        }}
      />
    </>
  );
};

export default WalletButton;
