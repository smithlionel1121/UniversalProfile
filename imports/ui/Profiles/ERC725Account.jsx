import React, { useEffect, useState } from "react";

import ERC725 from "erc725.js";
import Web3 from "web3";

import AnonymousProfileCard from "./ProfileList/AnonymousProfileCard";
import LSP3ProfileCard from "./ProfileList/LSP3ProfileCard";

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.l14.lukso.network")
);

export default function ERC725Account({ designer, filterAnon }) {
  const schema = [
    {
      name: "SupportedStandards:ERC725Account",
      key: "0xeafec4d89fa9619884b6b89135626455000000000000000000000000afdeb5d6",
      keyType: "Mapping",
      valueContent: "0xafdeb5d6",
      valueType: "bytes",
    },
    {
      name: "LSP3Profile",
      key: "0x5ef83ad9559033e6e941db7d7c495acdce616347d28e90c7ce47cbfcfcad3bc5",
      keyType: "Singleton",
      valueContent: "JSONURL",
      valueType: "bytes",
    },
    {
      name: "LSP1UniversalReceiverDelegate",
      key: "0x0cfc51aec37c55a4d0b1a65c6255c4bf2fbdf6277f3cc0730c45b828b6db8b47",
      keyType: "Singleton",
      valueContent: "Address",
      valueType: "address",
    },
    {
      name: "LSP3IssuedAssets[]",
      key: "0x3a47ab5bd3a594c3a8995f8fa58d0876c96819ca4516bd76100c92462f2f9dc0",
      keyType: "Array",
      valueContent: "Number",
      valueType: "uint256",
      elementValueContent: "Address",
      elementValueType: "address",
    },
  ];

  const { address } = designer;

  const erc725 = new ERC725(schema, address, web3.currentProvider);

  const getLSP3ProfileData = async () => {
    const data = await erc725.getAllData();
    data.profile = await erc725.fetchData("LSP3Profile");
    return data;
  };

  const [account, setAccount] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const data = await getLSP3ProfileData();
      setAccount(data);
    };
    fetchData();
  }, []);

  return account?.profile?.LSP3Profile?.profileImage[0] &&
    account?.profile?.LSP3Profile?.name ? (
    <LSP3ProfileCard LSP3Profile={account?.profile?.LSP3Profile} />
  ) : filterAnon ? null : (
    <AnonymousProfileCard />
  );
}
