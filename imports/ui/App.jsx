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

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        allDesigners: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
        allProfiles: {
          keyArgs: false,
          merge(existing = [], incoming) {
            return [...existing, ...incoming];
          },
        },
      },
    },
  },
}).restore(window.__APOLLO_STATE__);

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
    </Router>
  </ApolloProvider>
);
