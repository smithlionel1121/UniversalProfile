import React, { useState } from "react";
import { useQuery } from "@apollo/client";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";
import Spinner from "react-bootstrap/Spinner";
import ProfileFilter from "./ProfileList/ProfileFilter";
import { Link } from "react-router-dom";

const Profiler = ({ QUERY, filterAnon, setFilterAnon }) => {
  const [username, setUsername] = useState("");
  const { loading, error, data, previousData } = useQuery(QUERY, {
    variables: { username },
  });

  let profiles = data?.profiles;

  if (loading) {
    if (previousData) {
      profiles = previousData?.profiles;
    } else {
      return (
        <div className="text-center pt-5">
          <Spinner
            animation="border"
            variant="secondary"
            style={{ width: "12rem", height: "12rem" }}
          />
        </div>
      );
    }
  }
  if (error) return <p>Error ⁉️</p>;

  const handleChange = val => setFilterAnon(val);

  let opacity = loading ? "100%" : "0%";

  return (
    <div>
      <Row>
        <Col>
          <div className="float-start pb-2">
            <Row>
              <Link to="/address">My Profile</Link>
            </Row>
          </div>
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

      <Row className="my-4">
        <InputGroup>
          <FormControl
            type="text"
            placeholder="Enter Username"
            value={username}
            onChange={e => setUsername(e.target.value)}
            aria-describedby="spinner-addon"
          />
          <InputGroup.Append>
            <InputGroup.Text id="spinner-addon">
              <Spinner
                animation="border"
                variant="secondary"
                style={{ opacity }}
              />
            </InputGroup.Text>
          </InputGroup.Append>
        </InputGroup>
      </Row>

      <Container className="d-flex flex-wrap justify-content-evenly">
        {profiles?.map(profile => (
          <ProfileFilter
            className="profile-container"
            key={profile.id}
            address={profile.address}
            filterAnon={filterAnon}
          />
        ))}
      </Container>
    </div>
  );
};

export default Profiler;
