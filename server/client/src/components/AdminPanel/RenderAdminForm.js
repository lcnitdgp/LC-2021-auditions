import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { createFormElement, fetchForm } from "../../actions";
import { connect } from "react-redux";
import FormRender from "./FormRender";
import AddFormElements from "./AddFormElements";

import "./RenderAdminForm.css";

class RenderAdminForm extends Component {
  componentDidMount() {
    this.props.fetchForm();
  }
  render() {
    console.log("Render admin form.");
    return (
      
      <Container style={{maxWidth:'700px'}}>
        <div class="render-admin-form">
            <AddFormElements />
            <FormRender />
        </div>
      </Container>
    );
  }
}

const mapDispatchToProps = {
  createFormElement,
  fetchForm,
};
export default connect(null, mapDispatchToProps)(RenderAdminForm);
