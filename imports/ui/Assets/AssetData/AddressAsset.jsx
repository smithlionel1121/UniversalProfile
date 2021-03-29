import React, { Fragment, useState } from "react";

import "./asset-page.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import makeBlockie from "ethereum-blockies-base64";
import useLSP4Asset from "../../Hooks/useLSP4Asset";

export function AddressAsset({ address }) {
  const [asset, contractFound, assetData] = useLSP4Asset(address);

  const {
    assetImages,
    name,
    description,
    symbol,
    availableSupply,
    totalSupply,
  } = assetData;
  const backgroundImage = `url(${assetData.backgroundImage})`;

  let img = makeBlockie(address);
  const [blockie, setblockie] = useState(img);

  if (contractFound === false) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  if (!contractFound) {
    return null;
  }

  return (
    <Fragment>
      <img className="identicon-right-abs" src={blockie} />
      <div style={{ backgroundImage }} className="asset-background-image" />

      <Container className="text-center ">
        <Row className="d-flex justify-content-around pb-4">
          {assetImages?.slice(1)?.map((image, idx) => (
            <Col xs="auto" key={idx} className="pb-5">
              <Image
                className="asset-image"
                src={`https://ipfs.lukso.network/ipfs/${image[0].url?.substr(
                  7
                )}`}
              />
            </Col>
          ))}
        </Row>
        <Row className="mb-5">
          <Col xs={12}>
            <h2 className="mb-0">{`${
              name || `@${address.substring(2, 10)}`
            }`}</h2>
          </Col>
          <Col xs={12} className="mb-2 fw-light">
            <h3 className="fw-normal">{`#${symbol}`}</h3>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col xs={6}>
            <Row>
              <h4>Available Supply</h4>
            </Row>
            <Row>
              <h4 className="fw-normal">{availableSupply}</h4>
            </Row>
          </Col>
          <Col xs={6}>
            <Row>
              <h4>Total Supply</h4>
            </Row>
            <Row>
              <h4 className="fw-normal">{totalSupply}</h4>
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={"colClass"}>
            <p>{description}</p>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default AddressAsset;
