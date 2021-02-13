import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";
import { Form, Button } from "react-bootstrap";
import { useHistory, Redirect } from "react-router-dom";
import Loader from "./Loader";
import "./ProfileEdit.css";

function ProfileEdit(props) {
  const [form, setForm] = useState({});
  let history = useHistory();
  console.log(props.location);
  useEffect(() => {
    console.log(props.location.state);
    if (props.location && !props.location.state) {
      console.log("api called.");
      axios.get("/api/profile").then((response) => {
        console.log(response.data);
        setForm(response.data);
      });
    } else if (props.location) {
      setForm(props.location.state);
    }
  }, []);

  const arr = Object.keys(form);
//   console.log(arr, form);

  if (!arr.length) {
    // console.log("The element is loading.");
    return <Loader />;;
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault();
    // console.log(form);
    await axios.put("/api/profile", form);
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

  return (
    <div className="ProfileEdit">
      <Form onSubmit={onHandleSubmit} className="form_edit">
        {arr.map((element, index) => {
          //   console.log(element, form[element]);
          return (
            <Form.Group controlId={element} key={index}>
              <Form.Label>
                {element === "roll"
                  ? "Roll Number (Preferably Whatsapp)"
                  : capitalizeFirstLetter(element)}
              </Form.Label>
              <Form.Control
                value={form[element]}
                onChange={(e) =>
                  setForm({ ...form, [element]: e.target.value })
                }
                required
              />
            </Form.Group>
          );
        })}
        {props.location.state ? (
          <Button type="submit" variant="outline-dark" className="float-right">
            Save
          </Button>
        ) : (
          <Button type="submit" variant="outline-dark" className="float-right">
            Next
          </Button>
        )}
      </Form>
    </div>
  );
}

const mapStateToProps = (auth) => {
  return { auth };
};
export default connect(mapStateToProps, null)(ProfileEdit);