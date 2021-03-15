import React from "react";

import Card from "react-bootstrap/Card";
import BaseCard from "./BaseCard";

export default function AnonymousProfileCard() {
  return (
    <BaseCard style={{ width: "18rem" }} className="m-4">
      <Card.Img
        variant="top"
        src={
          "https://universalprofile.cloud/images/icons/profile-placeholder.jpg"
        }
      />
      <Card.Body></Card.Body>
    </BaseCard>
  );
}
