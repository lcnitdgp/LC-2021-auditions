import React, { Component } from "react";

export default class LoadingWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isMounted: this.props.isMounted,
    };
  }

  componenetDidUpdate(prevProps) {
    const isNewMounted = this.props.isMounted;
    const { isMounted } = this.props;
    if (isNewMounted && !isMounted) {
      // removing from dom
      this.setTimeOut(() => {
        () => this.setState({ shouldRender: false }), this.props.delayTime;
      }, 1000);
    } else if (!isNewMounted && isMounted) {
      this.setState({ shouldRender: true });
    }
  }
  render() {
    return this.state.shouldRender ? <Component {...this.props} /> : null;
  }
}
