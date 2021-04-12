import "./profile-list.css";

import React from "react";
import Card from "react-bootstrap/Card";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { Link } from "react-router-dom";

export default function LSP3ProfileCard({ LSP3Profile, blockie }) {
  return (
    <Link
      to={`address/${LSP3Profile.address}`}
      style={{ textDecoration: "none" }}
    >
      <Card className="m-3 profile-list-profile text-dark">
        <Card.Img
          as={LazyLoadImage}
          className="profile-list-image"
          variant="top"
          src={LSP3Profile?.profileImage}
          placeholderSrc={
            LSP3Profile?.lazyProfileImage || "/images/profile-placeholder.jpg"
          }
        />
        <Card.Body className="profile-list-content">
          <Card.Text className="name">{LSP3Profile?.name}</Card.Text>
          <img className="identicon-br" src={blockie} alt="" />
        </Card.Body>
      </Card>
    </Link>
  );
}
