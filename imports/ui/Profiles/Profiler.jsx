import React from "react";
import { useQuery } from "@apollo/client";
// import "./ProfileList/ind.css";

import ERC725Account from "./ERC725Account";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";

const Profiler = ({ QUERY, filterAnon, setFilterAnon }) => {
  const { loading, error, data } = useQuery(QUERY);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error ⁉️</p>;

  const handleChange = val => setFilterAnon(val);

  return (
    <div>
      <Row>
        <Col>
          <div className="float-end">
            <Row>
              <span>Anonymous Profile Filter:</span>
            </Row>
            <Row>
              <ToggleButtonGroup
                type="radio"
                name="options"
                defaultValue={filterAnon}
                onChange={handleChange}
                size="sm"
              >
                <ToggleButton variant="outline-primary" value={true}>
                  {" "}
                  On
                </ToggleButton>
                <ToggleButton variant="outline-primary" value={false}>
                  {" "}
                  Off
                </ToggleButton>
              </ToggleButtonGroup>
            </Row>
          </div>
        </Col>
      </Row>

      <Container className="d-flex flex-wrap justify-content-evenly">
        {data?.profilesList?.profiles?.map(profile => (
          <ERC725Account
            className="profile-container"
            key={profile.id}
            profile={profile}
            filterAnon={filterAnon}
          />
        ))}
      </Container>
    </div>
  );
};

export default Profiler;
