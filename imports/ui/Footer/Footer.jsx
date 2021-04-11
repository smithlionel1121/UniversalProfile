import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default function Footer() {
  return (
    <footer className="text-center mt-auto">
      <Container>
        <Row>
          <Col>
            <span>Developed by :</span>
          </Col>
        </Row>
        <Row>
          <Col>
            <span className="tag-font">LIONEL</span>
          </Col>
        </Row>
      </Container>
      <br />
    </footer>
  );
}
