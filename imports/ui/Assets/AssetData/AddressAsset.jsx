import "./asset-page.css";

import makeBlockie from "ethereum-blockies-base64";
import React, { Fragment, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import useLSP4Asset from "../../Hooks/useLSP4Asset";

export function AddressAsset({ address }) {
  const [, contractFound, assetData] = useLSP4Asset(address);

  const {
    assetImages,
    name,
    description,
    symbol,
    availableSupply,
    totalSupply,
  } = assetData;
  const backgroundImage = `url(${assetData.backgroundImage})`;

  const img = makeBlockie(address);
  const [blockie] = useState(img);

  if (contractFound === false) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  if (!contractFound) {
    return null;
  }

  return (
    <>
      <img className="identicon-right-abs" src={blockie} alt="" />
      <div style={{ backgroundImage }} className="asset-background-image" />

      <Container className="text-center ">
        <Row className="d-flex justify-content-around pb-4">
          {assetImages
            ?.slice(1)
            ?.filter((val) => !!val)
            ?.map((image) => (
              <Col
                xs="auto"
                key={image[0].hash?.substring(2, 10)}
                className="pb-5"
              >
                <Image
                  className="asset-image"
                  src={`https://ipfs.lukso.network/ipfs/${image[0].url?.substr(
                    7,
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
          <Col xs={12} className="colClass">
            <p>{description}</p>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddressAsset;
