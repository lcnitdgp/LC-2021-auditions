import React, { Component, createRef } from "react";
import { BrowserRouter, Route, Redirect, Switch } from "react-router-dom";
import { connect } from "react-redux";
import { fetchUser } from "../actions";
import { CSSTransition } from "react-transition-group";
import officePreLoad from "../images/office_preload.png";
import "./Particles.js";
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
import Loader from "./Loader";
import Particles from "./Particles.js";

// import dunder from "../../public/dunder.jpg";

const routes = [
  {
    component: <Landing />,
    path: "/",
  },
  {
    component: <CollectResponse />,
    path: "/form",
  },
  {
    component: <Profile />,
    path: "/profile",
  },
  {
    component: <ProfileEdit />,
    path: "/profile/edit",
  },
  {
    component: <Responses />,
    path: "/admin",
  },
  {
    component: <RenderAdminForm />,
    path: "/admin/form",
  },
  {
    component: <SingleResponse />,
    path: "/admin/responses/:id",
  },
];

class App extends Component {
  constructor(props) {
    super(props);
    this.loading = React.createRef();
    this.routes = React.createRef();
  }

  async componentDidMount() {
    await this.props.fetchUser();
    // console.log("The user has been called:", this.props.user);
    this.loading.current.classList.add("loading");
    setTimeout(() => {
      this.loading.current.style.display = "none";
      // console.log("removed.");
      this.routes.current.classList.add("main_part");
    }, 1000);
  }

  render() {
    const isLoading = !this.props.user;
  
    return (
      <div className="App">
        <Particles />
        <div className="Loader" ref={this.loading}>
          <img class="image_loader" src={officePreLoad} />
        </div>
        {!isLoading ? (
          <div ref={this.routes} style={{ opacity: "0" }}>
            <CSSTransition
              key="location"
              classNames="fade"
              timeout={300}
              appear
            >
              <BrowserRouter>
                <MyNavbar />
                <div class="remaining_page">
                  <Switch>
                    <Route
                      exact
                      component={Landing}
                      path="/"
                      user={this.props}
                    />
                    {/* login Routes */}
                    {this.props.user.authenticated ? (
                      <Route component={CollectResponse} path="/form" />
                    ) : (
                      ""
                    )}
                    {this.props.user.authenticated ? (
                      <Route exact component={Profile} path="/profile" />
                    ) : (
                      ""
                    )}
                    {this.props.user.authenticated ? (
                      <Route
                        exact
                        component={ProfileEdit}
                        path="/profile/edit"
                      />
                    ) : (
                      ""
                    )}

                    {this.props.user.authenticated &&
                    this.props.user.isadmin ? (
                      <Route exact component={Responses} path="/admin" />
                    ) : (
                      ""
                    )}

                    {this.props.user.authenticated &&
                    this.props.user.isadmin ? (
                      <Route
                        exact
                        component={RenderAdminForm}
                        path="/admin/form"
                      />
                    ) : (
                      ""
                    )}

                    {this.props.user.authenticated &&
                    this.props.user.isadmin ? (
                      <Route
                        component={SingleResponse}
                        path="/admin/responses/:id"
                      />
                    ) : (
                      ""
                    )}
                    <Redirect to="/" />
                  </Switch>
                </div>
              </BrowserRouter>
            </CSSTransition>
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = {
  fetchUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
