import React, { Component, useState } from "react";
import { connect } from "react-redux";
import { Modal, Button } from "react-bootstrap";
import axios from "axios";

function MakeAdminModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        disabled={props.isadmin}
        onClick={handleShow}
        variant="outline-dark"
        style={{ marginRight: "4px" }}
      >
        Make Admin
      </Button>

      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Admin Access Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to provide admin access to <b>{props.name}</b>?
        </Modal.Body>
        <Modal.Footer>
          <Button
            block
            variant="outline-dark"
            onClick={async () => {
              console.log(props.id, props.index);
              const header = {
                headers: {
                  "x-auth-token": localStorage.getItem("token"),
                },
              };
              await axios.post(
                `${process.env.REACT_APP_BACKEND_URL}/api/admin`,
                { id: props.id },
                header
              );
              props.onMakeAdmin(props.index);
              handleClose();
            }}
          >
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

const mapStateToProps = (state) => ({});

const mapDispatchToProps = {};

export default connect(mapStateToProps, mapDispatchToProps)(MakeAdminModal);
