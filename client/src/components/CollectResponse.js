import React, { Component } from "react";
import { connect } from "react-redux";

import { fetchForm } from "../actions";

class CollectResponse extends Component {
  componentDidMount() {
    this.props.fetchForm();
  }
  render() {
    console.log(this.props);
    return <div>Hello World</div>;
  }
}

const mapStateToProps = ({ adminForm }) => {
  return { adminForm };
};

const mapDispatchToProps = {
  fetchForm,
};

export default connect(mapStateToProps, mapDispatchToProps)(CollectResponse);
