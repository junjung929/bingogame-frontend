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
  BottomMenu as Menu,
  ShareAndGo
} from "../components";
import { check } from "../components/functions";
import { createStructuredSelector, createSelector } from "reselect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as BingoAction from "../actions/bingo";
import * as RoomAction from "../actions/room";
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
  Sidebar,
  Modal,
  Label
} from "semantic-ui-react";

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
      isSending: false,
      notifyMsg: ""
    };
  }
  componentDidMount() {
    console.log("bingo mount");
    const { room_id } = this.props.match.params;
    const { user } = this.props.bingo;
    this.props
      .fetchRoom(room_id)
      .then(callback => {
        this.setState({ isRoomExist: true, isLoading: false, roomId: room_id });
        this.props.bingoStart(callback.size, "initial");
        socket.emit("bingo join", room_id, callback.maxUser);
        socket.on("bingo join", userId => {
          this.setState({ userId });
        });
        if (user) {
          socket.emit("username change", user);
        }
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
      this.props.bingoStart(size).then(() => {
        this.setState({ isBingoStart: true, isLoading: false });
      });
      this.setState({ notifyMsg: `Game start!` });
      setTimeout(() => {
        this.setState({ notifyMsg: "" });
      }, 3000);
    });

    socket.on("whose turn", whose => {
      this.setState({ whoseTurn: whose });
      this.setState({
        notifyMsg: `${
          this.props.bingo.user === whose ? "Your" : `${whose}'s`
        } turn`
      });
      setTimeout(() => {
        this.setState({ notifyMsg: "" });
      }, 3000);
      console.log(`It's ${whose}'s turn`);
    });

    socket.on("number selected", selected => {
      const { whoseTurn } = this.state;
      console.log(`${whoseTurn} chose ${selected}`);
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
        if (cnt > Math.floor(numbers.length / 2)) {
          socket.emit("bingo end", this.props.bingo.user);
        }
        this.setState({ bingoCount: cnt, isLoading: false, isReady: false });
      }, 100);
    });
    socket.on("message", msg => {
      const { messages } = this.state;

      setTimeout(() => {
        if (msg.message != "") {
          messages.unshift(msg);
          this.setState({ messages, isSending: false });
        }
      }, 1000);
      if (msg.from === this.props.bingo.user) return;
      this.setState({ notifyMsg: `New message from ${msg.from}` });
      setTimeout(() => {
        this.setState({ notifyMsg: "" });
      }, 3000);
    });
    socket.on("bingo end", winner => {
      console.log("bingo end ", winner);
      this.setState({
        notifyMsg: `Winner is ${
          winner === this.props.bingo.user ? "you" : winner
        }!`,
        isBingoStart: false,
        bingoCount: 0
      });
      socket.emit("bingo ready", false);
      setTimeout(() => {
        this.setState({ notifyMsg: "" });
      }, 5000);
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
    this.setState({ isLoading: true, userNickname: "" });
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
    const { size } = this.props.room;
    console.log("bingo start");
    socket.emit("bingo start", size);
    this.setState({ isLoading: true, isBingoStart: true });
  };
  onSelectNumber = ({ target: { value } }) => {
    this.setState({ isLoading: true, whoseTurn: false });
    socket.emit("number select", value);
  };
  onChatChange = ({ target: { value } }) => {
    this.setState({ chat: value });
  };
  onSendSubmit = () => {
    if (!this.state.chat) {
      return;
    }
    socket.emit("message", this.state.chat);
    this.setState({ isSending: true, chat: "" });
  };
  onCopyClick = () => {
    /* Get the text field */
    const copyText = document.getElementById("myInput");
    /* Select the text field */
    copyText.select();

    /* Copy the text inside the text field */
    document.execCommand("Copy");
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
      isSending,
      notifyMsg
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
    if (!user || userList.length === 0) {
      return (
        <Username
          onSubmit={this.onSubmit}
          onChange={this.onNickChange}
          username={userNickname}
        />
      );
    }
    const isAllReady = readyCount === maxUser;
    const usersContent = (
      <Button
        circular
        size="tiny"
        icon={visible ? "x" : "bars"}
        onClick={this.toggleVisibility}
      />
    );
    const shareContent = (
      <Modal
        size="mini"
        trigger={<Button circular size="tiny" icon="share" />}
        content={
          <ShareAndGo
            roomId={this.props.match.params.room_id}
            maxUser={parseInt(this.props.room.maxUser)}
            onCopyClick={this.onCopyClick}
          />
        }
      />
    );
    const nickContent = (
      <Modal
        size="mini"
        trigger={
          <Button
            circular
            size="tiny"
            icon="user"
            onClick={visible ? this.toggleVisibility : null}
          />
        }
        content={
          <Username
            content="Please input new username."
            onSubmit={this.onSubmit}
            onChange={this.onNickChange}
            username={userNickname}
          />
        }
      />
    );
    const startContent =
      role === "host" ? (
        <Popup
          on={["hover", "click"]}
          trigger={
            <Button
              size="tiny"
              primary={isAllReady ? true : false}
              onClick={isAllReady ? this.start : null}
              content={isBingoStart ? "Restart" : "Start"}
            />
          }
          content={
            isAllReady
              ? "Press to start"
              : "Game can be begun when all players are ready."
          }
        />
      ) : (
        <Button
          onClick={this.onReady}
          size="tiny"
          content="Ready"
          color={isReady ? "red" : "blue"}
          disabled={isBingoStart}
        />
      );

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
        />
        <Segment basic onClick={visible ? this.toggleVisibility : null}>
          Winner: the person who has {Math.ceil(numbers.length / 2)} bingos
          <Bingo
            className="bingo-board"
            disabled={isBingoStart && whoseTurn === user ? false : true}
            numbers={numbers}
            onClickNumber={this.onSelectNumber}
            children={() => {
              console.log(numbers);
            }}
          />
          <Menu
            {...{ usersContent, shareContent, nickContent, startContent }}
          />
          <Dimmer active={isLoading} inverted>
            <Loader>Loading</Loader>
          </Dimmer>
          {notifyMsg && !visible ? (
            <Label
              pointing="left"
              size="big"
              style={{
                position: "fixed",
                bottom: "50px",
                left: "0px",
                margin: "20px",
                marginLeft: "30px"
              }}
              color="olive"
            >
              <Icon name="warning" />
              {notifyMsg}
            </Label>
          ) : null}
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
