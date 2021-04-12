import React, { Fragment, useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import {
  Link,
  Redirect,
  Route,
  Switch,
  useRouteMatch,
  withRouter,
} from "react-router-dom";

import AddressProfile from "./AddressProfile";

export function ProfilePage(props) {
  const [address, setAddress] = useState("");
  const { path } = useRouteMatch();
  const [remember, setRemember] = useState(false);

  const onCheck = () => {
    setRemember(!remember);
  };

  const handleChange = (e) => setAddress(e.target.value);

  function getAddress() {
    if (remember) {
      localStorage.setItem("myProfile", address);
    }
    props.history.push(`${path}/${address}`);
  }

  const onEnter = (e) => {
    if (e.key === "Enter") {
      getAddress();
    }
  };

  return (
    <>
      <Container className="py-5">
        <Link to="/asset">Switch to assets</Link>
        <Form.Group controlId="contractAddress">
          <Form.Label>Contract Address:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Address"
            value={address}
            onChange={handleChange}
            onKeyDown={onEnter}
          />
        </Form.Group>
        <Form.Group controlId="rememberCheckbox">
          <Form.Check
            name="remember"
            type="checkbox"
            label="This is my profile"
            checked={remember}
            onChange={onCheck}
          />
        </Form.Group>
        <Button variant="primary" type="button" onClick={getAddress}>
          Submit
        </Button>
      </Container>

      <Switch>
        <Route exact path={path}>
          {localStorage.getItem("myProfile") ? (
            <Redirect to={`${path}/${localStorage.getItem("myProfile")}`} />
          ) : (
            <Container>
              <h3>Please enter an address.</h3>
            </Container>
          )}
        </Route>
        <Route
          path={`${path}/:profileAddress`}
          render={(routeProps) => (
            <AddressProfile
              key={routeProps.match.params.profileAddress}
              address={routeProps.match.params.profileAddress}
            />
          )}
        />
      </Switch>
    </>
  );
}

export default withRouter(ProfilePage);
