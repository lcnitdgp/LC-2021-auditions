import React, { Component } from "react";
import { BrowserRouter, Route, Redirect,Switch } from "react-router-dom";
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
import Profile from "./Profile";
import ProfileEdit from "./ProfileEdit";

class App extends Component {
  componentDidMount() {
    this.props.fetchUser();
  }
  render() {
    console.log("At the Top");
    if(!this.props.user){
      return <div>Loading....</div>
    }
    return (
      <div className="App">
        <BrowserRouter>
          <MyNavbar />
          <Switch>
            <Route exact component={Landing} path="/" />
            {/* login Routes */}
            {this.props.user ? (
              <>
                <Route component={CollectResponse} path="/form" />
                <Route exact component={Profile} path="/profile" />
                <Route exact component={ProfileEdit} path="/profile/edit" />
                {/* Admin Routes */}
                {this.props.user.isadmin ? (
                  <>
                    <Route exact component={Responses} path="/admin" />
                    <Route
                      exact
                      component={RenderAdminForm}
                      path="/admin/form"
                    />
                    <Route
                      component={SingleResponse}
                      path="/admin/responses/:id"
                    />
                  </>
                ) : (
                  <Redirect to="/" />
                )}
              </>
            ) : (
              <Redirect to="/" />
            )}
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({user:state.auth})
};

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
