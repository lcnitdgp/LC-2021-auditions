import React, { Component } from "react";
import { connect } from "react-redux";
import { logOutUser } from "../actions";
import { Button, Navbar, Nav, NavDropdown } from "react-bootstrap";
import "./MyNavbar.css";
import { Link } from "react-router-dom";

class MyNavbar extends Component {
  onSignOut() {
    this.props.logOutUser();
  }
  render() {
    console.log(this.props.user);
    return (
      <div className="MyNavbar">
        <Navbar collapseOnSelect bg="light" expand="sm">
          <Link to="/">
            <Navbar.Brand>
              <img src="/lc.png" style={{ height: "50px" }} />
            </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            {this.props.user.authenticated ? (
              <>
                <Nav className="mr-auto">
                  <Link to="/profile" className="nav-link">
                    Profile
                  </Link>
                  <Link to="/form" className="nav-link">
                    My Response
                  </Link>
                  {this.props.user.isadmin ? (
                    <>
                      <Link to="/admin" className="nav-link">
                        Responses
                      </Link>
                      <Link to="/admin/form" className="nav-link">
                        Questions
                      </Link>
                    </>
                  ) : (
                    ""
                  )}
                </Nav>

                <Nav>
                  <Button
                    variant="outline-dark"
                    onClick={() => this.onSignOut()}
                  >
                    Logout
                  </Button>
                </Nav>
              </>
            ) : (
              ""
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { user: state.auth };
};

const mapDispatchToProps = {
  logOutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(MyNavbar);
