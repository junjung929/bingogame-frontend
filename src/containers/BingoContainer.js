import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bingo, randomArrayGenerate, NotFound } from "../components";
import { check } from "../components/functions";
import { createStructuredSelector, createSelector } from "reselect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as BingoAction from "actions/bingo";
import * as RoomAction from "actions/room";
import { socket } from "../constants";
import { Redirect } from "react-router-dom";

import { Segment, Loader, Button, Dimmer } from "semantic-ui-react";

const WINCNT = 3;

class BingoContainer extends Component {
  static propTypes = {
    bingoStart: PropTypes.func.isRequired,
    bingo: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      userNickname: null,
      roomId: undefined,
      isLoading: true,
      isRoomExist: false,
      isBingoStart: false,
      isRoomFull: false,
      isYourTurn: false,
      bingoCount: 0
    };
  }
  componentWillMount() {
    console.log("bingo mount");
    const { room_id } = this.props.match.params;
    this.props
      .fetchRoom(room_id)
      .then(callback => {
        this.setState({ isRoomExist: true, isLoading: false, roomId: room_id });
        this.props.bingoStart(25, "initial");
        socket.emit("bingo join", room_id, callback.maxUser);
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });
  }
  componentWillUnmount() {
    console.log("bingo unmount");
    const { roomId } = this.state;
    socket.emit("bingo leave", roomId);
  }

  start = () => {
    const { roomId } = this.state;
    console.log("bingo start");
    socket.emit("bingo start", 25, roomId);
  };
  render() {
    const {
      isLoading,
      isRoomExist,
      isBingoStart,
      isRoomFull,
      isYourTurn,
      bingoCount
    } = this.state;
    const { numbers } = this.props.bingo;
    socket.on("Room Full", roomFull => {
      if (roomFull) this.setState({ isRoomFull: true });
    });
    if (isRoomFull) {
      alert(
        "This game has already full of players.\nPlease create another game."
      );
      return <Redirect from={this.props.match.url} to="/create" />;
    }
    if (isLoading && !isBingoStart) {
      return <Loader inline active />;
    }
    if (!isRoomExist) {
      return <NotFound />;
    }
    socket.on("bingo start", size => {
      console.log("bingo started");
      /* this.setState({
        isLoading: true,
        isBingoStart: true
      });
      this.props.bingoStart(25).then(() => {
        this.setState({ isLoading: false });
      }); */
    });
    /*
    if (bingoCount >= WINCNT) {
      this.setState({ bingoCount: 0 });
      socket.on("bingo end", message => {
        // setting the color of our button
        console.log("bingo end ", message);
      });
    }

    if (!isYourTurn) {
      socket.on("your turn", isYou => {
        if (isYou) {
          this.setState({ isYourTurn: true });
        }
        // setting the color of our button
        console.log("your turn ", isYou);
      });
      socket.on("number selected", value => {
        this.checkBingo(numbers, value);
      });
    } */

    return (
      <Segment basic>
        <Button
          onClick={this.start}
          content={isBingoStart ? "Restart Game" : "Start Game"}
        />
        <Bingo
          className="bingo-board"
          disabled={isBingoStart && isYourTurn ? false : true}
          numbers={this.props.bingo.numbers}
          sendNumber={e => {
            this.sendNumber(e.target.value);
          }}
        />
        <Dimmer active={isLoading} inverted>
          <Loader>Loading</Loader>
        </Dimmer>
      </Segment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  bingo: createSelector(state => state.bingo, bingoState => bingoState),
  room: createSelector(state => state.room, roomState => roomState)
});

function mapDispatchToProps(dispatch) {
  const Actions = Object.assign(BingoAction, RoomAction);
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BingoContainer);
