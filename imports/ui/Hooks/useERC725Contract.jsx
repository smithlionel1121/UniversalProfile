import React from "react";

import ERC725 from "erc725.js";
import Web3 from "web3";

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.l14.lukso.network")
);

export default function useERC725Contract(address, schema) {
  const erc725 = new ERC725(schema, address, web3.currentProvider);
  erc725.options.ipfsGateway = "https://ipfs.lukso.network/ipfs/";

  return erc725;
}
