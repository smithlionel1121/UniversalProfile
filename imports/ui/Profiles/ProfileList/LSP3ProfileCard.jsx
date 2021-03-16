import React from "react";

import Card from "react-bootstrap/Card";

import "./profile-list.css";

export default function LSP3ProfileCard({ LSP3Profile, blockie }) {
  const profileImage = !!LSP3Profile?.profileImage
    ? `https://ipfs.lukso.network/ipfs/${LSP3Profile?.profileImage[0]?.url?.substr(
        7
      )}`
    : "https://universalprofile.cloud/images/icons/profile-placeholder.jpg";
  return (
    <Card className="m-3 profile-list-profile">
      <Card.Img
        className="profile-list-image"
        variant="top"
        src={profileImage}
      />
      <Card.Body className="profile-list-content">
        <Card.Text className="name">{LSP3Profile?.name}</Card.Text>
        <img className="identicon" src={blockie} />
      </Card.Body>
    </Card>
  );
}
