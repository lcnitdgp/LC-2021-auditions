import React, { Component, createRef } from "react";
import { connect } from "react-redux";

import { fetchForm, submitResponse } from "../actions";
import { Form, Col, Row, Button, Modal, Container } from "react-bootstrap";
import "./CollectResponse.css";
import FormFilled from "./FormFilled";
import Loader from "./Loader";
import $ from "jquery";

class CollectResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: {},
      show: false,
      loading: false,
      scroll: 0,
    };
  }
  async componentDidMount() {
    await this.props.fetchForm();
    var response = {};
    console.log(this.props.form);
    for (const element in this.props.form) {
      // console.log(element);
      const { type, _id, fields, options } = this.props.form[element];
      if (type === "checkbox" || type === "subquestions") {
        response[_id] = {};
        if (type === "checkbox") {
          options.forEach((element, index) => {
            response[_id][index] = false;
          });
        } else if (type === "subquestions") {
          fields.forEach((element, index) => {
            if (element.type === "range") {
              response[_id][index] = element.options[0];
            } else {
              response[_id][index] = "";
            }
          });
        }
      } else if (type === "range") {
        response[_id] = options[0];
      } else {
        response[_id] = "";
      }
    }
    console.log(response);
    this.setState({ response });
  }

  onChangeState(value, _id) {
    this.setState({
      ...this.state,
      response: { ...this.state.response, [_id]: value },
    });
  }
  onChangeCheckBoxState(index, _id) {
    // console.log(index, _id);
    this.setState({
      ...this.state,
      response: {
        ...this.state.response,
        [_id]: {
          ...this.state.response[_id],
          [index]: !this.state.response[_id][index],
        },
      },
    });
  }
  onChangeSubQuestion(index, _id, value) {
    console.log(index, _id, value);
    this.setState({
      ...this.state,
      response: {
        ...this.state.response,
        [_id]: {
          ...this.state.response[_id],
          [index]: value,
        },
      },
    });
  }
  handleClick(id) {
    console.log(id);
    this[id].focus();
  }
  renderForm() {
    return Object.keys(this.props.form).map((element, index) => {
      // console.log(element);
      const { type, _id, content, options, fields, image } = this.props.form[
        element
      ];
      // console.log(_id,options);
      // console.log(type, _id, index,this.state.response[_id]);
      if (type === "text") {
        return (
          <Form.Group controlId={`formGroup-${_id}`} key={_id}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Form.Control
              onChange={(e) => this.onChangeState(e.target.value, _id)}
              value={this.state.response[_id] || ""}
              ref={(input) => {
                this[`ref-${_id}`] = input;
              }}
              onClick={() => this.handleClick(`ref-${_id}`)}
            />
          </Form.Group>
        );
      } else if (type === "textarea") {
        return (
          <Form.Group controlId={`formGroup-${_id}`} key={_id}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Form.Control
              as="textarea"
              onChange={(e) => this.onChangeState(e.target.value, _id)}
              value={this.state.response[_id] || ""}
              ref={(input) => {
                this[`ref-${_id}`] = input;
              }}
              onClick={() => this.handleClick(`ref-${_id}`)}
            />
          </Form.Group>
        );
      } else if (type === "radio") {
        return (
          <div className="form_element" key={_id}>
            <Form.Group key={_id} controlId={`formGroup-${_id}`}>
              {image ? <img class="image" src={image} /> : ""}
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
                      onChange={() => this.onChangeState(index, _id)}
                      ref={(input) => {
                        this[`ref-${_id}-${index}`] = input;
                      }}
                      onClick={() => this.handleClick(`ref-${_id}-${index}`)}
                    />
                  );
                })}
              </Col>
            </Form.Group>
          </div>
        );
      } else if (type === "checkbox") {
        return (
          <Form.Group key={_id} controlId={`formGroup-${_id}`}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Col>
              {options.map((element, index) => {
                return (
                  <Form.Check
                    type={type}
                    label={element}
                    name={`checkbox-${_id}`}
                    id={`checkbox-${_id}-${index}`}
                    key={`${_id}-${index}`}
                    onChange={() => this.onChangeCheckBoxState(index, _id)}
                    ref={(input) => {
                      this[`ref-${_id}-${index}`] = input;
                    }}
                    onClick={() => this.handleClick(`ref-${_id}-${index}`)}
                  />
                );
              })}
            </Col>
          </Form.Group>
        );
      } else if (type === "range") {
        return (
          <Form.Group controlId={`formGroup-${_id}`} key={_id}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Row>
              <Col xs={8} sm={10}>
                <Form.Control
                  type="range"
                  custom
                  value={this.state.response[_id]}
                  onChange={(e) => {
                    this.handleClick(`ref-${_id}`);
                    console.log("State changed.");
                    this.onChangeState(e.target.value, _id);
                  }}
                  min={options[0]}
                  max={options[1]}
                  style={{ marginTop: "1rem" }}
                  ref={(input) => {
                    this[`ref-${_id}`] = input;
                  }}
                />
              </Col>
              <Col>
                <Form.Control
                  value={this.state.response[_id]}
                  style={{ marginTop: "0.5rem" }}
                  readOnly
                />
              </Col>
            </Row>
          </Form.Group>
        );
      } else if (type === "subquestions") {
        // console.log(this.state.response[_id]);
        return (
          <Form.Group controlId={`formGroup-${_id}`} key={_id}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <div style={{ marginLeft: "0.1rem" }}>
              {fields.map(({ content, type, options }, index) => {
                // console.log(content, type, options);

                if (type === "text") {
                  return (
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            {index + 1}) {content}
                          </Form.Label>
                          <Form.Control
                            onChange={(e) =>
                              this.onChangeSubQuestion(
                                index,
                                _id,
                                e.target.value
                              )
                            }
                            key={`${_id}-${index}`}
                            value={this.state.response[_id][index]}
                            ref={(input) => {
                              this[`ref-${_id}-${index}`] = input;
                            }}
                            onClick={() =>
                              this.handleClick(`ref-${_id}-${index}`)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  );
                } else if (type === "textarea") {
                  return (
                    <Row>
                      <Col>
                        <Form.Group>
                          <Form.Label>
                            {index + 1}) {content}
                          </Form.Label>
                          <Form.Control
                            as={type}
                            onChange={(e) =>
                              this.onChangeSubQuestion(
                                index,
                                _id,
                                e.target.value
                              )
                            }
                            key={`${_id}-${index}`}
                            value={this.state.response[_id][index]}
                            ref={(input) => {
                              this[`ref-${_id}-${index}`] = input;
                            }}
                            onClick={() =>
                              this.handleClick(`ref-${_id}-${index}`)
                            }
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  );
                } else {
                  return (
                    <Row>
                      <Col>
                        <Form.Group
                          as={Row}
                          controlId="formBasicRangeCustom"
                          key={`${_id}-${index}`}
                        >
                          <Col xs={8} sm={10}>
                            <Form.Label>
                              {index + 1}) {content}
                            </Form.Label>
                            <Form.Control
                              type="range"
                              custom
                              min={options[0]}
                              max={options[1]}
                              onChange={(e) => {
                                this.handleClick(`ref-${_id}-${index}`);
                                this.onChangeSubQuestion(
                                  index,
                                  _id,
                                  e.target.value
                                );
                              }}
                              value={this.state.response[_id][index]}
                              ref={(input) => {
                                this[`ref-${_id}-${index}`] = input;
                              }}
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              style={{ marginTop: "1rem" }}
                              value={this.state.response[_id][index]}
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
  onClickModal() {
    this.setState({ ...this.state, show: !this.state.show });
  }

  async onSubmit() {
    this.setState({ ...this.state, loading: true });
    await this.props.submitResponse(this.state.response);
    window.location.reload();
  }
  renderSubmitButton = () => {
    return (
      <>
        <div
          className="wrap button-edit"
          onClick={() => this.onClickModal()}
          style={{ marginBottom: "2rem" }}
        >
          <a className="btn">
            <span className="google_text">SUBMIT</span>
          </a>
        </div>
        <Modal
          show={this.state.show}
          onHide={() => this.onClickModal()}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Confirm Submission</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="horizontally_center_items">
              <p>Are you sure you want to submit the form ?</p>
              <p>P.S - Once Submitted , your response cannot be edited .</p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              variant="outline-dark"
              block
              onClick={() => this.onSubmit()}
              disabled={this.state.loading}
            >
              {this.state.loading ? `Loading,,,` : `SUBMIT`}
            </Button>
          </Modal.Footer>
        </Modal>
      </>
    );
  };
  submittedForm() {
    return (
      <div className="form-group submitted">You Have Submitted The Form :)</div>
    );
  }

  render() {
    // console.log(this.state, this.props.user, "Form Opened.");
    if (!Object.keys(this.state.response).length) {
      return <Loader />;
    }
    // console.log(this.props.user.filledForm);
    if (this.props.user.filledForm) {
      return <div className="collect-response">{this.submittedForm()}</div>;
    }
    // return <FormFilled />;

    console.log(this);
    return (
      <Container style={{ maxWidth: "700px" }}>
        <Form onSubmit>
          <div class="collect-response">
            {this.renderForm()}
            {this.renderSubmitButton()}
          </div>
        </Form>
      </Container>
    );
  }
}

const mapStateToProps = ({ adminForm, auth }) => {
  return { form: adminForm, user: auth };
};

const mapDispatchToProps = {
  fetchForm,
  submitResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectResponse);
