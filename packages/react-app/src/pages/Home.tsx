import { useEffect, useRef, useState } from "react";
import highcharts, { SeriesOptionsType } from "highcharts";
import Exporting from "highcharts/modules/exporting";
import Stockchart from "highcharts/modules/stock";
// Initialize exporting module.

import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  Paper,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import WalletButton from "components/WalletButton";
import { subWeeks } from "date-fns";
import BaseLayout from "components/nav/BaseLayout";
Exporting(highcharts);
Stockchart(highcharts);

const toCandlestickData = (data: any, lastPoint?: any) => {
  return data.Data.Data.map((item: any, index: number) =>
    index === 999 && lastPoint
      ? lastPoint
      : {
          x: item.time * 1000,
          open: item.open,
          high: item.high,
          low: item.low,
          close: item.close,
        }
  );
};

let y = 1;
const toFlagsData = (data: any) => {
  return data.Data.Data.map((item: any, index: number) => {
    const previousPrice = data.Data.Data[index === 0 ? 0 : index - 1].close;

    return {
      x: item.time * 1000,
      title: `${Math.floor((item.close / previousPrice - 1) * 100)}%`,
      text: `Previous: ${previousPrice}\nResolve: ${item.close}`,
    };
  });
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
  const ref = useRef<HTMLDivElement>(null);
  const [flagsEnabled, setFlagsEnabled] = useState(true);
  useEffect(() => {
    highcharts.getJSON(
      "https://min-api.cryptocompare.com/data/v2/histoday?fsym=ETH&tsym=USD&limit=999",
      function(data: any) {
        if (!ref.current) {
          return;
        }

        const seriesOptions: Array<SeriesOptionsType> = [
          {
            type: "candlestick",
            id: "dataseries",
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
          ...(flagsEnabled
            ? [
                {
                  type: "flags",
                  data: toFlagsData(data),
                  onSeries: "dataseries",
                  shape: "flag",
                  width: 16,
                  fillColor: "rgb(11, 22, 29)",
                  color: "red",
                  style: {
                    fontFamily: "Poppins",
                    color: "white",
                    opacity: 0.6,
                    fontSize: "8px",
                  },
                } as const,
              ]
            : []),
        ];
        highcharts.stockChart(ref.current, {
          title: {
            text: "ETH/USDT",
            style: {
              color: theme.palette.text.primary,
              fontFamily: theme.typography.fontFamily,
              fontSize: "12px",
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
          series: seriesOptions,
          chart: {
            backgroundColor: "rgb(20, 37, 47)",
            borderRadius: 16,
            /* events: {
              load: function() {
                console.log(this.series);
                // set up the updating of the chart each second
                var series = this.series[0];
                setInterval(function() {
                  const response = https://min-api.cryptocompare.com/data/v2/histominute?fsym=ETH&tsym=USDT&limit=1
                  // series.removePoint(999);
                  const lastPoint = {
                    /* @ts-ignore */
            /*  ...seriesOptions[0].data[999],
                    close: y,
                  };
                  // series.removePoint(999);
                  series.setData(
                    toCandlestickData(data, lastPoint),
                    true,
                    true
                  );
                }, 60000);
              },
            },*/
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
                events: {
                  click() {
                    setFlagsEnabled(true);
                  },
                },
              },
              {
                type: "month",
                count: 1,
                text: "1m",
                title: "View 1 month",
                events: {
                  click() {
                    setFlagsEnabled(true);
                  },
                },
              },
              {
                type: "month",
                count: 3,
                text: "3m",
                title: "View 3 months",
                events: {
                  click() {
                    setFlagsEnabled(false);
                  },
                },
              },
              {
                type: "year",
                count: 1,
                text: "1y",
                title: "View 1 year",
                events: {
                  click() {
                    setFlagsEnabled(false);
                  },
                },
              },
              {
                type: "all",
                text: "All",
                title: "View all",
                events: {
                  click() {
                    setFlagsEnabled(false);
                  },
                },
              },
            ],
            buttonTheme: {
              fill: "rgb(120, 145, 156)",
              stroke: "white",
              style: {
                color: theme.palette.text.primary,
              },
              hover: {
                color: "red",
              },
            },
          },
        });
      }
    );
  }, [flagsEnabled]);
  const theme = useTheme();
  return (
    <BaseLayout>
      <Grid container spacing={2}>
        <Grid item md={8} xs={8}>
          <Paper>
            <Box pt={2} pb={4} px={2}>
              <Typography>ETH Price Prediction</Typography>
              <Box my={2}>
                <div id="container" ref={ref} />
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
    </BaseLayout>
  );
}

export default Home;
