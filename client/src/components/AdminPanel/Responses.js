import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
export default class Responses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list: null,
      error: null,
    };
  }
  async componentDidMount() {
    try {
      const response = await axios.get("/api/participants");
      //   console.log(response.data);
      this.setState({ ...this.state, list: response.data.uList });
    } catch (err) {
      console.log(err);
    }
  }
  render() {
    console.log(this.state.list);
    return (
      <div>
        {this.state.list &&
          this.state.list.map((element, index) => {
            console.log(element);
            const { _id, name, isadmin } = element;
            return (
              <Card>
                <Card.Body>
                  {name}
                  <div className="float-right">
                    <Button
                      disabled={isadmin}
                      variant="outline-primary"
                      style={{ marginRight: "4px" }}
                    >
                      Make Admin
                    </Button>
                    <Link
                      to={`/admin/responses/${_id}`}
                      className="btn btn-outline-primary"
                      role="button"
                    >
                      View Response
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            );
          })}
      </div>
    );
  }
}
