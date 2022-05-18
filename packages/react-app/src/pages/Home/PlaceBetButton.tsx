import { Button } from "@mui/material";

import React, { useEffect } from "react";
import { betContract, chainAddresses, tokenContract } from "services/contracts";

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
        /*    const transactionParameters = {
          nonce: "0x00", // ignored by MetaMask
          gasPrice: "0x09184e72a000", // customizable by user during MetaMask confirmation.
          gas: "0x2710", // customizable by user during MetaMask confirmation.
          to: "0x0000000000000000000000000000000000000000", // Required except during contract publications.
          from: window.ethereum.selectedAddress, // must match user's active address.
          value: "0x00", // Only required to send ether to the recipient from the initiating external account.
          data:
            "0x7f7465737432000000000000000000000000000000000000000000000000000000600057", // Optional, but used for defining smart contract creation and interaction.
          chainId: "0x3", // Used to prevent transaction reuse across blockchains. Auto-filled by MetaMask.
        };

        // txHash is a hex string
        // As with any RPC call, it may throw an error
        const txHash = await window.ethereum.request({
          method: "eth_sendTransaction",
          params: [transactionParameters],
        });
        */

        try {
          await tokenContract.functions.approve(
            chainAddresses.bet,
            "2000000000000000000"
          );
        } catch (e) {
          throw e;
        }

        let result;

        try {
          result = await betContract.placeBets(2, 1, 1, "toto");
        } catch (e) {
          const error: any = e;
          if (error.code === 4001) {
            console.log("user rejected");
            return;
          }
          throw e;
        }
        await result.wait((conf: any) => {
          console.log(conf);
        });
        console.log(result);
      }}
    >
      Confirm
    </Button>
  );
};

export default PlaceBetButton;
