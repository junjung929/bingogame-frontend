/* import React, { Component } from "react";
import socketIOClient from "socket.io-client";
import PropTypes from "prop-types";
import { Lobby, Login } from "components";
import { createStructuredSelector, createSelector } from "reselect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as LobbyActions from "actions/lobby";
import { Route } from "react-router-dom";

import { Grid } from "semantic-ui-react";
import { ROOT_URL } from "../constants";

const socket = socketIOClient(ROOT_URL);
class LobbyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: "",
      roomName: ""
    };
  }
  static propTypes = {};

  componentDidMount() {
    console.log("Asd");
    this.props.fetchRooms();
  }
  inputProfile = nickname => {
    this.setState({ nickname });
  };
  inputRoom = roomName => {
    this.setState({ roomName });
  };
  saveProfile = () => {
    const { nickname } = this.state;
    this.props.createProfile({ nickname });
    this.setState({});
  };
  send = () => {
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
    socket.emit("change color", "red");
  };
  createRoom = () => {
    socket.emit(`new room`, this.state.roomName);
    console.log(this.state.roomName);
  };
  render() {
    // socket.on is another method that checks for incoming events from the server
    // This method is looking for the event 'change color'
    // socket.on takes a callback function for the first argument
    socket.on("connectToRoom", function(data) {
      console.log(data);
    });
    socket.on("call rooms", rooms => {
      if (this.props.lobby.rooms !== rooms) {
        this.props.fetchRooms();
      }
    });
    return (
      <Grid>
        <Grid.Column width={10}>
          <Lobby
            rooms={this.props.lobby.rooms}
            createRoom={this.createRoom}
            inputRoom={({ target }) => this.inputRoom(target.value)}
          />
        </Grid.Column>
        <Grid.Column width={4}>
          <Login />
        </Grid.Column>
      </Grid>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  lobby: createSelector(state => state.lobby, lobbyState => lobbyState)
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LobbyActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
 */