import React, { Component } from "react";
import { connect } from "react-redux";
import { Button,Row,Col } from "react-bootstrap";
import { createFormElement } from "../../actions";
import "./AddFormElements.css";

const defaultLabel = "Please Add A Question Label";

const buttonElements = [
  "radio",
  "checkbox",
  "subquestions",
  "text",
  "textarea",
  "range",
];

class AddFormElements extends Component {
  onClickHandler(type) {
    this.props.createFormElement(defaultLabel, type);
  }

  render() {
    return (
      <div class="add-form-elements">
        <Row>
          {buttonElements.map((element, index) => {
            return (
              <Col sm={6} md={6}>
                <Button
                  variant="light"
                  onClick={() => this.onClickHandler(`${element}`)}
                  block
                >
                  {element}
                </Button>
              </Col>
            );
          })}
        </Row>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createFormElement,
};

export default connect(null, mapDispatchToProps)(AddFormElements);
