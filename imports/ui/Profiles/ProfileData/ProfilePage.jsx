import React, { useState, Fragment } from "react";
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  withRouter,
} from "react-router-dom";

import AddressProfile from "./AddressProfile";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function ProfilePage() {
  const [address, setAddress] = useState("");
  let { path, url } = useRouteMatch();

  return (
    <Fragment>
      <Container className="py-5">
        <Form.Group controlId="contractAddress">
          <Form.Label>Contract Address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            onChange={e => setAddress(e.target.value)}
          />
        </Form.Group>
        <Form.Group controlId="rememberCheckbox">
          <Form.Check type="checkbox" label="This is my profile" />
        </Form.Group>
        <Link to={`${path}/${address}`}>
          <Button variant="primary" type="button">
            Submit
          </Button>
        </Link>
      </Container>

      <Switch>
        <Route exact path={path}>
          <Container>
            <h3>Please enter an address.</h3>
          </Container>
        </Route>
        <Route
          path={`${path}/:profileAddress`}
          render={props => (
            <AddressProfile
              key={props.match.params.profileAddress}
              address={address}
            />
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default ProfilePage;
