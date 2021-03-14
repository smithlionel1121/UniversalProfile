import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "apollo-boost";
import ERC725Account from "./ERC725Account";

import Container from "react-bootstrap/Container";

const GET_DESIGNERS = gql`
  {
    designersList: getDesigners(pageSize: 100) {
      designers {
        id
        username
        address
        timestamp
      }
    }
  }
`;

export const Profiles = () => {
  const { loading, error, data } = useQuery(GET_DESIGNERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ⁉️</p>;

  return (
    <div>
      <Container className="d-flex flex-wrap justify-content-between">
        {data?.designersList?.designers?.map(designer => (
          <ERC725Account key={designer.id} designer={designer} />
        ))}
      </Container>
    </div>
  );
};

export default Profiles;
