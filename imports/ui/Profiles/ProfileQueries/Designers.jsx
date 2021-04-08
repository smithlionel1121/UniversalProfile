import React from "react";

import { gql } from "apollo-boost";
import Profiler from "../Profiler";

const GET_DESIGNERS = gql`
  query GetProfiles($username: String) {
    profiles: designers(username: $username, pageSize: 50) {
      id
      username
      address
    }
  }
`;

export default function Designers(props) {
  return <Profiler QUERY={GET_DESIGNERS} {...props} />;
}
