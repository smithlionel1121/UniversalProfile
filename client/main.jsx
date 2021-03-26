import React from "react";
import { Meteor } from "meteor/meteor";
import { render } from "react-dom";
import { App } from "/imports/ui/App";

import Web3 from "web3";
const web3 = new Web3(
  new Web3.providers.HttpProvider("https://rpc.l14.lukso.network")
);

Meteor.startup(() => {
  window.web3 = web3;
  render(<App />, document.getElementById("react-target"));
});
