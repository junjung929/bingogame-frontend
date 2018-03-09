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

import { Segment, Loader } from "semantic-ui-react";

class BingoContainer extends Component {
  static propTypes = {
    bingoStart: PropTypes.func.isRequired,
    bingo: PropTypes.object.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isRoomExist: false
    };
  }
  componentDidMount() {
    const { room_id } = this.props.match.params;
    this.props
      .fetchRoom(room_id)
      .then(callback => {
        this.setState({ isRoomExist: true, isLoading: false });
        socket.emit("bingo join", room_id, callback.maxUser);
        this.props.bingoStart(25);
      })
      .catch(err => {
        this.setState({ isLoading: false });
        console.log("err", err);
      });
  }
  sendNumber = value => {
    // this emits an event to the socket (your server) with an argument of 'red'
    // you can make the argument any color you would like, or any kind of data you want to send.
    socket.emit("selected", value);
  };
  restart = () => {
    socket.emit("restart", 25);
  };
  checkBingo = numbers => {
    const cnt = check(numbers);
    console.log(cnt);
    return cnt;
  };

  render() {
    const { isLoading, isRoomExist } = this.state;
    if (isLoading) {
      return <Loader inline active />;
    }
    if (!isRoomExist) {
      return <NotFound />;
    }
    // socket.on is another method that checks for incoming events from the server
    // This method is looking for the event 'change color'
    // socket.on takes a callback function for the first argument
    socket.on("selected", value => {
      // setting the color of our button
      const isAlreadySeleted = this.props.bingo.selected.find(num => {
        return num === value;
      });
      if (!isAlreadySeleted) {
        this.props.addSelected(value);
        const a = _.map(this.props.bingo.numbers, (row, i) => {
          return _.map(row, (col, j) => {
            if (col.value === parseInt(value)) {
              col.selected = true;
            }
            return col;
          });
        });
        this.props.bingoUpdate(a);
        const result = this.checkBingo(a);
        if (result >= 3) {
          // socket.emit("bingo end", `Player win`);
        }
      }
    });

    socket.on("restart", size => {
      // setting the color of our button
      this.props.bingoStart(size);
    });
    socket.on("bingo end", message => {
      // setting the color of our button
      console.log(message);
    });
    return (
      <Segment>
        <button onClick={this.restart}>Restart</button>
        <br />
        <br />
        <br />
        <br />
        <Bingo
          numbers={this.props.bingo.numbers}
          sendNumber={e => {
            this.sendNumber(e.target.value);
          }}
        />
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
