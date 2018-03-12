import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Bingo, randomArrayGenerate, NotFound, Input } from "../components";
import { check } from "../components/functions";
import { createStructuredSelector, createSelector } from "reselect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as BingoAction from "actions/bingo";
import * as RoomAction from "actions/room";
import { socket } from "../constants";
import { Redirect } from "react-router-dom";

import {
  Container,
  Segment,
  Loader,
  Button,
  Dimmer,
  Form,
  Icon,
  Popup
} from "semantic-ui-react";

const WINCNT = 3;

class BingoContainer extends Component {
  static propTypes = {
    bingoStart: PropTypes.func.isRequired,
    bingo: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      userNickname: "",
      roomId: undefined,
      isLoading: true,
      isRoomExist: false,
      isBingoStart: false,
      isRoomFull: false,
      isYourTurn: false,
      bingoCount: 0,
      userList: []
    };
  }
  componentDidMount() {
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
  onNickChange = ({ target }) => {
    this.setState({ userNickname: target.value });
  };
  onSubmit = () => {
    const { userNickname } = this.state;
    if (userNickname.length < 5) {
      return alert("Username should be longer than 5 letters.");
    }
    this.props.addUser(userNickname);
    socket.emit("username change", userNickname);
    this.setState({ isLoading: true });
    setTimeout(() => {
      this.setState({ isLoading: false });
    }, 1000);
  };
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
      bingoCount,
      userNickname,
      userList
    } = this.state;
    const { numbers, user, maxUser } = this.props.bingo;
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
    if (!user) {
      return (
        <Segment basic textAlign="center">
          <Form onSubmit={this.onSubmit}>
            <Input
              name="username"
              label="Username: "
              placeholder="Input your nick name"
              value={userNickname}
              type="text"
              onChange={this.onNickChange}
            />
            <Button
              type="submit"
              primary
              content="Check"
              icon={<Icon name="check" />}
            />
          </Form>
        </Segment>
      );
    }
    socket.on("new user", id => {
      userList.push({ id });
      this.setState({ userList });
      console.log(userList);
      console.log(`new user(${id}) joined the game`);
    });
    socket.on("bingo start", size => {
      console.log("bingo started");
      this.bingoStart();
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
      <Container textAlign="center">
        <Segment basic>
          <Popup
            trigger={
              <Button
                onClick={this.start}
                disabled={userList.length !== maxUser}
                content={isBingoStart ? "Restart Game" : "Start Game"}
              />
            }
            position="top"
            content="Game can be begun when all players are ready."
            basic
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
      </Container>
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
