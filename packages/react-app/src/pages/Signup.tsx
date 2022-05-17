import {
  Button,
  CircularProgress,
  Grid,
  Input,
  Paper,
  TextField,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import { shortenAddress } from "@usedapp/core";
import BaseLayout from "components/nav/BaseLayout";
import { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import API from "services/api";
import { AuthActions } from "store/auth";
import AuthSelectors from "store/auth/selectors";

const Signup = () => {
  const walletToSignup = useSelector(AuthSelectors.getWalletToSignUp);
  const nicknameRef = useRef<any>();
  const [nicknameValue, setNicknameValue] = useState("");
  const [nicknameError, setNicknameError] = useState<string | boolean>(false);
  const [globalError, setGlobalError] = useState(false);
  const navigate = useNavigate();
  const [isSigningUp, setIsSigningUp] = useState(false);
  const dispatch = useDispatch();
  const theme = useTheme();
  if (!walletToSignup) {
    return <Navigate to="/" replace={true} />;
  }
  return (
    <BaseLayout disableWalletButton>
      <Grid container justifyContent="center">
        <Grid item md={6} xs={12}>
          <Paper>
            <Box
              pb={6}
              pt={4}
              px={8}
              flexDirection="column"
              alignItems="center"
            >
              <Typography style={{ marginBottom: "48px", textAlign: "center" }}>
                Create an Elliot account
              </Typography>
              <TextField
                placeholder="Wallet Adress"
                label="Wallet Address"
                variant="outlined"
                value={shortenAddress(walletToSignup)}
                disabled
                style={{ width: "100%" }}
              />
              <br />
              <br />
              <TextField
                inputRef={nicknameRef}
                label="Nickname"
                autoFocus
                helperText={nicknameError}
                error={!!nicknameError}
                placeholder="platypus1"
                variant="outlined"
                style={{
                  width: "100%",
                }}
                value={nicknameValue}
                onChange={(e) => {
                  setGlobalError(false);
                  setNicknameValue(e.currentTarget.value);
                }}
              />
              <br />
              {globalError && (
                <Typography
                  style={{
                    color: theme.palette.error.main,
                    textAlign: "center",
                    margin: "20px 0",
                    fontSize: "12px",
                  }}
                >
                  Something seriously wrong happened.
                </Typography>
              )}
              <Button
                size="large"
                variant="contained"
                style={{ marginTop: "32px", width: "100%" }}
                onClick={async () => {
                  if (isSigningUp) {
                    return;
                  }
                  if (!nicknameValue) {
                    setNicknameError("Please provide a nickname");
                    nicknameRef.current?.focus();
                    return;
                  }
                  setNicknameError(false);
                  setIsSigningUp(true);
                  let response;
                  try {
                    response = await API.signup({
                      walletAddress: walletToSignup,
                      nickname: nicknameValue,
                    });
                  } catch (e) {
                    setGlobalError(true);
                    throw e;
                  }
                  console.log(response);
                  dispatch(
                    AuthActions.signupSuccess({
                      username: nicknameValue,
                      walletAddress: walletToSignup,
                    })
                  );
                  navigate("/", {
                    replace: true,
                  });
                }}
              >
                {isSigningUp ? (
                  <div
                    style={{
                      height: 28,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <CircularProgress
                      size={16}
                      style={{ color: "white", opacity: 0.6 }}
                    />
                  </div>
                ) : (
                  "Create"
                )}
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </BaseLayout>
  );
};

export default Signup;
