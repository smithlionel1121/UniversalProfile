import React from "react";

import Card from "react-bootstrap/Card";

import BaseCard from "./BaseCard";

export default function LSP3ProfileCard({ LSP3Profile }) {
  return (
    <BaseCard>
      <Card.Img
        variant="top"
        src={`https://ipfs.lukso.network/ipfs/${LSP3Profile?.profileImage[0]?.url?.substr(
          7
        )}`}
      />
      <Card.Body>
        <Card.Text>{LSP3Profile?.name}</Card.Text>
        {/* <Card.Text style={{ height: "3rem" }} className="overflow-auto">
          {LSP3Profile?.description}
        </Card.Text> */}
      </Card.Body>
    </BaseCard>
  );
}
