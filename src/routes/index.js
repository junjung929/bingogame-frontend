import React from "react";
import { BingoContainer, CreateContainer, HomeContainer } from "containers";
import { Header, Menu } from "components";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

function Routes() {
  return (
    <Router>
      <div style={{ height: "100%" }}>
        <Menu />
        <div className="flex-container">
          <Switch>
            <Route exact path="/" component={HomeContainer} />
            <Route exact path="/create" component={CreateContainer} />
            <Route exact path="/bingo/:room_id" component={BingoContainer} />
            <Route path="*" component={() => <div />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default Routes;
