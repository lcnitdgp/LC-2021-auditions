import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";
import { fetchForm } from "../../actions";
import { Form, Col, Row } from "react-bootstrap";
class SingleResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
    };
  }
  async componentDidMount() {
    // console.log(this.props.form);
    if (Object.keys(this.props.form).length === 0) {
      console.log("The form has not been pulled");
      await this.props.fetchForm();
    }
    const id = this.props.match.params.id;
    const response = await axios.get(`/api/individual/${id}`);
    console.log(response);
    this.setState({ response: response.data });
  }
  renderForm() {
    return Object.keys(this.props.form).map((element, index) => {
      // console.log(element);
      const { type, _id, content, options, fields } = this.props.form[element];
      // console.log(_id,options);
      // console.log(type, _id, index,this.state.response[_id]);
      if (type === "text") {
        return (
          <Form.Group controlId={`formGroup-${_id}-${index}`} key={_id}>
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Form.Control defaultValue={this.state.response[_id]} readOnly />
          </Form.Group>
        );
      } else if (type === "textarea") {
        return (
          <Form.Group controlId={`formGroup-${_id}-${index}`} key={_id}>
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={this.state.response[_id]}
              readOnly
            />
          </Form.Group>
        );
      } else if (type === "radio") {
        return (
          <Form.Group key={_id}>
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Col>
              {options.map((element, index) => {
                return (
                  <Form.Check
                    type={type}
                    label={element}
                    name={`radios-${_id}`}
                    id={`radios-${_id}-${index}`}
                    key={`${_id}-${index}`}
                    checked={index === this.state.response[_id]}
                    readOnly
                  />
                );
              })}
            </Col>
          </Form.Group>
        );
      } else if (type === "checkbox") {
        return (
          <Form.Group key={_id}>
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Col>
              {options.map((element, index) => {
                return (
                  <Form.Check
                    type={type}
                    label={element}
                    name={`radios-${_id}`}
                    id={`radios-${_id}-${index}`}
                    key={`${_id}-${index}`}
                    checked={this.state.response[_id][index]}
                    readOnly
                  />
                );
              })}
            </Col>
          </Form.Group>
        );
      } else if (type === "range") {
        return (
          <Form.Group controlId="formBasicRangeCustom" key={_id}>
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Row>
              <Col xs={8} sm={10}>
                <Form.Label>Range</Form.Label>
                <Form.Control
                  type="range"
                  custom
                  defaultValue={this.state.response[_id]}
                  disabled
                  min={options[0]}
                  max={options[1]}
                />
              </Col>
              <Col>
                <Form.Control
                  defaultValue={this.state.response[_id]}
                  style={{ marginTop: "1rem" }}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
        );
      } else if (type === "subquestions") {
        // console.log(this.state.response[_id]);
        return (
          <Form.Group controlId="formBasicRangeCustom" key={_id}>
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <div style={{ marginLeft: "1rem" }}>
              {fields.map(({ content, type, options }, index) => {
                // console.log(content, type, options);

                if (type === "text") {
                  return (
                    <Row key={`${_id}-${index}`}>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            {index + 1}){content}
                          </Form.Label>
                          <Form.Control
                            defaultValue={this.state.response[_id][index]}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  );
                } else if (type === "textarea") {
                  return (
                    <Row key={`${_id}-${index}`}>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            {index + 1}){content}
                          </Form.Label>
                          <Form.Control
                            as={type}
                            defaultValue={this.state.response[_id][index]}
                            readOnly
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row key={`${_id}-${index}`}>
                      <Col>
                        <Form.Group as={Row} controlId="formBasicRangeCustom">
                          <Col xs={8} sm={10}>
                            <Form.Label>
                              {index + 1}){content}
                            </Form.Label>
                            <Form.Control
                              type="range"
                              custom
                              min={options[0]}
                              max={options[1]}
                              defaultValue={this.state.response[_id][index]}
                              disabled
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              style={{ marginTop: "1rem" }}
                              defaultValue={this.state.response[_id][index]}
                              readOnly
                            />
                          </Col>
                        </Form.Group>
                      </Col>
                    </Row>
                  );
                }
              })}
            </div>
          </Form.Group>
        );
      }
    });
  }

  render() {
    console.log("single form called",this.state);
    if (this.state.response.error) {
      return <div>{this.state.response.error}</div>;
    }
    if (Object.keys(this.state.response).length === 0) {
      return <div>Loading</div>;
    }
    return <div>{this.renderForm()}</div>;
  }
}

const mapStateToProps = ({ adminForm }) => {
  return { form: adminForm };
};

const mapDispatchToProps = {
  fetchForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleResponse);
