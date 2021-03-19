import React, { Fragment, useState } from "react";

import Profiles from "./ProfileQueries/Profiles";
import Designers from "./ProfileQueries/Designers";
import ProfilePage from "./ProfileData/ProfilePage";

import { Route } from "react-router";
import Container from "react-bootstrap/Container";

export default function ProfilerRoute() {
  const [filterAnon, setFilterAnon] = useState(false);
  return (
    <Fragment>
      <Container>
        <Route path="/profiles">
          <Profiles filterAnon={filterAnon} setFilterAnon={setFilterAnon} />
        </Route>
        <Route path="/designers">
          <Designers filterAnon={filterAnon} setFilterAnon={setFilterAnon} />
        </Route>
      </Container>
      <Route path="/address">
        <ProfilePage />
      </Route>
    </Fragment>
  );
}
