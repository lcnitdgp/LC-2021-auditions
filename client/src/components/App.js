import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { fetchUser } from "../actions";
import { connect } from "react-redux";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Landing from "./Landing";
import RenderAdminForm from "./AdminPanel/RenderAdminForm";
import Responses from "./Responses";
import MyNavbar from "./MyNavbar";
import SingleResponse from "./AdminPanel/SingleResponse";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    console.log("At the Top");

    return (
      <div className="App">
        <BrowserRouter>
          {/* <MyNavbar /> */}
          <Route exact component={Landing} path="/" />

          {/* Admin Routes */}
          <Route exact component={Responses} path="/admin" />
          <Route exact component={SingleResponse} path="/admin/:id" />
          <Route exact component={RenderAdminForm} path="/admin/form" />
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
