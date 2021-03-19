import React from "react";

import Nav from "react-bootstrap/Nav";
import { withRouter } from "react-router";
import { LinkContainer } from "react-router-bootstrap";

export function NavBar(props) {
  return (
    <Nav
      justify
      variant="tabs"
      activeKey={`/${props.location.pathname.split("/")[1]}`}
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

export default withRouter(NavBar);
