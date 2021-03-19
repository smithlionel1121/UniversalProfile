import React, { Fragment } from "react";

import { useParams } from "react-router-dom";

import "./profile-page.css";
import ERC725Account from "../ERC725Account";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export const URLProfileAddress = Component => () => {
  let { profileAddress } = useParams();
  return <Component address={profileAddress} filterAnon={false} />;
};

export function AddressProfileData({
  account,
  blockie,
  profileData,
  contractFound,
}) {
  if (!contractFound) {
    return <div className="text-center p-3">Contract address not found</div>;
  }
  const colClass = "d-flex justify-content-center py-2";

  const backgroundImage = !!account?.profile?.LSP3Profile?.backgroundImage
    ? `url(https://ipfs.lukso.network/ipfs/${account?.profile?.LSP3Profile?.backgroundImage[0]?.url?.substr(
        7
      )})`
    : "https://universalprofile.cloud/images/icons/profile-placeholder.jpg";

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
              src={profileData.profileImage}
              roundedCircle
            />
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={colClass}>
            <span>
              {`@${profileData.name || profileData.address.substring(2, 10)}`}
            </span>
          </Col>
        </Row>
        <Row>
          <Col xs={12} className={colClass}>
            <span>{profileData.description}</span>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
}

const AddressProfile = URLProfileAddress(ERC725Account(AddressProfileData));

export default AddressProfile;
