import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useHistory, Link } from "react-router-dom";
import Loader from "./Loader";

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
    <div>
      <>
        {arr.map((element, index) => {
          //   console.log(element, form[element]);
          return (
            <Col key={index}>
              <Form.Group controlId={element}>
                <Form.Label>
                  {element === "roll"
                    ? "Roll Number (Preferably Whatsapp)"
                    : capitalizeFirstLetter(element)}
                </Form.Label>
                <Col>{form[element]}</Col>
              </Form.Group>
              <hr />
            </Col>
          );
        })}
        <Link
          className="btn btn-outline-dark float-right"
          to={{
            pathname: "/profile/edit",
            state: form,
          }}
        >
          Edit
        </Link>
      </>
    </div>
  );
}

export default Profile;
