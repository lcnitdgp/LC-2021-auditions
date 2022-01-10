import React, { Component } from "react";
import { Form, Row, Col } from "react-bootstrap";
import RangeSlider from "react-bootstrap-range-slider";
import "./RenderComponent.css";

export default class RenderComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      range: null,
      ranges: {},
    };
  }
  renderComponent() {
    const { type, content, options, _id, fields } = this.props.value;
    // console.log(this.props.value, type);
    if (type === "textarea") {
      return (
        <Form.Group>
          <Form.Control as={type} />
        </Form.Group>
      );
    } else if (type === "text") {
      return (
        <Form.Group>
          <Form.Control />
        </Form.Group>
      );
    } else if (type === "radio" || type === "checkbox") {
      return (
        <Form.Group>
          <Col>
            {options.map((element, index) => {
              return (
                <Form.Check
                  type={type}
                  label={element}
                  name={
                    type === "radio" ? `form-${_id}` : `form-${_id}-${index}`
                  }
                />
              );
            })}
          </Col>
        </Form.Group>
      );
    } else if (type === "range") {
      return (
        <Form.Group as={Row} controlId="formBasicRangeCustom">
          <Col xs={8} sm={10}>
            <Form.Label>Range</Form.Label>
            <Form.Control
              type="range"
              custom
              value={this.state.range || options[0]}
              onChange={(e) => this.setState({ range: e.target.value })}
              min={options[0]}
              max={options[1]}
            />
          </Col>
          <Col>
            <Form.Control
              value={this.state.range || options[0]}
              style={{ marginTop: "1rem" }}
            />
          </Col>
        </Form.Group>
      );
    } else {
      return (
        <>
          {fields.map(({ content, type, options }, index) => {
            if (type === "text") {
              return (
                <Row>
                  <Col xs={1}>Q{index + 1})</Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>{content}</Form.Label>
                      <Form.Control />
                    </Form.Group>
                  </Col>
                </Row>
              );
            } else if (type === "textarea") {
              return (
                <Row>
                  <Col xs={1}>Q{index + 1})</Col>
                  <Col>
                    <Form.Group>
                      <Form.Label>{content}</Form.Label>
                      <Form.Control as={type} />
                    </Form.Group>
                  </Col>
                </Row>
              );
            } else {
              return (
                <Row>
                  <Col xs={1}>Q{index + 1})</Col>
                  <Col>
                    <Form.Group as={Row} controlId="formBasicRangeCustom">
                      <Col xs={8} sm={10}>
                        <Form.Label>Range</Form.Label>
                        <Form.Control
                          type="range"
                          custom
                          value={this.state.ranges[index] || options[0]}
                          onChange={(e) =>
                            this.setState({
                              ...this.state,
                              ranges: {
                                ...this.state.ranges,
                                [index]: e.target.value,
                              },
                            })
                          }
                          min={options[0]}
                          max={options[1]}
                        />
                      </Col>
                      <Col>
                        <Form.Control
                          value={this.state.ranges[index] || options[0]}
                          style={{ marginTop: "1rem" }}
                        />
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              );
            }
          })}
        </>
      );
    }
  }
  render() {
    const { image, content } = this.props.value;
    // console.log(this.state);
    return (
      <div className="render_component">
        {image ? <img class="image" src={image} /> : ""}
        <Form.Label>{content}</Form.Label>
        {this.renderComponent()}
      </div>
    );
  }
}
