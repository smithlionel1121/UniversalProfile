import React from "react";

import ERC725 from "erc725.js";

export default function useERC725Contract(address, schema) {
  const erc725 = new ERC725(schema, address, web3.currentProvider);
  erc725.options.ipfsGateway = "https://ipfs.lukso.network/ipfs/";

  return erc725;
}
