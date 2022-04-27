import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import {
  shortenAddress,
  useCall,
  useEthers,
  useLookupAddress,
} from "@usedapp/core";
import { useEffect, useState } from "react";

import { Body, Header } from "./components";

import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./graphql/subgraph";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import theme from "./core/theme";
import { Box } from "@mui/system";
import styled from "@emotion/styled";

function WalletButton() {
  const [rendered, setRendered] = useState("");

  const ens = useLookupAddress();
  const { account, activateBrowserWallet, deactivate, error } = useEthers();

  useEffect(() => {
    if (ens) {
      setRendered(ens);
    } else if (account) {
      setRendered(shortenAddress(account));
    } else {
      setRendered("");
    }
  }, [account, ens, setRendered]);

  useEffect(() => {
    if (error) {
      console.error("Error while connecting wallet:", error.message);
    }
  }, [error]);

  return (
    <Button
      variant="contained"
      onClick={() => {
        if (!account) {
          activateBrowserWallet();
        } else {
          deactivate();
        }
      }}
    >
      {rendered === "" && "Connect Wallet"}
      {rendered !== "" && rendered}
    </Button>
  );
}

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  // Read more about useDapp on https://usedapp.io/
  const { value: tokenBalance } =
    useCall({
      contract: new Contract(addresses.ceaErc20, abis.erc20),
      method: "balanceOf",
      args: ["0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"],
    }) ?? {};

  const { loading, error: subgraphQueryError, data } = useQuery(GET_TRANSFERS);

  useEffect(() => {
    if (subgraphQueryError) {
      console.error(
        "Error while querying subgraph:",
        subgraphQueryError.message
      );
      return;
    }
    if (!loading && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, subgraphQueryError, data]);
  console.log(tokenBalance);
  const theme = useTheme();
  return (
    <ThemeProvider theme={theme}>
      <AppBar
        color="primary"
        style={{
          backgroundImage: "none",
          backgroundColor: theme.palette.background.default,
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ flexGrow: 1 }}>
              <Typography
                variant="h6"
                noWrap
                component="div"
                sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
              >
                Futurist
              </Typography>
            </Box>
            <WalletButton />
          </Toolbar>
        </Container>
      </AppBar>
      <Offset />
      <Container style={{ marginTop: 32 }} maxWidth="xl">
        <Paper>
          <Box pt={2} pb={4} px={2}>
            <Typography>ETH Price Prediction</Typography>
          </Box>
        </Paper>
      </Container>
      <CssBaseline />
    </ThemeProvider>
  );
}

export default App;
