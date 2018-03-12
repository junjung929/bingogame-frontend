/* import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import styled from "styled-components";
import Login from "./Login";
import {
  Grid,
  Button,
  List,
  Modal,
  Header,
  Icon,
  Input
} from "semantic-ui-react";

const Intro = styled.p`
  font-size: large;
`;
const Lobby = ({
  numbers,
  sendNumber,
  saveProfile,
  inputProfile,
  rooms,
  inputRoom,
  createRoom
}) => {
  return (
    <div>
      <Input
        placeholder="Input a name of new room"
        onChange={inputRoom}
        action={<Button content="Create Room" onClick={createRoom} />}
      />
      {_.map(rooms, room => {
        return (
          <List key={`room-${room.id}`}>
            <List.Item>
              <List.Content floated="right">
                <Button>Join</Button>
              </List.Content>
              <Icon name="plus" />
              <List.Item>{room.name}</List.Item>
              <List.Item>{room.size}</List.Item>
            </List.Item>
          </List>
        );
      })}
    </div>
  );
};

Lobby.propTypes = {};

export default pure(Lobby);
 */