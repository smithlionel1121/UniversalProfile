import React from "react";
import {
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
  ApolloLink,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import Header from "./Header/Header";
// import { MeteorAccountsLink } from 'meteor/apollo'

import NavBar from "./Header/NavBar";
import ProfilerRoute from "./Profiles/ProfilerRoute";
import AssetRoute from "./Assets/AssetRoute";
import Footer from "./Footer/Footer";

const cache = new InMemoryCache({
  typePolicies: {
    Designer: {
      keyFields: ["id"],
    },
    Profile: {
      keyFields: ["id"],
    },
  },
});

const link = ApolloLink.from([
  // MeteorAccountsLink(),
  new BatchHttpLink({
    uri: "/graphql",
  }),
]);

const client = new ApolloClient({
  uri: "/graphql",
  cache,
  link,
});

export const App = () => (
  <ApolloProvider client={client}>
    <Router>
      <div className="mb-5 pb-5">
        <NavBar />
        <Header />
        <Switch>
          <Redirect exact from="/" to="/designers" />
          <Route path="/asset">
            <AssetRoute />
          </Route>
          <Route path="/">
            <ProfilerRoute />
          </Route>
        </Switch>
      </div>
      <Footer />
    </Router>
  </ApolloProvider>
);
