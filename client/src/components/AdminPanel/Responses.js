import React, { Component } from "react";
import axios from "axios";
import { Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import MakeAdminModal from "./MakeAdminModal";

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
  onMakeAdmin(index) {
    let array = [...this.state.list];
    array[index].isadmin = true;
    this.setState({ ...this.state, list: array });
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
              <Card key={index}>
                <Card.Body>
                  {name}
                  <div className="float-right">
                    <MakeAdminModal
                      id={_id}
                      isadmin={isadmin}
                      name={name}
                      index={index}
                      onMakeAdmin={(index)=>this.onMakeAdmin(index)}
                    />
                    <Link
                      to={`/admin/responses/${_id}`}
                      className="btn btn-outline-dark"
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
