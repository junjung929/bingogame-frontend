import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Bingo,
  randomArrayGenerate,
  NotFound,
  Input,
  Username,
  UserList,
  Menu
} from "../components";
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
  Popup,
  Sidebar
} from "semantic-ui-react";

const WINCNT = 3;

class BingoContainer extends Component {
  static propTypes = {
    bingoStart: PropTypes.func.isRequired,
    bingo: PropTypes.object.isRequired,
    room: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      userId: "",
      userNickname: "",
      roomId: undefined,
      isLoading: true,
      isRoomExist: false,
      isBingoStart: false,
      isRoomFull: false,
      whoseTurn: false,
      bingoCount: 0,
      userList: [],
      role: undefined,
      isReady: false,
      readyCount: 1,
      visible: false,
      chat: "",
      messages: [],
      isSending: false
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
        socket.on("bingo join", userId => {
          this.setState({ userId });
        });
        socket.on("your role", role => {
          this.setState({ role });
        });
      })
      .catch(err => {
        this.setState({ isLoading: false });
      });

    socket.on("users update", users => {
      console.log("users update");
      this.setState({ userList: users });
    });

    socket.on("new user", id => {
      console.log(`new user(${id}) joined the game`);
    });

    socket.on("bingo leave", id => {
      console.log(`Userser(${id}) left the game`);
    });

    socket.on("bingo ready", readyCnt => {
      console.log(`${readyCnt} people are ready`);
      this.setState({ readyCount: readyCnt, isLoading: false });
    });

    socket.on("bingo start", size => {
      console.log("bingo started");
      this.props.bingoStart(25).then(() => {
        this.setState({ isBingoStart: true, isLoading: false });
      });
    });

    socket.on("whose turn", whose => {
      this.setState({ whoseTurn: whose });
      console.log(`It's ${whose === "you" ? "your" : `${whose}'s`} turn`);
    });

    socket.on("number selected", selected => {
      const { whoseTurn } = this.state;
      console.log(`${whoseTurn} chose ${selected}`);
      this.setState({ isLoading: false });
      const { numbers } = this.props.bingo;
      _.map(numbers, rows => {
        _.map(rows, col => {
          if (col.value === parseInt(selected)) {
            col.selected = true;
          }
        });
      });
      setTimeout(() => {
        this.props.bingoUpdate(numbers);
        const cnt = check(numbers);
        console.log(cnt);
      }, 1000);
      // this.props.bingoUpdate(newAry);
      // console.log(newAry);
    });
    socket.on("message", msg => {
      const { messages } = this.state;

      setTimeout(() => {
        if (msg.message != "") {
          messages.unshift(msg);
          console.log(messages);
          console.log(msg);
          this.setState({ messages, isSending: false });
        }
      }, 1000);
    });
  }
  componentWillUnmount() {
    console.log("bingo unmount");
    const { roomId } = this.state;
    socket.emit("bingo leave", roomId);
  }

  onNickChange = ({ target: { value } }) => {
    this.setState({ userNickname: value });
  };
  onSubmit = () => {
    const { userNickname, userList, userId, isReady } = this.state;

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
  onReady = () => {
    const { isReady } = this.state;
    socket.emit("bingo ready", !isReady);
    this.setState({ isReady: !isReady, isLoading: true, isBingoStart: true });
  };
  start = () => {
    console.log("bingo start");
    socket.emit("bingo start", 25);
    this.setState({ isLoading: true, isBingoStart: true });
  };
  onSelectNumber = ({ target: { value } }) => {
    this.setState({ isLoading: true });
    socket.emit("number select", value);
  };
  onChatChange = ({ target: { value } }) => {
    this.setState({ chat: value });
  };
  onSendSubmit = () => {
    socket.emit("message", this.state.chat);
    this.setState({ isSending: true, chat: "" });
  };
  toggleVisibility = () => {
    const { visible } = this.state;
    this.setState({ visible: !visible });
  };

  render() {
    const {
      userId,
      isLoading,
      isRoomExist,
      isBingoStart,
      isRoomFull,
      whoseTurn,
      bingoCount,
      userNickname,
      userList,
      role,
      isReady,
      readyCount,
      visible,
      chat,
      messages,
      isSending
    } = this.state;
    const { numbers, user } = this.props.bingo;
    const { maxUser } = this.props.room;
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
        <Username
          onSubmit={this.onSubmit}
          onChange={this.onNickChange}
          username={userNickname}
        />
      );
    }

    /*
    if (bingoCount >= WINCNT) {
      this.setState({ bingoCount: 0 });
      socket.on("bingo end", message => {
        // setting the color of our button
        console.log("bingo end ", message);
      });
    }*/

    /* socket.on("number selected", value => {
      this.checkBingo(numbers, value);
    }); */
    const isAllReady = readyCount === maxUser;
    const menus = [
      {
        name: "users",
        content: <Button content="See Users" onClick={this.toggleVisibility} />,
        position: "left"
      },
      {
        name: "start",
        position: "right",
        content:
          role === "host" ? (
            <Popup
              trigger={
                <Button
                  primary={isAllReady ? true : false}
                  onClick={isAllReady ? this.start : null}
                  content={isBingoStart ? "Restart Game" : "Start Game"}
                />
              }
              content={
                isAllReady
                  ? "Press to start"
                  : "Game can be begun when all players are ready."
              }
              basic
            />
          ) : (
            <Button
              onClick={this.onReady}
              content="Ready"
              color={isReady ? "red" : "blue"}
            />
          )
      }
    ];
    console.log(userId);
    return (
      <Container textAlign="center">
        <UserList
          currId={userId}
          visible={visible}
          userList={userList}
          toggle={this.toggleVisibility}
          messages={messages}
          chat={chat}
          onChatChange={this.onChatChange}
          onSendSubmit={this.onSendSubmit}
          isSending={isSending}
          modalContent={
            <Username
              onSubmit={this.onSubmit}
              onChange={this.onNickChange}
              username={userNickname}
            />
          }
        />
        <Segment basic>
          <Bingo
            className="bingo-board"
            disabled={isBingoStart && whoseTurn === "you" ? false : true}
            numbers={this.props.bingo.numbers}
            onClickNumber={this.onSelectNumber}
          />
          <Menu
            style={{ zIndex: 1002 }}
            fixed="bottom"
            inverted
            borderless
            menus={menus}
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
