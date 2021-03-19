import React from "react";
import Profiler from "../Profiler";
import { gql } from "apollo-boost";

const GET_PROFILES = gql`
  {
    profilesList: getProfiles(pageSize: 50) {
      profiles {
        id
        username
        address
        timestamp
      }
    }
  }
`;

export default function Profiles(props) {
  return <Profiler QUERY={GET_PROFILES} {...props} />;
}
