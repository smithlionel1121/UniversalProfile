import React, { useState, Fragment } from "react";
import {
  Switch,
  Route,
  useRouteMatch,
  withRouter,
  Redirect,
  Link,
} from "react-router-dom";

import AddressProfile from "./AddressProfile";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function ProfilePage(props) {
  const [address, setAddress] = useState("");
  let { path, url } = useRouteMatch();
  const [remember, setRemember] = useState(false);

  const onCheck = () => {
    setRemember(!remember);
  };

  const handleChange = e => setAddress(e.target.value);

  const onEnter = e => {
    if (e.key === "Enter") {
      getAddress();
    }
  };

  function getAddress() {
    if (remember) {
      localStorage.setItem("myProfile", address);
    }
    props.history.push(`${path}/${address}`);
  }

  return (
    <Fragment>
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
          {!!localStorage.getItem("myProfile") ? (
            <Redirect to={`${path}/${localStorage.getItem("myProfile")}`} />
          ) : (
            <Container>
              <h3>Please enter an address.</h3>
            </Container>
          )}
        </Route>
        <Route
          path={`${path}/:profileAddress`}
          render={props => (
            <AddressProfile
              key={props.match.params.profileAddress}
              address={props.match.params.profileAddress}
            />
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default withRouter(ProfilePage);
