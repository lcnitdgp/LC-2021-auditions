import React, { Component } from "react";
import { connect } from "react-redux";
import { Button } from "react-bootstrap";
import {createFormElement} from "../../actions";
const defaultLabel = "Please Add A Question Label";

class AddFormElements extends Component {
  onClickHandler(type) {
    this.props.createFormElement(defaultLabel, type);
  }

  render() {
    return (
      <div>
        <Button
          variant="secondary"
          onClick={() => this.onClickHandler("radio")}
        >
          Radio
        </Button>
        <Button
          variant="secondary"
          onClick={() => this.onClickHandler("checkbox")}
        >
          Checkbox
        </Button>
        <Button
          variant="secondary"
          onClick={() => this.onClickHandler("subquestions")}
        >
          Subquestions
        </Button>
        <Button variant="secondary" onClick={() => this.onClickHandler("text")}>
          Text
        </Button>
        <Button
          variant="secondary"
          onClick={() => this.onClickHandler("textarea")}
        >
          Textarea
        </Button>
        <Button
          variant="secondary"
          onClick={() => this.onClickHandler("range")}
        >
          Range
        </Button>
      </div>
    );
  }
}

const mapDispatchToProps = {
  createFormElement,
};

export default connect(null, mapDispatchToProps)(AddFormElements);
