import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
// import ProfileFormElement from "./ProfileFormElement";

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }
  async componentDidMount() {
    try {
      const response = await axios.get("/api/profile");
      console.log(response.data);
      this.setState(response.data);
    } catch (err) {
      console.log(err);
    }
  }
  async submitResponse() {
    await axios.put("/api/profile", this.state.profile);
  }
  onChangeValue(element, value) {
    this.setState({ ...this.state, [element]: value });
  }
  handleSubmit = (event) => {
    event.preventDefault();
    axios.put('/api/profile',this.state);
  };
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  render() {
    const arr = Object.keys(this.state);
    if (!arr.length) {
      return <div>Loading...</div>;
    }
    console.log(arr, this.state);
    return (
      <div>
        <Form onSubmit={this.handleSubmit}>
          {arr.map((element, index) => {
            console.log(element, this.state[element]);
            return (
              <Form.Group controlId={element}>
                <Form.Label>
                  {element === "roll"
                    ? "Roll Number (Preferably Whatsapp)"
                    : this.capitalizeFirstLetter(element)}
                </Form.Label>
                <Form.Control
                  value={this.state[element]}
                  onChange={(e) => this.onChangeValue(element, e.target.value)}
                  required
                />
              </Form.Group>
            );
          })}
          <Button type="submit" variant="outline-dark" className="float-right">
            Next
          </Button>
        </Form>
      </div>
    );
  }
}

export default Profile;
