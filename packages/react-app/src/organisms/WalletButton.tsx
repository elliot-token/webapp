import { Button } from "@mui/material";
import { shortenIfAddress, useEthers } from "@usedapp/core";
import { useDispatch, useSelector } from "react-redux";
import { AuthActions } from "../store/auth";
import AuthSelectors from "../store/auth/selectors";

const WalletButton = () => {
  const { account } = useEthers();

  const connectedWallet = useSelector(AuthSelectors.getConnectedWallet);

  const dispatch = useDispatch();

  return (
    <Button
      variant="contained"
      onClick={() => {
        if (!connectedWallet) {
          dispatch(AuthActions.loginRequest());
        } else {
          dispatch(AuthActions.logoutRequest());
        }
      }}
    >
      {connectedWallet ? shortenIfAddress(connectedWallet) : "Connect"}
    </Button>
  );
};

export default WalletButton;
