import React from "react";
import Container from "react-bootstrap/Container";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <Container className="my-5 text-center">
      <Row>
        <Link to="/" style={{ width: "30", height: "30" }}>
          <Image src="/images/up-logo.svg" height="30" />
        </Link>
      </Row>
      <Row>
        <h1>Universal Profiles</h1>
      </Row>
    </Container>
  );
}
