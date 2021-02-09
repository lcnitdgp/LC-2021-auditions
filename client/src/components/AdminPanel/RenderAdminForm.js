import React, { Component } from "react";
import { Button } from "react-bootstrap";
import { createFormElement,fetchForm } from "../../actions";
import { connect } from "react-redux";
import FormRender from "./FormRender";
import AddFormElements from "./AddFormElements";


class RenderAdminForm extends Component {
  componentDidMount() {
    this.props.fetchForm();
  }
  render() {
    //   console.log("Render admin form.")
    return (
      <div>
        <AddFormElements />
        <FormRender />
      </div>
    );
  }
}

const mapDispatchToProps = {
  createFormElement,
  fetchForm,
};
export default connect(null, mapDispatchToProps)(RenderAdminForm);
