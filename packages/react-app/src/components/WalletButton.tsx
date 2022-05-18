import { Avatar, Button, Chip, Popover, Typography } from "@mui/material";
import { shortenIfAddress } from "@usedapp/core";
import { useEffect, useRef, useState } from "react";
import web3 from "web3";
import { useDispatch, useSelector } from "react-redux";
import { tokenContract } from "services/contracts";
import { AuthActions } from "../store/auth";
import AuthSelectors from "../store/auth/selectors";
import { Box, useTheme } from "@mui/system";
import web3Utils from "utils/web3";

const WalletButton = () => {
  const user = useSelector(AuthSelectors.getCurrentUser);
  const dispatch = useDispatch();
  const [tokenAmount, setTokenAmount] = useState<number | undefined>(undefined);
  const [popoverOpen, setPopoverOpen] = useState(false);
  useEffect(() => {
    (async () => {
      if (!user?.walletAddress) {
        return;
      }
      const result = await tokenContract.functions.balanceOf(
        user.walletAddress
      );
      setTokenAmount(web3Utils.fromWei(result[0]));
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
          <Box pr={6} pl={2} py={2}>
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
              <Typography style={{ marginLeft: "8px" }}>
                {tokenAmount !== undefined ? `${tokenAmount} ELL` : ""}
              </Typography>
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
