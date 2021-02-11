import React, { Component } from 'react'
import {Form} from "react-bootstrap";

export default class ProfileFormElement extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  render() {
    const { element, value } = this.props;
    return (
      <div>
        <Form.Group controlId={element}>
          <Form.Label>
            {element === "roll"
              ? "Roll Number (Preferably Whatsapp)"
              : this.capitalizeFirstLetter(element)}
          </Form.Label>
          <Form.Control
            value={value}
            onChange={(e) => this.props.onChangeValue(element, e.target.value)}
            required
          />
        </Form.Group>
      </div>
    );
  }
}
