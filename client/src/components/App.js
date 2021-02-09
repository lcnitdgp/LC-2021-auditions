import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import {fetchUser} from "../actions";

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";

import CollectResponse from "./CollectResponse";
import Landing from "./Landing";
import RenderAdminForm from "./AdminPanel/RenderAdminForm";
import Responses from "./AdminPanel/Responses";
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
          <Route exact component={CollectResponse} path="/form" />

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
