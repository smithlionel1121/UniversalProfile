import React, { useEffect, useState } from "react";

import ERC725 from "erc725.js";
import Web3 from "web3";
import makeBlockie from "ethereum-blockies-base64";

const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.l14.lukso.network")
);
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

const makeCancelable = promise => {
  let hasCanceled_ = false;

  const wrappedPromise = new Promise((resolve, reject) => {
    promise.then(
      val => (hasCanceled_ ? reject({ isCanceled: true }) : resolve(val)),
      error => (hasCanceled_ ? reject({ isCanceled: true }) : reject(error))
    );
  });

  return {
    promise: wrappedPromise,
    cancel() {
      hasCanceled_ = true;
    },
  };
};

export const ERC725Account = Component => ({ address, filterAnon = false }) => {
  let img = makeBlockie(address);
  const [blockie, setblockie] = useState(img);
  const erc725 = new ERC725(schema, address, web3.currentProvider);

  erc725.options.ipfsGateway = "https://ipfs.lukso.network/ipfs/";
  async function getLSP3ProfileData() {
    const data = await erc725.getAllData();
    data.profile = await erc725.fetchData("LSP3Profile");
    return data;
  }

  const [account, setAccount] = useState();
  const [contractFound, setContractFound] = useState(true);

  useEffect(() => {
    const cancelablePromise = makeCancelable(getLSP3ProfileData());
    cancelablePromise.promise
      .then(data => {
        setAccount(data);
        setContractFound(true);
      })
      .catch(err => {
        if (!err.isCanceled) {
          if (err.message === "Missing ERC725 contract address.") {
            setContractFound(false);
          } else {
            console.error(err);
          }
        }
      });
    return () => {
      cancelablePromise.cancel();
    };
  }, []);

  let profileData;
  const anon =
    !account?.profile?.LSP3Profile?.profileImage[0] &&
    !account?.profile?.LSP3Profile?.name;
  const profileImage = !!account?.profile?.LSP3Profile?.profileImage[0]
    ? `https://ipfs.lukso.network/ipfs/${account?.profile?.LSP3Profile?.profileImage[0]?.url?.substr(
        7
      )}`
    : `${location.origin}/images/icons/profile-placeholder.jpg`;
  const backgroundImage = !!account?.profile?.LSP3Profile?.backgroundImage[0]
    ? `https://ipfs.lukso.network/ipfs/${account?.profile?.LSP3Profile?.backgroundImage[0]?.url?.substr(
        7
      )}`
    : "";
  const name = account?.profile?.LSP3Profile?.name;
  const description = account?.profile?.LSP3Profile?.description;
  const links = account?.profile?.LSP3Profile?.links;
  profileData = {
    anon,
    address,
    profileImage,
    backgroundImage,
    name,
    description,
    links,
  };

  return (
    <Component
      blockie={blockie}
      filterAnon={filterAnon}
      account={account}
      profileData={profileData}
      contractFound={contractFound}
      erc725={erc725}
    />
  );
};

export default ERC725Account;
