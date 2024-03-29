import { useEffect, useState } from "react";

import abi from "../abis/LSP4DigitalCertificate.json";
import useERC725Contract from "./useERC725Contract";
import { makeCancelable, promisedBatchRequest } from "./utils";

const schema = [
  {
    name: "SupportedStandards:LSP4DigitalCertificate",
    key: "0xeafec4d89fa9619884b6b89135626455000000000000000000000000abf0613c",
    keyType: "Mapping",
    valueContent: "0xabf0613c",
    valueType: "bytes",
  },
  {
    name: "LSP4Metadata",
    key: "0x9afb95cacc9f95858ec44aa8c3b685511002e30ae54415823f406128b85b238e",
    keyType: "Singleton",
    valueContent: "JSONURL",
    valueType: "bytes",
  },
  {
    name: "LSP4Creators[]",
    key: "0x114bd03b3a46d48759680d81ebb2b414fda7d030a7105a851867accf1c2352e7",
    keyType: "Array",
    valueContent: "Number",
    valueType: "uint256",
    elementValueContent: "Address",
    elementValueType: "address",
  },
];

export default function useLSP4AssetData(assetAddress, account) {
  const erc725 = useERC725Contract(assetAddress, schema);

  async function getLSP4AssetData() {
    const data = await erc725.getAllData();
    data.asset = await erc725.fetchData("LSP4Metadata");
    return data;
  }

  async function web3Fetch() {
    const contract = new web3.eth.Contract(abi, assetAddress);

    let owner;
    let name;
    let symbol;
    let totalSupply;

    try {
      [owner, name, symbol, totalSupply] = await promisedBatchRequest([
        contract.methods.owner().call,
        contract.methods.name().call,
        contract.methods.symbol().call,
        contract.methods.totalSupply().call,
      ]);
    } catch (error) {
      console.log(
        "Couldn't fetch asset data from the smart contract",
        assetAddress,
        error,
      );
    }

    const availableSupply = await contract.methods.balanceOf(owner).call();
    const tokenHolderBalance = account
      ? await contract.methods.balanceOf(account).call()
      : null;

    const data = {
      owner,
      name,
      symbol,
      totalSupply,
      availableSupply,
      tokenHolderBalance,
    };

    return data;
  }

  const [data, setData] = useState({
    contract: {},
    contractFound: null,
    asset: {},
  });

  useEffect(() => {
    const allData = Promise.all([
      getLSP4AssetData(erc725),
      web3Fetch(assetAddress, account),
    ]);
    const cancelablePromise = makeCancelable(allData);
    cancelablePromise.promise
      .then(([contract, asset]) => {
        setData({
          contract,
          contractFound: true,
          asset,
        });
      })
      .catch((err) => {
        if (!err.isCanceled) {
          setData({
            contract: {},
            contractFound: false,
            asset: {},
          });
          if (err.message !== "Missing ERC725 contract address.") {
            console.error(err);
          }
        }
      });

    return () => {
      cancelablePromise.cancel();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const { contract, contractFound, asset } = data;

  const assetImages = contract?.asset?.LSP4Metadata?.images;
  const backgroundImage = contract?.asset?.LSP4Metadata?.images?.[0]?.[0]?.url
    ? `https://ipfs.lukso.network/ipfs/${contract?.asset?.LSP4Metadata?.images?.[0]?.[0]?.url?.substr(
        7,
      )}`
    : "/images/digital-fashion-placeholder.jpg";
  const description = contract?.asset?.LSP4Metadata?.description;
  const assetData = {
    assetImages,
    backgroundImage,
    description,
    ...asset,
  };

  return [contract, contractFound, assetData];
}
