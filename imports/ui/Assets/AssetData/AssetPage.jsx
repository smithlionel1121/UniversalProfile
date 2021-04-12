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

import AddressAsset from "./AddressAsset";

export function AssetPage(props) {
  const [address, setAddress] = useState("");
  const { path } = useRouteMatch();
  const [remember, setRemember] = useState(false);

  const onCheck = () => {
    setRemember(!remember);
  };

  const handleChange = (e) => setAddress(e.target.value);

  function getAddress() {
    if (remember) {
      localStorage.setItem("myAsset", address);
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
        <Link to="/address">Switch to profiles</Link>
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
            label="Remember asset"
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
          {localStorage.getItem("myAsset") ? (
            <Redirect to={`${path}/${localStorage.getItem("myAsset")}`} />
          ) : (
            <Container>
              <h3>Please enter an address.</h3>
            </Container>
          )}
        </Route>
        <Route
          path={`${path}/:assetAddress`}
          render={(routeProps) => (
            <AddressAsset
              key={routeProps.match.params.assetAddress}
              address={routeProps.match.params.assetAddress}
            />
          )}
        />
      </Switch>
    </>
  );
}

export default withRouter(AssetPage);
