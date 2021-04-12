import useERC725Contract from "./useERC725Contract";
import useFetchContractData from "./useFetchContractData";

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

export default function useLSP3Profile(address) {
  const erc725 = useERC725Contract(address, schema);

  async function getLSP3ProfileData() {
    const data = await erc725.getAllData();
    data.profile = await erc725.fetchData("LSP3Profile");
    return data;
  }

  const [contract, contractFound] = useFetchContractData(getLSP3ProfileData);

  const anon =
    !contract?.profile?.LSP3Profile?.profileImage[0] &&
    !contract?.profile?.LSP3Profile?.name;
  const profileImage = contract?.profile?.LSP3Profile?.profileImage[0]
    ? `https://ipfs.lukso.network/ipfs/${contract?.profile?.LSP3Profile?.profileImage[0]?.url?.substr(
        7,
      )}`
    : "/images/profile-placeholder.jpg";
  const backgroundImage = contract?.profile?.LSP3Profile?.backgroundImage[0]
    ? `https://ipfs.lukso.network/ipfs/${contract?.profile?.LSP3Profile?.backgroundImage[0]?.url?.substr(
        7,
      )}`
    : "";

  const lazyProfileImage = contract?.profile?.LSP3Profile?.profileImage[1]
    ? `https://ipfs.lukso.network/ipfs/${contract?.profile?.LSP3Profile?.profileImage
        ?.slice(-1)[0]
        ?.url?.substr(7)}`
    : "/images/profile-placeholder.jpg";

  const name = contract?.profile?.LSP3Profile?.name;
  const description = contract?.profile?.LSP3Profile?.description;
  const links = contract?.profile?.LSP3Profile?.links;
  const profileData = {
    anon,
    address,
    profileImage,
    backgroundImage,
    name,
    description,
    links,
    lazyProfileImage,
  };

  return [contract, contractFound, profileData];
}
