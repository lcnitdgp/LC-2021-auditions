import React, { Component } from "react";
import axios from "../../config/axios";
import { Col, Container, Row, Tab, Tabs } from "react-bootstrap";
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
      const response = await axios.get("/api/participants");
      // console.log(response.data);

      let participantsState = {};
      response.data.uList.forEach(
        (element) => (participantsState[element._id] = element)
      );

      this.setState({
        ...this.state,
        list: participantsState,
      });
    } catch (err) {
      console.log(err);
    }
  }
  onMakeAdmin(index) {
    this.setState({
      ...this.state,
      list: {
        ...this.state.list,
        [index]: {
          ...this.state.list[index],
          isadmin: true,
        },
      },
    });
  }

  renderParticipants(outputObject) {
    return (
      <>
        <p className="responses-tab-body">
          Number Of Responses : {Object.keys(outputObject).length}
        </p>
        {Object.entries(outputObject).map(([id, element], index) => {
          console.log(element);
          const { name, isadmin, email } = element;
          return (
            <div className="element_card form-group" key={id}>
              <div className="element_card_body">
                <Row>
                  <Col xs={12} sm={8}>
                    <div>
                      <div>
                        <b>Name</b> : {name}
                      </div>
                      <div>
                        <b>Email</b>: {email}
                      </div>
                    </div>
                  </Col>
                  <Col xs={12} sm={4}>
                    <div className="element_card_buttons">
                      <MakeAdminModal
                        id={id}
                        isadmin={isadmin}
                        name={name}
                        onMakeAdmin={(id) => this.onMakeAdmin(id)}
                      />
                      <Link
                        to={`/admin/responses/${id}`}
                        className="btn btn-block btn-outline-dark"
                        role="button"
                      >
                        View Response
                      </Link>
                    </div>
                  </Col>
                </Row>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  renderResponses() {
    let participantsSubmitted = {};
    let participantsNotSubmitted = {};
    let admins = {};

    for (const key in this.state.list) {
      if (this.state.list[key].isadmin) admins[key] = this.state.list[key];
      else if (this.state.list[key].responses)
        participantsSubmitted[key] = this.state.list[key];
      else participantsNotSubmitted[key] = this.state.list[key];
    }

    console.log("Admins", admins);
    console.log("ParticipantsSubmitted", participantsSubmitted);
    console.log("participantsNotSubmitted", participantsNotSubmitted);

    return (
      <div className="responses-form-component">
        <Tabs transition={false} id="admin-tab" className="mb-3">
          <Tab eventKey="Submitted" title="Submitted" defaultActiveKey>
            {this.renderParticipants(participantsSubmitted)}
          </Tab>
          <Tab eventKey="Not Submitted" title="Not Submitted">
            {this.renderParticipants(participantsNotSubmitted)}
          </Tab>
          <Tab eventKey="Admins" title="Admins">
            {this.renderParticipants(admins)}
          </Tab>
        </Tabs>
      </div>
    );
  }

  render() {
    console.log(this.state.list);
    if (!this.state.list) {
      return <Loader />;
    }

    return (
      <Container
        style={{
          maxWidth: "720px",
          justifyContent: "flex-start",
        }}
      >
        <div className="Responses">
          <p className="responses_title">Responses</p>
          <p className="responses_body">
            Total Number Of Responses :
            {this.state.list ? Object.keys(this.state.list).length : 0}
          </p>
        </div>

        {this.renderResponses()}
      </Container>
    );
  }
}
