import { Box, Grid, Paper, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { betContract } from "services/contracts";
import AuthSelectors from "store/auth/selectors";
import web3Utils from "utils/web3";

const History = () => {
  const currentUser = useSelector(AuthSelectors.getCurrentUser);
  const [balance, setBalance] = useState("no placed bet");
  useEffect(() => {
    if (!currentUser?.walletAddress) {
      return;
    }
    (async () => {
      const result = await betContract.getBet(currentUser.walletAddress, 1);

      console.log(result);
    })();

    betContract.on("Bet", (...args) => {
      console.log("new Bet event", args);
    });
    return () => {
      betContract.removeAllListeners();
    };
  }, [currentUser?.walletAddress]);

  return (
    <Grid container mt={2}>
      <Grid item xs={8} md={8}>
        <Paper style={{ marginRight: "4px" }}>
          <Box pt={2} pb={4} px={2}>
            <Typography>History</Typography>
            <Typography variant="caption" mt={2} display="block">
              {balance}
            </Typography>
          </Box>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default History;
