import React from "react";
import {
  BingoContainer,
  CreateContainer,
  HomeContainer,
  LobbyContainer
} from "containers";
import { Menu, UserList } from "components";
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
            {/*  <Route
              exact
              path="/temp"
              component={() => {
                return (
                  <UserList
                    visible={true}
                    userList={userList}
                    messages={messages}
                  />
                );
              }}
            /> */}
            <Route path="*" component={() => <div />} />
          </Switch>
        </div>
      </div>
    </Router>
  );
}
const messages = [
  { from: "adfasfas", message: "adfasdfasdfasfdasdf", textAlign: "center" },
  { from: "adfasfas", message: "adfasdfasdfasfdasdf" },
  { from: "adfasfas", message: "adfasdfasdfasfdasdf" },
  { from: "adfasfas", message: "adfasdfasdfasfdasdf" },
  { from: "adfasfas", message: "adfasdfasdfasfdasdf" },
  { from: "adfasfas", message: "adfasdfasdfasfdasdf" },
  { from: "adfasfas", message: "adfasdfasdfasfdasdf" }
];
const userList = {
  length: 1,
  pbBqEUnFBWikFnpkAAB8: {
    id: "pbBqEUnFBWikFnpkAAB8",
    isReady: true,
    role: "host",
    username: "asdasd"
  }
};
export default Routes;
