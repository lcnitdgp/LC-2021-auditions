import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";
import { Form, Button } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import Loader from "./Loader";
import "./ProfileEdit.css";
import { updateUser } from "../actions";
const escapeStringRegexp = require("escape-string-regexp");

const backendUrl = process.env.REACT_APP_BACKEND_URL;

function ProfileEdit(props) {
  const [form, setForm] = useState({});
  const [error, setError] = useState({});

  let history = useHistory();
  // console.log(props.location)

  useEffect(() => {
    // console.log(props.location.state);
    var details = {};
    if (props.location && !props.location.state) {
      console.log("api called.");

      axios.get(`/api/profile`).then((response) => {
        setForm(response.data);
        console.log(response.data);
        Object.keys(response.data).forEach((element) => {
          console.log(element);
          details[element] = "";
        });
        console.log(details);
        setError(details);
      });
    } else if (props.location) {
      setForm(props.location.state);
      Object.keys(props.location.state).forEach((element) => {
        console.log(element);
        details[element] = "";
      });
      console.log(details);
      setError(details);
    }
  }, []);

  const arr = Object.keys(form);
  //   console.log(arr, form);

  if (!arr.length) {
    // console.log("The element is loading.");
    return <Loader />;
  }

  const ErrorCheck = () => {
    var isFalse = false;
    for (const element in error) {
      const value = form[element];
      console.log(element, value);

      if (!value) {
        isFalse = true;
        error[element] = "This field is required.";
      } else {
        error[element] = "";
      }

      if (element === "phone") {
        const phoneRegEx =
          /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
        if (phoneRegEx.test(value)) {
          error[element] = "";
        } else {
          isFalse = true;
          error[element] = "Please enter a valid Phone Number";
        }
      }
    }
    return isFalse;
  };

  const onHandleSubmit = async (e) => {
    if (ErrorCheck()) {
      console.log("Fill the form properly.");
      return;
    }
    e.preventDefault();
    console.log("changing user.");
    await props.updateUser(form);
    if (props.location.state) {
      // has come from existing profile
      history.push("/profile");
    } else {
      history.push("/form");
    }
  };

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  // console.log(props.location.state);
  ErrorCheck();
  console.log("The errors are:", error);

  return (
    <div className="ProfileEdit">
      <Form onSubmit={onHandleSubmit} className="form_edit">
        {arr.map((element, index) => {
          console.log(error, element, error[element]);
          return (
            <Form.Group controlId={element} key={index}>
              <Form.Label className="title">
                {element === "phone"
                  ? "Phone Number (Preferably Whatsapp)"
                  : element === "roll"
                  ? "Roll Number"
                  : capitalizeFirstLetter(element)}
              </Form.Label>
              <Form.Control
                value={form[element]}
                onChange={(e) =>
                  setForm({ ...form, [element]: e.target.value })
                }
                required
                isInvalid={error[element]}
                isValid={!error[element]}
                autoComplete="off"
              />
              <Form.Control.Feedback type="invalid">
                {error[element]}
              </Form.Control.Feedback>
            </Form.Group>
          );
        })}
        {
          <div className="wrap button-edit" onClick={(e) => onHandleSubmit(e)}>
            <a className="btn">
              <span className="google_text">
                {props.location.state ? "SAVE" : "NEXT"}
              </span>
            </a>
          </div>
        }
      </Form>
    </div>
  );
}

const mapStateToProps = (auth) => {
  return { auth };
};
const mapDispatchToProps = {
  updateUser,
};
export default connect(mapStateToProps, mapDispatchToProps)(ProfileEdit);
