import "./profile-page.css";

import makeBlockie from "ethereum-blockies-base64";
import React, { Fragment, useState } from "react";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

import useLSP3Profile from "../../Hooks/useLSP3Profile";
import OwnedAssetList from "./OwnedAssetList";
import ProfileAsset from "./ProfileAsset";

export function AddressProfileData({ address }) {
  const [account, contractFound, profileData] = useLSP3Profile(address);

  const { profileImage, name, description, links } = profileData;
  const backgroundImage = `url(${profileData.backgroundImage})`;

  const img = makeBlockie(address);
  const [blockie] = useState(img);

  if (contractFound === false) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  if (!contractFound) {
    return null;
  }
  console.log(links);

  const rowSpacing = "my-5";
  const linkCol = links?.length >= 4 ? 3 : 12 / links?.length;

  return (
    <>
      <img className="identicon-right-abs" src={blockie} alt="" />
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
                {links
                  .filter((link) => !!link)
                  .map((link) => (
                    <Col
                      xs={12}
                      sm={6}
                      md={linkCol}
                      className="d-flex justify-content-center"
                      key={link.title}
                    >
                      <a
                        className="profile-link bg-secondary bg-gradient my-2 px-4  rounded-pill text-decoration-none"
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
        {!!account["LSP3IssuedAssets[]"].filter?.((val) => !!val)?.length && (
          <Row className="py-5">
            <Col className="px-auto">
              <Row>
                <h3 className="fw-normal mb-2">Issued Assets</h3>
              </Row>
              <Row className="d-flex justify-content-around">
                {account["LSP3IssuedAssets[]"]
                  ?.filter((val) => !!val)
                  .map((assetAddress) => (
                    <Col
                      key={assetAddress}
                      className="d-flex justify-content-around my-3"
                    >
                      <ProfileAsset
                        assetAddress={assetAddress}
                        account={address}
                        issued
                      />
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
        )}
        <OwnedAssetList address={address} />
        <Row className={rowSpacing}>
          <Col xs={12}>
            <span>{description}</span>
          </Col>
        </Row>
      </Container>
    </>
  );
}

export default AddressProfileData;
