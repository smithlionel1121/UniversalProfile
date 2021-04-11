import React from "react";
import { Link } from "react-router-dom";
import useLSP4AssetData from "../../Hooks/useLSP4Asset";

export default function ProfileAsset({
  assetAddress,
  account,
  issued = false,
}) {
  const [asset, contractFound, assetData] = useLSP4AssetData(
    assetAddress,
    account
  );
  const backgroundImage = `url(${assetData.backgroundImage})`;
  const { name, symbol, tokenHolderBalance, totalSupply } = assetData;

  const balance = issued
    ? `(${tokenHolderBalance}/${totalSupply})`
    : tokenHolderBalance;

  return (
    <Link to={`/asset/${assetAddress}`} style={{ textDecoration: "none" }}>
      <div className="profile-asset-box">
        <div style={{ backgroundImage }} className="profile-asset-image" />
        <span>{name}</span>
        <br />
        <span>{`#${symbol}`}</span>
        <br />
        <span>{balance}</span>
      </div>
    </Link>
  );
}
