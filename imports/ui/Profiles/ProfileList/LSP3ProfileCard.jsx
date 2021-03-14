import React from "react";

import Card from "react-bootstrap/Card";

export default function LSP3ProfileCard({ LSP3Profile }) {
  return (
    <Card style={{ width: "18rem" }} className="m-4">
      <Card.Img
        variant="top"
        src={`https://ipfs.lukso.network/ipfs/${LSP3Profile?.profileImage[0]?.url?.substr(
          7
        )}`}
      />
      <Card.Body>
        <Card.Title>{LSP3Profile?.name}</Card.Title>
        <Card.Text>{LSP3Profile?.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
