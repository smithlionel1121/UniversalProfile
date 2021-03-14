import React from "react";

import Card from "react-bootstrap/Card";

export default function AnonymousProfileCard() {
  return (
    <Card style={{ width: "18rem" }} className="m-4">
      <Card.Img
        variant="top"
        src={
          "https://universalprofile.cloud/images/icons/profile-placeholder.jpg"
        }
      />
      <Card.Body></Card.Body>
    </Card>
  );
}
