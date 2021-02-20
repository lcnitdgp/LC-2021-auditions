import React from "react";
import "./FormFilled.css";
import officeMeme from "../images/officeMeme.png";
import { Container, Row, Col } from "react-bootstrap";

function FormFilled() {
  return (
    <Container>
      <div className="office-meme">
        <img class="image" src={officeMeme} />
        <p className="text">
          Sorry , but the form submissions have now closed . Please contact the
          Literary Circle Members for further queries .
        </p>
      </div>
    </Container>
  );
}

export default FormFilled;
