import { useQuery } from "@apollo/client";
import { Contract } from "@ethersproject/contracts";
import { useCall } from "@usedapp/core";
import { useEffect } from "react";
import GET_TRANSFERS from "../services/graphql/subgraph";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  ThemeProvider,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import WalletButton from "components/WalletButton";
import { subWeeks } from "date-fns";

const toCandlestickData = (data: any) => {
  return data.Data.Data.map((item: any) => [
    item.time * 1000,
    item.open,
    item.high,
    item.low,
    item.close,
  ]);
};

let y = 1;
const toFlagsData = (data: any) => {
  return data.Data.Data.map((item: any) => ({
    x: y++,
    title: "A",
  }));
};
function Home() {
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
    /* @ts-ignore */
    Highcharts.getJSON(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=1000",
      function(data: any) {
        console.log(toFlagsData(data));
        /* @ts-ignore */
        Highcharts.stockChart("container", {
          title: {
            text: "ETH/USDT",
            style: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: 12,
            },
          },
          navigator: {
            enabled: false,
          },
          scrollbar: {
            enabled: false,
          },

          xAxis: {
            min: subWeeks(new Date(), 2).getTime(),
            max: new Date().getTime(),
          },
          series: [
            {
              type: "candlestick",
              name: "ETH/USDT",
              data: toCandlestickData(data),
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
            /* {
              type: "flags",
              data: toFlagsData(data),
              onSeries: "dataseries",
              shape: "squarepin",
              width: 16,
            },*/
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
              pointerEvents: "none",
            },
            buttons: [
              {
                type: "week",
                count: 2,
                text: "2w",
                title: "View 2 weeks",
              },
              {
                type: "month",
                count: 1,
                text: "1m",
                title: "View 1 month",
              },
              {
                type: "month",
                count: 3,
                text: "3m",
                title: "View 3 months",
              },
              {
                type: "year",
                count: 1,
                text: "1y",
                title: "View 1 year",
              },
              {
                type: "all",
                text: "All",
                title: "View all",
              },
            ],
            buttonTheme: {
              fill: "rgb(120, 145, 156)",
              stroke: "white",
              style: {
                color: theme.palette.text.primary,
                "&:hover": {
                  color: "red",
                },
              },
              hover: {
                color: "red",
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
        position="sticky"
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
                Elliot
              </Typography>
            </Box>
            <WalletButton />
          </Toolbar>
        </Container>
      </AppBar>
      <Container style={{ marginTop: 32 }} maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item md={8} xs={8}>
            <Paper>
              <Box pt={2} pb={4} px={2}>
                <Typography>ETH Price Prediction</Typography>
                <Box my={2}>
                  <div id="container" />
                </Box>
              </Box>
            </Paper>
          </Grid>
          <Grid item md={4} xs={4}>
            <Paper>
              <Box pt={2} pb={4} px={2} flexDirection="column">
                <Box mb={1}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                    }}
                  >
                    +10%
                  </Button>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                    }}
                  >
                    +5%
                  </Button>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                    }}
                  >
                    +2%
                  </Button>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                    }}
                  >
                    -2%
                  </Button>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                    }}
                  >
                    -5%
                  </Button>
                </Box>
                <Box mb={1}>
                  <Button
                    variant="outlined"
                    style={{
                      width: "100%",
                    }}
                  >
                    -10%
                  </Button>
                </Box>
                <Box mt={6} mb={2}>
                  <Button
                    variant="contained"
                    style={{
                      width: "100%",
                    }}
                  >
                    Confirm
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      <CssBaseline />
    </>
  );
}

export default Home;
