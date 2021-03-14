import React from "react";
import {
  InMemoryCache,
  ApolloProvider,
  ApolloClient,
  ApolloLink,
} from "@apollo/client";
import { BatchHttpLink } from "@apollo/client/link/batch-http";
import Profiles from "./Profiles/Profiles";
import Header from "./Header/Header";
// import { MeteorAccountsLink } from 'meteor/apollo'

import Container from "react-bootstrap/Container";

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
    <Container>
      <Header />
      <Profiles />
    </Container>
  </ApolloProvider>
);
