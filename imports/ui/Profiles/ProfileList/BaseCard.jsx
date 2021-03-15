import React from "react";

import Card from "react-bootstrap/Card";

export default function BaseCard(props) {
  return (
    <Card style={{ width: "9rem" }} className="m-4 ">
      {props.children}
    </Card>
  );
}
