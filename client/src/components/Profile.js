import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Loader from "./Loader";
import "./Profile.css";
// import ProfileFormElement from "./ProfileFormElement";

function Profile(props) {
  const [form, setForm] = useState({});
  let history = useHistory();

  useEffect(() => {
    let mounted = true;
    axios
      .get("/api/profile")
      .then((response) => {
        console.log(mounted, response.data);
        if (mounted) {
          setForm(response.data);
        }
        return null;
      })
      .catch((err) => console.log(err));
    return () => (mounted = false);
  }, []);

  const arr = Object.keys(form);
  console.log(arr, form);
  if (!arr.length) {
    return <Loader />;
  }
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <div class="Profile">
      {arr.map((element, index) => {
        //   console.log(element, form[element]);
        return (
          <Col key={index}>
            <Form.Group controlId={element}>
              {element === "phone"
                ? "Phone Number"
                : capitalizeFirstLetter(element)}
              :{` ${form[element]}`}
            </Form.Group>
            <hr />
          </Col>
        );
      })}
      <div class="wrap button-edit">
        <Link
          className="btn"
          to={{
            pathname: "/profile/edit",
            state: form,
          }}
        >
          <span className="google_text">EDIT</span>
        </Link>
      </div>
    </div>
  );
}

export default Profile;
