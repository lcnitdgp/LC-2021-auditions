import React, { Component } from "react";
import { connect } from "react-redux";
import FormComponent from "./FormComponent";

export class FormRender extends Component {
  renderFormElements = () => {
    let renderElements = [];
    for (const item in this.props.adminForm) {
      const element = this.props.adminForm[item];;
      renderElements.push(<FormComponent key={element._id} value={element} />);
    }
    return renderElements;
  };
  render() {
    // console.log(this.props.adminForm);
    return (<div>{this.renderFormElements()}</div>);
  }
}

const mapStateToProps = ({ adminForm }) => {
  return { adminForm };
};

export default connect(mapStateToProps, null)(FormRender);
