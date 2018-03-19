import React from "react";
import {
  BingoContainer,
  CreateContainer,
  HomeContainer,
  LobbyContainer
} from "../containers";
import { Menu, UserList, NotFound } from "../components";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <Menu />
        <div className="flex-container">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/create" component={CreateContainer} />
            <Route exact path="/lobby" component={LobbyContainer} />
            <Route exact path="/bingo/:room_id" component={BingoContainer} />
            <Route path="*" component={NotFound} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Routes;
