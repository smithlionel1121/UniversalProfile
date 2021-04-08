import React, { Fragment, useState } from "react";

import "./profile-page.css";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

import makeBlockie from "ethereum-blockies-base64";
import useLSP3Profile from "../../Hooks/useLSP3Profile";

export function AddressProfileData({ address }) {
  const [account, contractFound, profileData] = useLSP3Profile(address);

  const { profileImage, name, description, links } = profileData;
  const backgroundImage = `url(${profileData.backgroundImage})`;

  let img = makeBlockie(address);
  const [blockie, setblockie] = useState(img);

  if (contractFound === false) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  if (!contractFound) {
    return null;
  }

  let rowSpacing = "my-5";
  let linkCol = links?.length >= 4 ? 3 : 12 / links?.length;

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
        <Row className="mb-5">
          <Col xs={12}>
            <h2>{`@${name || address.substring(2, 10)}`}</h2>
          </Col>
        </Row>
        {!!links?.length && (
          <Row>
            <Col className="px-auto">
              <Row>
                <h3 className="fw-normal mb-2">Links</h3>
              </Row>
              <Row className="d-flex justify-content-around">
                {links.map(link => (
                  <Col
                    xs={linkCol}
                    className="d-flex justify-content-center"
                    key={link.title}
                  >
                    <a
                      className="profile-link bg-secondary bg-gradient my-2 rounded-pill text-decoration-none"
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{link.title}</span>
                    </a>
                  </Col>
                ))}
              </Row>
            </Col>
          </Row>
        )}
        <Row className={rowSpacing}>
          <Col xs={12}>
            <span>{description}</span>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

export default AddressProfileData;
