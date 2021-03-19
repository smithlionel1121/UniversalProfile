import React from "react";

import Nav from "react-bootstrap/Nav";
import { LinkContainer } from "react-router-bootstrap";

export default function NavBar() {
  return (
    <Nav
      justify
      variant="tabs"
      activeKey={`/${window.location.pathname.split("/")[1]}`}
    >
      <Nav.Item>
        <LinkContainer to="/profiles">
          <Nav.Link>Profiles</Nav.Link>
        </LinkContainer>
      </Nav.Item>
      <Nav.Item>
        <LinkContainer to="/designers">
          <Nav.Link>Designers</Nav.Link>
        </LinkContainer>
      </Nav.Item>
    </Nav>
  );
}
