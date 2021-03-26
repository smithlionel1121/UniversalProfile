import React, { Fragment, useState } from "react";
import { useParams, withRouter } from "react-router-dom";

import "./asset-page.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import makeBlockie from "ethereum-blockies-base64";
import useLSP4Asset from "../../Hooks/useLSP4Asset";

export function AddressAsset() {
  let { assetAddress } = useParams();
  let address = assetAddress;
  const [asset, contractFound, assetData] = useLSP4Asset(address);

  const { assetImages, name, description } = assetData;
  const backgroundImage = `url(${assetData.backgroundImage})`;

  let img = makeBlockie(address);
  const [blockie, setblockie] = useState(img);
  if (!contractFound) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  const colClass = "d-flex justify-content-center py-2";

  return (
    <Fragment>
      <img className="identicon-right-abs" src={blockie} />
      <div style={{ backgroundImage }} className="asset-background-image" />

      <Container className="text-center">
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
        <Row>
          <Col xs={12} className={colClass}>
            <h2>{`${name || `@${address.substring(2, 10)}`}`}</h2>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={colClass}>
            <span>{description}</span>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default withRouter(AddressAsset);
