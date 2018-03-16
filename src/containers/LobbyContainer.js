import _ from "lodash";
import React, { Component } from "react";
import PropTypes from "prop-types";
import { Lobby, Login, Table, Intro } from "components";
import { createStructuredSelector, createSelector } from "reselect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "actions/room";
import { Link } from "react-router-dom";
import { Segment, Button, Icon } from "semantic-ui-react";

const PERPAGE = 3;
const PAGE = 0;
class LobbyContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      page: PAGE
    };
  }
  componentDidMount() {
    this.props.fetchRooms(PERPAGE, PAGE);
  }
  refetchRooms = () => {
    const { floor_id } = this.props.match.params;
    let { page } = this.state;
    this.props.fetchRooms(PERPAGE, page);
  };
  onPageChange = (e, { activePage }) => {
    console.log(activePage);
    this.setState({ page: activePage - 1 }, () => {
      this.refetchRooms();
    });
  };
  renderRoomsList = rooms => {
    return _.map(rooms, room => {
      return [
        room.title,
        `${Math.sqrt(room.size)} x ${Math.sqrt(room.size)}`,
        `${room.length} / ${room.maxUser}`,
        <Button
          style={{ backgroundColor: "#84468B", color: "white" }}
          as={Link}
          to={`/bingo/${room.id}`}
          content="JOIN"
        />
      ];
    });
  };
  render() {
    const { rooms, page, pages } = this.props.lobby;
    const tHead = [
      "Title",
      "Size",
      "Users",
      <Button
        circular
        onClick={() => this.props.fetchRooms(PERPAGE, PAGE)}
        icon="refresh"
      />
    ];
    const tBody = this.renderRoomsList(rooms);
    return (
      <Segment basic>
        <Intro />
        <Table {...{ tHead, tBody, pages }} onPageChange={this.onPageChange} />
      </Segment>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  lobby: createSelector(state => state.lobby, lobbyState => lobbyState)
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RoomActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LobbyContainer);
