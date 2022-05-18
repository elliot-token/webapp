import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { betContract } from "services/contracts";
import { Better } from "services/contracts/types";
import AuthSelectors from "store/auth/selectors";
import web3Utils from "utils/web3";

const History = () => {
  const currentUser = useSelector(AuthSelectors.getCurrentUser);
  const [betsList, setBetsList] = useState<Better[]>([]);
  useEffect(() => {
    if (!currentUser?.walletAddress) {
      return;
    }
    (async () => {
      let result;
      try {
        result = await betContract.getBet(currentUser.walletAddress, 0);
      } catch (e) {
        // handle case when no bet found
        const error: any = e;
        if (error.code === "CALL_EXCEPTION") {
          console.log("Error on getBet()", e);
          return;
        }
        throw e;
      }
      setBetsList([
        {
          betAmount: web3Utils.fromWei(result[0]),
          securityId: web3Utils.toNumber(result[1]),
          id: web3Utils.toNumber(result[2]),
          price: web3Utils.toNumber(result[3]),
          securityName: result[4],
        },
      ]);
    })();

    return () => {
      betContract.removeAllListeners();
    };
  }, [currentUser?.walletAddress]);

  useEffect(() => {
    betContract.on("Bet", (addr, betAmount, id) => {
      console.log(betAmount, id);
      if (addr !== currentUser?.walletAddress) {
        return;
      }
      if (betsList.some((bet) => bet.id === web3Utils.toNumber(id))) {
        return;
      }
      setBetsList((prev) => [
        ...prev,
        {
          id: web3Utils.toNumber(id),
          betAmount: web3Utils.toNumber(betAmount),
        } as Better,
      ]);
    });
    return () => {
      betContract.removeAllListeners();
    };
  }, [currentUser?.walletAddress, betsList]);

  console.log(betsList);
  return (
    <Grid container mt={2}>
      <Grid item xs={8} md={8}>
        <Paper style={{ marginRight: "4px" }}>
          <Box pt={2} pb={4} px={2}>
            <Typography>History</Typography>
            {betsList.length === 0 ? (
              <Typography variant="caption" mt={2} display="block">
                No placed bet
              </Typography>
            ) : (
              betsList.map((item) => (
                <Box key={item.id} flexDirection="row" display="flex">
                  <Typography>Bet {item.id}: </Typography>&nbsp;
                  <Typography>
                    placed a bet with {item.betAmount} ELL{" "}
                  </Typography>
                </Box>
              ))
            )}
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default History;
