import React, { Fragment, useState } from "react";

import Profiles from "./ProfileQueries/Profiles";
import Designers from "./ProfileQueries/Designers";

import { Route } from "react-router";

export default function ProfilerRoute() {
  const [filterAnon, setFilterAnon] = useState(false);
  return (
    <Fragment>
      <Route path="/profiles">
        <Profiles filterAnon={filterAnon} setFilterAnon={setFilterAnon} />
      </Route>
      <Route path="/designers">
        <Designers filterAnon={filterAnon} setFilterAnon={setFilterAnon} />
      </Route>
    </Fragment>
  );
}
