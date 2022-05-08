import { Chip, Typography } from "@mui/material";
import { shortenIfAddress } from "@usedapp/core";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/auth";
import AuthSelectors from "../store/auth/selectors";

const WalletButton = () => {
  const user = useSelector(AuthSelectors.getCurrentUser);
  const dispatch = useDispatch();

  return (
    <Chip
      size="medium"
      style={{
        backgroundColor: "rgb(120, 145, 156)",
        padding: "20px 4px",
        borderRadius: "20px",
      }}
      label={
        user ? (
          <>
            <Typography style={{ fontSize: "0.75rem" }}>
              {user.username}
            </Typography>
            <Typography
              variant="caption"
              style={{
                fontSize: "0.625rem",
                marginTop: "-8px",
                color: "white",
              }}
            >
              {shortenIfAddress(user.walletAddress)}
            </Typography>
          </>
        ) : (
          "Connect"
        )
      }
      onClick={() => {
        console.log(user);
        if (!user) {
          dispatch(AuthActions.loginRequest());
        } else {
          dispatch(AuthActions.logoutRequest());
        }
      }}
    />
  );
};

export default WalletButton;
