import React, { Component, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import EditableComponent from "./EditableComponent";
import RenderComponent from "./RenderComponent";
import "./FormComponent.css";

function FormComponent({value}) {
  const [key, setKey] = useState("home");
  return (
    <div className="form-component">
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="home" title="Component" className="form-group">
          <RenderComponent value={value} />
        </Tab>
        <Tab eventKey="edit" title="Edit" className="form-group">
          <EditableComponent value={value} />
        </Tab>
      </Tabs>
    </div>
  );
}

export default FormComponent;
