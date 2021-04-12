import React, { Fragment, useState } from "react";
import Container from "react-bootstrap/Container";
import { Route } from "react-router";

import ProfilePage from "./ProfileData/ProfilePage";
import Designers from "./ProfileQueries/Designers";
import Profiles from "./ProfileQueries/Profiles";

export default function ProfilerRoute() {
  const [filterAnon, setFilterAnon] = useState(false);
  return (
    <>
      <Container>
        <Route path="/profiles">
          <Profiles filterAnon={filterAnon} setFilterAnon={setFilterAnon} />
        </Route>
        <Route path="/designers">
          <Designers filterAnon={filterAnon} setFilterAnon={setFilterAnon} />
        </Route>
      </Container>
      <Route path="/address" component={ProfilePage} />
    </>
  );
}
