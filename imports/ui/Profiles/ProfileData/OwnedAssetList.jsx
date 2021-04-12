import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import useFetchContractData from "../../Hooks/useFetchContractData";
import ProfileAsset from "./ProfileAsset";

async function tokenList(address) {
  const res = await fetch(
    `https://blockscout.com/lukso/l14/api?module=account&action=tokenlist&address=${address}`,
  );
  const data = res.json();
  return data;
}

export default function OwnedAssetList({ address }) {
  const [tokens] = useFetchContractData(tokenList, address);
  if (!tokens?.result?.length) return null;

  return (
    <Row className="py-5">
      <Col className="px-auto">
        <Row>
          <h3 className="fw-normal mb-2">Owned Assets</h3>
        </Row>
        <Row className="d-flex justify-content-around">
          {tokens.result.map((asset) => (
            <Col
              className="d-flex justify-content-around my-3"
              key={asset.contractAddress}
            >
              <ProfileAsset
                assetAddress={asset.contractAddress}
                account={address}
              />
            </Col>
          ))}
        </Row>
      </Col>
    </Row>
  );
}
