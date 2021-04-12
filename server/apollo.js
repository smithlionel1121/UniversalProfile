import { ApolloServer, gql } from "apollo-server-express";
import { WebApp } from "meteor/webapp";

import ProfileProvider from "./datasource";

const typeDefs = gql`
  type Profile {
    id: String!
    username: String!
    address: String!
  }

  type Designer {
    id: String!
    username: String!
    address: String!
  }

  type Query {
    profiles(username: String, pageSize: Int): [Profile]!
    designers(username: String, pageSize: Int): [Designer]!
  }
`;

const resolvers = {
  Query: {
    profiles: async (_, { username = "", pageSize = 20 }, { dataSources }) => {
      let profiles = await dataSources.ProfileProvider.getAllProfiles();

      if (username) {
        profiles = profiles.filter(
          (profile) => profile.username.indexOf(username) === 0,
        );
      }
      if (profiles.length > pageSize) return profiles.slice(0, pageSize);
      return profiles;
    },

    designers: async (_, { username = "", pageSize = 20 }, { dataSources }) => {
      let designers = await dataSources.ProfileProvider.getAllDesigners();

      if (username) {
        designers = designers.filter(
          (designer) => designer.username.indexOf(username) === 0,
        );
      }
      if (designers.length > pageSize) return designers.slice(0, pageSize);
      return designers;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => {
    return {
      ProfileProvider: new ProfileProvider(),
    };
  },
  // context: async ({ req }) => ({
  //   user: await getUser(req.headers.authorization)
  // })
});

server.applyMiddleware({
  app: WebApp.connectHandlers,
  cors: true,
});
