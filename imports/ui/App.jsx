import React from "react";
import {
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
  ApolloLink,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
// import { MeteorAccountsLink } from 'meteor/apollo'

const cache = new InMemoryCache().restore(window.__APOLLO_STATE__);

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
    <div>
      <h1>Welcome to Meteor! ☄</h1>
    </div>
  </ApolloProvider>
);
