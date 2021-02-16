import React, { Component } from "react";
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import MakeAdminModal from "./MakeAdminModal";
import Loader from "../Loader";
import "./Responses.css";

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
      const header = {
        headers: {
          "x-auth-token": localStorage.getItem("token"),
        },
      };

      const response = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/api/participants`,
        header
      );
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
    if (!this.state.list) {
      return <Loader />;
    }
    return (
      <Container style={{ maxWidth: "660px", justifyContent: "flex-start" }}>
        <div className="Responses">
          <p className="responses_title">Responses</p>
          <p className="responses_body">
            Total Number Of Responses : {this.state.list ? this.state.list.length : 0}
          </p>
        </div>
        {this.state.list &&
          this.state.list.map((element, index) => {
            console.log(element);
            const { _id, name, isadmin } = element;
            return (
              <div className="element_card form-group" key={index}>
                <div className="element_card_body">
                  {`${index + 1}) ${name}`}
                  <div className="element_card_buttons float-right">
                    <MakeAdminModal
                      id={_id}
                      isadmin={isadmin}
                      name={name}
                      index={index}
                      onMakeAdmin={(index) => this.onMakeAdmin(index)}
                    />
                    <Link
                      to={`/admin/responses/${_id}`}
                      className="btn btn-outline-dark"
                      role="button"
                    >
                      View Response
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
      </Container>
    );
  }
}
