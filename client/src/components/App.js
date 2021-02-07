import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import "./App.css";
import Landing from "./Landing";
import RenderAdminForm from "./RenderAdminForm";
import Responses from "./Responses";

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <Route exact component={Landing} path="/" />
            <Route exact component={RenderAdminForm} path="/admin/form" />
            <Route exact component={Responses} path="/admin" />
          </BrowserRouter>
      </div>
    );
  }
}

export default App;
