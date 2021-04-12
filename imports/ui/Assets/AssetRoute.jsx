import React from "react";
import { Route } from "react-router";

import AssetPage from "./AssetData/AssetPage";

export default function AssetRoute() {
  return <Route path="/asset" component={AssetPage} />;
}
