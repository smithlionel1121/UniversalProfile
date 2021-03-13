import { ApolloServer, gql } from "apollo-server-express";
import { WebApp } from "meteor/webapp";

import { ProfileProvider } from "./datasource";
import { paginateResults } from "./utils";

export const typeDefs = gql`
  type Profile {
    id: String!
    username: String!
    address: String!
    timestamp: String!
  }

  type Designer {
    id: String!
    username: String!
    address: String!
    timestamp: String!
  }

  type Query {
    profiles(pageSize: Int, after: String): ProfileConnection!
    designers(pageSize: Int, after: String): DesignersConnection!
  }

  type ProfileConnection {
    cursor: String!
    hasMore: Boolean!
    profiles: [Profile]!
  }
  type DesignersConnection {
    cursor: String!
    hasMore: Boolean!
    designers: [Designer]!
  }
`;

const resolvers = {
  Query: {
    profiles: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allProfiles = await dataSources.ProfileProvider.getAllProfiles();
      allProfiles.reverse();
      const profiles = paginateResults({
        after,
        pageSize,
        results: allProfiles,
      });

      return {
        profiles,
        cursor: profiles.length ? profiles[profiles.length - 1].cursor : null,
        hasMore: profiles.length
          ? profiles[profiles.length - 1].cursor !==
            allProfiles[allProfiles.length - 1].cursor
          : false,
      };
    },

    designers: async (_, { pageSize = 20, after }, { dataSources }) => {
      const allDesigners = await dataSources.ProfileProvider.getAllDesigners();
      allDesigners.reverse();
      const designers = paginateResults({
        after,
        pageSize,
        results: allDesigners,
      });

      return {
        designers,
        cursor: designers.length
          ? designers[designers.length - 1].cursor
          : null,
        hasMore: designers.length
          ? designers[designers.length - 1].cursor !==
            allDesigners[allDesigners.length - 1].cursor
          : false,
      };
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
