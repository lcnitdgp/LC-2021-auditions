import React, { Component, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import EditableComponent from "./EditableComponent";
import RenderComponent from "./RenderComponent";

function FormComponent({value}) {
  const [key, setKey] = useState("home");
  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
    >
      <Tab eventKey="home" title="Component">
        <RenderComponent value={value}/>
      </Tab>
      <Tab eventKey="edit" title="Edit">
        <EditableComponent value={value}/>
      </Tab>
    </Tabs>
  );
}

export default FormComponent;
