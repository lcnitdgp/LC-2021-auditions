import React, { Component, useState, useEffect } from "react";
import { connect } from "react-redux";
import axios from "../config/axios";
import { Form, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
// import ProfileFormElement from "./ProfileFormElement";
import "./ProfileFormElement.css";

function ProfileEdit(props) {
  const [form, setForm] = useState({});
  let history = useHistory();

  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_BACKEND_URL}/api/profile`)
      .then((response) => {
        console.log(response.data);
        setForm(response.data);
      });
  }, []);

  const arr = Object.keys(form);
  if (!arr.length) {
    return <div>Loading...</div>;
  }
  const onHandleSubmit = async (e) => {
    e.preventDefault();
    console.log(form);
    await axios.put("/api/profile", form);
    history.push("/form");
  };
  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };
  return (
    <div>
      <Form onSubmit={onHandleSubmit}>
        {arr.map((element, index) => {
          //   console.log(element, form[element]);
          return (
            <Form.Group controlId={element}>
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
        <Button type="submit" variant="outline-dark" className="float-right">
          Next
        </Button>
      </Form>
    </div>
  );
}

export default ProfileEdit;
