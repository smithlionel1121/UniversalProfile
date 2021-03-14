import React from "react";

import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";

export default function Header() {
  return (
    <Container className="my-5 text-center">
      <Row>
        <Image
          src="https://universalprofile.cloud/images/up-logo.svg"
          width="30"
          height="30"
        />
      </Row>
      <Row>
        <h1>Universal Profiles</h1>
      </Row>
    </Container>
  );
}
