import React from "react";

import { gql } from "apollo-boost";
import Profiler from "../Profiler";

const GET_DESIGNERS = gql`
  {
    profilesList: getDesigners(pageSize: 250) {
      profiles: designers {
        id
        username
        address
        timestamp
      }
    }
  }
`;

export default function Designers(props) {
  return <Profiler QUERY={GET_DESIGNERS} {...props} />;
}
