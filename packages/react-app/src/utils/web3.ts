import web3 from "web3";
import BN from "bn.js";

const web3Utils = {
  fromWei(wei: BN) {
    return Number.parseFloat(web3.utils.fromWei(wei.toString()));
  },
};

export default web3Utils;
