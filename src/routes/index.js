import React from "react";
import { BingoContainer, createContainer, HomeContainer } from "containers";
import { Header } from "components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={HomeContainer} />
        <Route exact path="/create" component={createContainer} />
        <Route exact path="/bingo/:room_id" component={BingoContainer} />
        <Route path="*" component={() => <div />} />
      </Switch>
    </Router>
  );
}

export default Routes;
