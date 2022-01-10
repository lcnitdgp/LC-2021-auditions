import React, { Component, useEffect } from "react";
import { Button } from "react-bootstrap";
import { connect } from "react-redux";
import "./Landing.css";
import { fetchUser } from "../actions";
import { Link, useHistory } from "react-router-dom";
import $ from "jquery";
import MainText from "./MainText";

function Landing(props) {
  let history = useHistory();
  useEffect(() => {
    $(window).ready(function () {
      $(".boton").wrapInner("<div class=botontext></div>");

      $(".botontext").clone().appendTo($(".boton"));

      $(".boton").append(
        '<span class="twist"></span><span class="twist"></span><span class="twist"></span><span class="twist"></span>'
      );

      $(".twist").css("width", "25%").css("width", "+=3px");
    });
  }, []);

  const onClickSignIn = async () => {
    console.log("The user has to signUp.");
    window.open(`${process.env.REACT_APP_BACKEND_URL}/auth/google`, "_self");

    await props.fetchUser();
  };
  const renderSignUpButton = () => {
    return (
      <div class="wrap">
        <a href="#" class="btn" onClick={() => onClickSignIn()}>
          <span className="svgIcon t-popup-svg">
            <svg
              className="svgIcon-use"
              width="40"
              height="37"
              viewBox="0 0 25 25"
            >
              <g fill="none" fillRule="evenodd">
                <path
                  d="M20.66 12.693c0-.603-.054-1.182-.155-1.738H12.5v3.287h4.575a3.91 3.91 0 0 1-1.697 2.566v2.133h2.747c1.608-1.48 2.535-3.65 2.535-6.24z"
                  fill="#4285F4"
                />
                <path
                  d="M12.5 21c2.295 0 4.22-.76 5.625-2.06l-2.747-2.132c-.76.51-1.734.81-2.878.81-2.214 0-4.088-1.494-4.756-3.503h-2.84v2.202A8.498 8.498 0 0 0 12.5 21z"
                  fill="#34A853"
                />
                <path
                  d="M7.744 14.115c-.17-.51-.267-1.055-.267-1.615s.097-1.105.267-1.615V8.683h-2.84A8.488 8.488 0 0 0 4 12.5c0 1.372.328 2.67.904 3.817l2.84-2.202z"
                  fill="#FBBC05"
                />
                <path
                  d="M12.5 7.38c1.248 0 2.368.43 3.25 1.272l2.437-2.438C16.715 4.842 14.79 4 12.5 4a8.497 8.497 0 0 0-7.596 4.683l2.84 2.202c.668-2.01 2.542-3.504 4.756-3.504z"
                  fill="#EA4335"
                />
              </g>
            </svg>
          </span>
          <span className="google_text">Google Sign In</span>
        </a>
      </div>
    );
  };
  console.log(props.user);
  // debugger;
  return (
    <div className="Landing">
      <MainText />
      {!props.user.authenticated ? (
        renderSignUpButton()
      ) : (
        <>
          <a
            onClick={(e) => {
              console.log("Clicked.");
              setTimeout(() => history.push("/profile/edit"), 1000);
            }}
            className="boton"
          >
            Join Us
          </a>
        </>
      )}
    </div>
  );
}

const mapDispatchToProps = {
  fetchUser,
};

const mapStateToProps = (state) => {
  console.log(state);
  return { user: state.auth };
};
export default connect(mapStateToProps, mapDispatchToProps)(Landing);

/* <Link to="/profile/edit" className="btn btn-outline-dark" role="button">
  Start
</Link>; */
