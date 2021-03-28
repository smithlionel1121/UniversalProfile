import React, { Fragment, useState } from "react";
import { useParams } from "react-router-dom";

import "./profile-page.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import makeBlockie from "ethereum-blockies-base64";
import useLSP3Profile from "../../Hooks/useLSP3Profile";

export function AddressProfileData() {
  let { profileAddress } = useParams();
  let address = profileAddress;
  const [account, contractFound, profileData] = useLSP3Profile(address);

  const { profileImage, name, description } = profileData;
  const backgroundImage = `url(${profileData.backgroundImage})`;

  let img = makeBlockie(address);
  const [blockie, setblockie] = useState(img);

  if (contractFound === false) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  if (!contractFound) {
    return null;
  }
  const colClass = "d-flex justify-content-center py-2";

  return (
    <Fragment>
      <img className="identicon-right-abs" src={blockie} />
      <div style={{ backgroundImage }} className="profile-background-image" />

      <Container className="text-center">
        <Row>
          <Col xs={12} className="d-flex justify-content-center pb-4">
            <Image
              style={{
                minWidth: "250px",
                maxWidth: "250px",
                maxHeight: "250px",
              }}
              src={profileImage}
              roundedCircle
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={colClass}>
            <span>{`@${name || address.substring(2, 10)}`}</span>
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

export default AddressProfileData;
