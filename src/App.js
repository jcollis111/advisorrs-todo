import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";

import ToDos from "./containers/ToDos";
import ArchivedToDos from "./containers/ArchivedToDos";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Route path="/archived" component={ArchivedToDos} />
        <Route path="/" exact component={ToDos} />
      </BrowserRouter>
    );
  }
}

export default App;
