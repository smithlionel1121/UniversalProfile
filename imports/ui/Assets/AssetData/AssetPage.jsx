import React, { useState, Fragment } from "react";
import {
  Switch,
  Route,
  withRouter,
  useRouteMatch,
  Link,
  Redirect,
} from "react-router-dom";

import AddressAsset from "./AddressAsset";

import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export function AssetPage(props) {
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
      localStorage.setItem("myAsset", address);
    }
    props.history.push(`${path}/${address}`);
  }

  return (
    <Fragment>
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
          {!!localStorage.getItem("myAsset") ? (
            <Redirect to={`${path}/${localStorage.getItem("myAsset")}`} />
          ) : (
            <Container>
              <h3>Please enter an address.</h3>
            </Container>
          )}
        </Route>
        <Route
          path={`${path}/:assetAddress`}
          render={props => (
            <AddressAsset
              key={props.match.params.assetAddress}
              address={props.match.params.assetAddress}
            />
          )}
        />
      </Switch>
    </Fragment>
  );
}

export default withRouter(AssetPage);
