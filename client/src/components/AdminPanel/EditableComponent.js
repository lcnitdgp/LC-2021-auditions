import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Form, Row, Col } from "react-bootstrap";

import { editFormElement, deleteFormElement } from "../../actions";
import "./EditableComponent.css";

const defaultRadioContent = "Add Your Option Name Here";
const defaultLabel = "Add Question Label";
class EditableComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: this.props.value,
      imageLabel: "Click Here To Add An Image.",
      selectValue: "range",
    };
  }
  onClickAddOption() {
    // console.log("Added option");
    this.setState((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        options: [...prevState.value.options, defaultRadioContent],
      },
    }));
  }
  onClickDeleteOption(index) {
    const optionArray = [...this.state.value.options];
    optionArray.splice(index, 1);
    this.setState((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        options: optionArray,
      },
    }));
  }
  onChangeOptionName(value, index) {
    const optionArray = [...this.state.value.options];
    optionArray[index] = value;
    let text = this.setState((prevState) => ({
      ...prevState,
      value: {
        ...prevState.value,
        options: optionArray,
      },
    }));
  }
  addToFields() {
    var OptionsArray = [];
    if (this.state.selectValue === "range") {
      OptionsArray = [0, 0];
    }
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        fields: [
          ...this.state.value.fields,
          {
            content: defaultLabel,
            type: this.state.selectValue,
            options: OptionsArray,
          },
        ],
      },
    });
  }
  onFieldContentChange(value, index) {
    const newFields = [...this.state.value.fields];
    newFields[index].content = value;
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        fields: newFields,
      },
    });
  }
  onFieldOptionsChange(value, index, optionIndex) {
    const newFields = [...this.state.value.fields];
    newFields[index].options[optionIndex] = value;
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        fields: newFields,
      },
    });
  }
  onFieldRemoveClick(index) {
    const newFields = [...this.state.value.fields];
    newFields.splice(index, 1);
    this.setState({
      ...this.state,
      value: {
        ...this.state.value,
        fields: newFields,
      },
    });
  }
  renderSubQuestionField(element, index) {
    const { type } = element;
    //   type , label , options , delete
    return (
      <div className="subquestion_field">
        <Form.Group as={Row} controlId="formPlaintype">
          <Form.Label column sm="2">
            Type
          </Form.Label>
          <Col>
            <Form.Control value={type} readOnly />
          </Col>
        </Form.Group>
        <Form.Group as={Row} controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Content
          </Form.Label>
          <Col>
            <Form.Control
              value={element.content}
              onChange={(e) => this.onFieldContentChange(e.target.value, index)}
            />
          </Col>
        </Form.Group>
        {type === "range" ? (
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label column sm="2">
                Minimum
              </Form.Label>
              <Col>
                <Form.Control
                  value={element.options[0]}
                  type="Number"
                  onChange={(e) =>
                    this.onFieldOptionsChange(e.target.value, index, 0)
                  }
                />
              </Col>
            </Form.Group>
            <Form.Group as={Col} controlId="formPlaintextPassword">
              <Form.Label column sm="2">
                Maximum
              </Form.Label>
              <Col>
                <Form.Control
                  value={element.options[1]}
                  type="Number"
                  onChange={(e) =>
                    this.onFieldOptionsChange(e.target.value, index, 1)
                  }
                />
              </Col>
            </Form.Group>
          </Form.Row>
        ) : (
          ""
        )}
        <Form.Group as={Row} controlId="formPlaintype">
          <Button
            block
            variant="outline-danger"
            onClick={() => this.onFieldRemoveClick(index)}
          >
            Delete
          </Button>
        </Form.Group>
      </div>
    );
  }
  editComponent() {
    const { type } = this.state.value;
    // console.log(type);
    if (type === "text" || type == "textarea") {
      return;
    } else if (type === "radio" || type === "checkbox") {
      //   console.log("This is a radio");
      return (
        <>
          <Form.Group as={Row}>
            <Form.Label as="legend" column sm={2}>
              Options
            </Form.Label>
            <Col sm={10}>
              {this.state.value.options.map((element, index) => {
                return (
                  <Form.Row>
                    <Form.Group as={Col} xs={7} sm={8} md={9} lg={10}>
                      <Form.Control
                        value={element}
                        onChange={(e) => {
                          this.onChangeOptionName(e.target.value, index);
                        }}
                      />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <Button
                        variant="outline-dark"
                        onClick={() => this.onClickDeleteOption(index)}
                      >
                        Delete
                      </Button>
                    </Form.Group>
                  </Form.Row>
                );
              })}
              <Form.Row>
                <Form.Group as={Col}>
                  <Button
                    variant="outline-dark"
                    onClick={() => this.onClickAddOption()}
                    block
                  >
                    Add Option
                  </Button>
                </Form.Group>
              </Form.Row>
            </Col>
          </Form.Group>
        </>
      );
    } else if (type === "range") {
      const { options } = this.state.value;

      return (
        <Form.Group as={Row}>
          <Form.Label as="legend" column sm={2}>
            Options
          </Form.Label>
          <Row sm={10}>
            <Form.Group as={Col}>
              <Form.Label as="legend" column >
                Minimum Value
              </Form.Label>
              <Form.Control
                value={options[0]}
                type="Number"
                onChange={(e) => this.onChangeOptionName(e.target.value, 0)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label column as="legend">Maximum Value</Form.Label>
              <Form.Control
                value={options[1]}
                type="Number"
                onChange={(e) => {
                  this.onChangeOptionName(e.target.value, 1);
                }}
              />
            </Form.Group>
          </Row>
        </Form.Group>
      );
    } else {
      // type of subquestion :
      // range , text , textarea
      // [{type,label,options}]
      return (
        <>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Sub-Questions
            </Form.Label>
            <Col>
              {this.state.value.fields.map((element, index) => {
                return this.renderSubQuestionField(element, index);
              })}
            </Col>
          </Form.Group>
          <Form.Group as={Row}>
            <Form.Label column sm="2">
              Add Sub-Question
            </Form.Label>
            <Col>
              <Form.Row>
                <Form.Group as={Col}>
                  <Form.Control
                    as="select"
                    value={this.state.selectValue}
                    onChange={(e) =>
                      this.setState({
                        ...this.state,
                        selectValue: e.target.value,
                      })
                    }
                  >
                    <option>range</option>
                    <option>text</option>
                    <option>textarea</option>
                  </Form.Control>
                </Form.Group>
                <Form.Group as={Col}>
                  <Button
                    variant="outline-dark"
                    onClick={() => this.addToFields()}
                  >
                    Add
                  </Button>
                </Form.Group>
              </Form.Row>
            </Col>
          </Form.Group>
        </>
      );
    }
  }
  onClickDelete() {
    this.props.deleteFormElement(this.state.value._id);
  }
  onClickSave() {
    console.log(this.state.value);
    this.props.editFormElement(this.state.value);
  }
  onFileUpload(e) {
    // console.log(e);
    let reader = new FileReader();
    let file = e.target.files[0];
    let name = e.target.files[0].name;
    reader.onloadend = () => {
      this.setState({
        ...this.state,
        value: {
          ...this.state.value,
          image: reader.result,
        },
      });
    };
    reader.readAsDataURL(file);
  }
  render() {
    const { content, _id } = this.state.value;
    // console.log(this.state);
    return (
      <div className="EditableComponent">
        <Form>
          <Form.Group as={Row} controlId={`formGroup-${_id}`}>
            <Form.Label column sm="2">
              Label
            </Form.Label>
            <Col>
              <Form.Control
                value={content}
                onChange={(e) => {
                  this.setState({
                    ...this.state,
                    value: { ...this.state.value, content: e.target.value },
                  });
                }}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} controlId={`formGroup-${_id}`}>
            <Form.Label column sm="2">
              Image
            </Form.Label>
            <Col>
              {this.state.value.image ? (
                <div className="text-center">
                  <img src={this.state.value.image} className="image" />
                </div>
              ) : (
                ""
              )}

              <Form.File
                id={`custom-file-${_id}`}
                label={this.state.imageLabel}
                custom
                accept="image/x-png,image/jpg,image/jpeg"
                onChange={(e) => this.onFileUpload(e)}
              />
            </Col>
          </Form.Group>

          {this.editComponent()}
          <Form.Group as={Row}>
            <Col sm={{ span: 10, offset: 2 }}>
              <Button
                block
                onClick={() => this.onClickDelete()}
                variant="danger"
              >
                Delete
              </Button>
              <Button
                block
                onClick={() => this.onClickSave()}
                variant="success"
              >
                Save
              </Button>
            </Col>
          </Form.Group>
        </Form>
      </div>
    );
  }
}

const mapDispatchToProps = {
  editFormElement,
  deleteFormElement,
};

export default connect(null, mapDispatchToProps)(EditableComponent);
