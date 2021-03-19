import React from "react";

import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

import "./profile-list.css";

export default function LSP3ProfileCard({ LSP3Profile, blockie }) {
  return (
    <Link
      to={`address/${LSP3Profile.address}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="m-3 profile-list-profile text-dark">
        <Card.Img
          className="profile-list-image"
          variant="top"
          src={LSP3Profile?.profileImage}
        />
        <Card.Body className="profile-list-content">
          <Card.Text className="name">{LSP3Profile?.name}</Card.Text>
          <img className="identicon-br" src={blockie} />
        </Card.Body>
      </Card>
    </Link>
  );
}
