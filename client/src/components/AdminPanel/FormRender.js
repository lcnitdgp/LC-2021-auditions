import React, { Component } from "react";
import { connect } from "react-redux";
import FormComponent from "./FormComponent";
import { Col } from "react-bootstrap";

export class FormRender extends Component {
  renderFormElements = () => {
    let renderElements = [];
    for (const item in this.props.adminForm) {
      const element = this.props.adminForm[item];
      renderElements.push(
        <Col>
          <FormComponent key={element._id} value={element} />
        </Col>
      );
    }
    return renderElements;
  };
  render() {
    // console.log(this.props.adminForm);
    return <div className="render-form">{this.renderFormElements()}</div>;
  }
}

const mapStateToProps = ({ adminForm }) => {
  return { adminForm };
};

export default connect(mapStateToProps, null)(FormRender);
