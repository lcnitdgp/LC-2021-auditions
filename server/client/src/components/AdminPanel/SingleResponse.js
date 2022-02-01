import React, { Component } from "react";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "../../config/axios";
import { fetchForm } from "../../actions";
import { Form, Col, Row, Container } from "react-bootstrap";
import Loader from "../Loader";
import "./SingleResponse.css";
import $ from "jquery";

class SingleResponse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };
  }
  async componentDidMount() {
    // console.log(this.props.form);
    if (Object.keys(this.props.form).length === 0) {
      console.log("The form has not been pulled");
      await this.props.fetchForm();
    }
    const id = this.props.match.params.id;

    const responses = await axios.get(`/api/individual/${id}`);
    console.log(responses);
    this.setState({ ...responses.data, loading: false });
  }
  renderForm() {
    return Object.keys(this.props.form).map((element, index) => {
      // console.log(element);
      const { type, _id, content, options, fields, image } =
        this.props.form[element];
      // console.log(_id,options);
      // console.log(type, _id, index,this.state.responses[_id]);
      if (type === "text") {
        return (
          <Form.Group controlId={`formGroup-${_id}-${index}`} key={_id}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Form.Control defaultValue={this.state.responses[_id]} />
          </Form.Group>
        );
      } else if (type === "textarea") {
        return (
          <Form.Group controlId={`formGroup-${_id}-${index}`} key={_id}>
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Form.Control
              as="textarea"
              defaultValue={this.state.responses[_id]}
              readOnly
            />
          </Form.Group>
        );
      } else if (type === "radio") {
        return (
          <Form.Group key={_id}>
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
                    checked={index === this.state.responses[_id]}
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
                    checked={this.state.responses[_id][index]}
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
            {image ? <img class="image" src={image} /> : ""}
            <Form.Label>
              {index + 1}) {content}
            </Form.Label>
            <Row>
              <Col xs={8} sm={10}>
                <Form.Label>Range</Form.Label>
                <Form.Control
                  type="range"
                  custom
                  defaultValue={this.state.responses[_id]}
                  disabled
                  min={options[0]}
                  max={options[1]}
                />
              </Col>
              <Col>
                <Form.Control
                  defaultValue={this.state.responses[_id]}
                  style={{ marginTop: "1rem" }}
                />
              </Col>
            </Row>
          </Form.Group>
        );
      } else if (type === "subquestions") {
        // console.log(this.state.responses[_id]);
        return (
          <Form.Group controlId="formBasicRangeCustom" key={_id}>
            {image ? <img class="image" src={image} /> : ""}
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
                            defaultValue={this.state.responses[_id][index]}
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
                            defaultValue={this.state.responses[_id][index]}
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
                              defaultValue={this.state.responses[_id][index]}
                              disabled
                            />
                          </Col>
                          <Col>
                            <Form.Control
                              style={{ marginTop: "1rem" }}
                              defaultValue={this.state.responses[_id][index]}
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
  capitalizeFirstLetter(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
  renderInfo() {
    const { name, phone, branch, email, photo, roll } = this.state;
    const arr = [
      { name },
      { phone },
      { roll },
      { branch },
      { email },
      { photo },
    ];
    console.log(arr);

    return (
      <Form>
        {arr.map((element, index) => {
          const elem = Object.keys(element)[0];
          console.log(element, elem);
          return (
            <Form.Group>
              <Form.Label>
                <p className="form-main-heading">
                  {this.capitalizeFirstLetter(elem)}
                </p>
                <div className="form-main-body">
                  {elem === "photo" ? (
                    <img src={element[elem]} className="response_image" />
                  ) : (
                    <p>
                      {element[elem] || "The user has not filled this field"}
                    </p>
                  )}
                </div>
              </Form.Label>
            </Form.Group>
          );
        })}
      </Form>
    );
  }
  render() {
    console.log("single form called", this.state);

    if (this.state.loading) {
      return <Loader />;
    }

    if (!this.state._id) {
      return <div className="form-group">This user does not exist .</div>;
    }

    return (
      <div className="single-response">
        <Container>
          <div className="main_heading">Personal Information</div>
          {this.renderInfo()}

          <div className="main_heading">Response</div>
          {this.state.error ? (
            <>
              <div className="form-group">{this.state.error}</div>
            </>
          ) : (
            this.renderForm()
          )}
        </Container>
      </div>
    );
  }
}

const mapStateToProps = ({ adminForm }) => {
  return { form: adminForm };
};

const mapDispatchToProps = {
  fetchForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(SingleResponse);
