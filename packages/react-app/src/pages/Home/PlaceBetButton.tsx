import { Button } from "@mui/material";

import React, { useEffect } from "react";
import { betContract } from "services/contracts";

const PlaceBetButton = () => {
  useEffect(() => {
    //console.log(betContract.on("T"));
  }, []);
  return (
    <Button
      variant="contained"
      style={{
        width: "100%",
      }}
      onClick={async () => {
        let result;

        try {
          result = await betContract.functions.placeBets(1, 1, "toto");
        } catch (e) {
          throw e;
        }
        console.log(result);
      }}
    >
      Confirm
    </Button>
  );
};

export default PlaceBetButton;
