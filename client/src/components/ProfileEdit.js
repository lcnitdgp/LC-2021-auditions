import React, { Component } from "react";
import { connect } from "react-redux";
import { Form } from "react-bootstrap";

class ProfileEdit extends Component {
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
              onChange={(e) => this.onChangeValue(element, e.target.value)}
              required
            />
        </Form.Group>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
