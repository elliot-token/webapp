import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { useCall } from "@usedapp/core";
import { useEffect } from "react";

import { addresses, abis } from "@my-app/contracts";
import GET_TRANSFERS from "./services/graphql/subgraph";
import {
  AppBar,
  Container,
  CssBaseline,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import styled from "@emotion/styled";
import WalletButton from "./organisms/WalletButton";

const Offset = styled("div")(({ theme }) => theme.mixins.toolbar);

function App() {
  // Read more about useDapp on https://usedapp.io/
  /* const { value: tokenBalance } =
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
*/
  const them = useTheme();
  useEffect(() => {
    console.log(Highcharts);
    Highcharts.getJSON(
      "https://demo-live-data.highcharts.com/aapl-ohlc.json",
      function(data) {
        // create the chart
        Highcharts.stockChart("container", {
          title: {
            text: "ETH/USDT",
            style: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: 12,
            },
          },

          series: [
            {
              type: "candlestick",
              name: "ETH/USDT",
              data: data,

              dataGrouping: {
                units: [
                  [
                    "week", // unit name
                    [1], // allowed multiples
                  ],
                  ["month", [1, 2, 3, 4, 6]],
                ],
              },
            },
          ],
          chart: {
            backgroundColor: "rgb(20, 37, 47)",
            borderRadius: 16,
          },
          plotOptions: {
            candlestick: {
              //lineColor: "rgba(0,0,0,0.8)",
              upColor: theme.palette.primary.main,
              color: "rgb(236, 64, 122)",
            },
          },
          yAxis: {
            gridLineColor: "rgb(213 217 233 / 14%)",
            tickColor: "red",
          },
          exporting: {
            enabled: false,
          },
          rangeSelector: {
            labelStyle: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            },
            inputStyle: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
            },
            buttonTheme: {
              fill: "rgb(120, 145, 156)",
              style: {
                color: theme.palette.text.primary,
              },
            },
          },
        });
      }
    );
  }, []);
  const theme = useTheme();
  return (
    <>
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
            <Box my={2}>
              <div id="container" />
            </Box>
          </Box>
        </Paper>
      </Container>
      <CssBaseline />
    </>
  );
}

export default App;
