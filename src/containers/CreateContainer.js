import React, { Component } from "react";
import PropTypes from "prop-types";
import { createStructuredSelector, createSelector } from "reselect";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import * as RoomActions from "actions/room";

import { Procedure, Header, Intro, SelectButton, ShareAndGo } from "components";

import { Container, Segment, Transition } from "semantic-ui-react";
const options = [
  { key: 2, text: "2 people", value: 2 },
  { key: 3, text: "3 people", value: 3 },
  { key: 4, text: "4 people", value: 4 },
  { key: 5, text: "5 people", value: 5 },
  { key: 6, text: "6 people", value: 6 }
];
class CreateContainer extends Component {
  static propTypes = {
    room: PropTypes.object.isRequired,
    createRoom: PropTypes.func.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      maxUser: 0,
      roomId: undefined,
      step: "create"
    };
  }
  componentDidMount() {
    const { isCreated, id } = this.props.room;
    if (isCreated) {
      this.setState({ roomId: id, step: "share" });
    }
  }
  onMaxChange = (e, { value }) => {
    this.setState({ maxUser: value });
  };
  onSubmit = () => {
    const { maxUser } = this.state;
    if (maxUser < 1) {
      return alert("Please select the number of users ");
    }
    this.props
      .createRoom(maxUser)
      .then(callback => {
        console.log(callback);
        const { id } = callback;
        this.setState({ roomId: id, step: "share" });
      })
      .catch(err => {
        console.log(err);
      });
  };
  onBackToCreate = () => {
    this.setState({ step: "create" });
  };
  render() {
    const { isCreated, maxUser } = this.props.room;
    const { roomId, step } = this.state;
    let segment = (
      <div className="text-center">
        <p>
          Choose the maximum number of players.<br />
          And create your game!
        </p>
        <SelectButton
          label="Play with: "
          placeholder="Select the number of users"
          options={options}
          onChange={this.onMaxChange}
          onClick={this.onSubmit}
        />
      </div>
    );
    if (step === "share") {
      segment = (
        <ShareAndGo roomId={roomId ? roomId : null} maxUser={maxUser} />
      );
    }
    return (
      <div>
        <Segment basic>
          <Intro />
          <Procedure
            step={step}
            segment={segment}
            onClick={this.onBackToCreate}
          />
        </Segment>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  room: createSelector(state => state.room, roomState => roomState)
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(RoomActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CreateContainer);
