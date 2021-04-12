import { gql } from "apollo-boost";
import React from "react";

import Profiler from "../Profiler";

const GET_PROFILES = gql`
  query GetProfiles($username: String) {
    profiles(username: $username, pageSize: 50) {
      id
      username
      address
    }
  }
`;

export default function Profiles(props) {
  return <Profiler QUERY={GET_PROFILES} {...props} />;
}
