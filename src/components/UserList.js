import _ from "lodash";
import React from "react";
import PropsTypes from "prop-types";
import styled from "styled-components";
import { Input } from "../components";
import {
  Segment,
  Form,
  Button,
  Icon,
  Menu,
  Sidebar,
  List,
  Header,
  Loader,
  Modal
} from "semantic-ui-react";
import shortid from "shortid";

const Btn = styled.div`
  position: fixed;
  bottom: 10%;
  right: 5%;
`;

const UserList = ({
  currId,
  visible,
  userList,
  toggle,
  messages,
  chat,
  onChatChange,
  onSendSubmit,
  isSending,
  modalContent
}) => {
  const keys = Object.keys(userList);
  const filteredKeys = keys.filter(key => key !== "length");
  return (
    <Sidebar
      as={Segment}
      animation="push"
      width="wide"
      visible={visible}
      inverted
      className="user-list"
    >
      <Header
        as="h2"
        textAlign="center"
        content="Users"
        style={{ margin: "20px" }}
      />
      <List
        divided
        inverted
        relaxed
        style={{
          flexGrow: "1",
          overflowY: "auto",
          paddingLeft: "20px",
          paddingRight: "0px"
        }}
      >
        {_.map(filteredKeys, key => {
          const user = userList[key];
          console.log(user.id);
          console.log(currId);
          return (
            <List.Item key={user.id}>
              {user.id !== currId ? (
                <List.Content floated="right">
                    <Modal
                      trigger={<Button size="tiny" content="Nick Change" />}
                      content={modalContent}
                    />
                </List.Content>
              ) : null}
              <List.Icon
                name={user.role === "host" ? "home" : "user"}
                size="large"
                verticalAlign="middle"
              />
              <List.Content>
                <List.Header as="a">
                  {user.username ? user.username : user.id}
                </List.Header>
                {user.role === "host" ? (
                  <List.Description as="a">Host</List.Description>
                ) : (
                  <List.Description as="a">
                    {user.isReady ? "Ready" : "Not Ready"}
                  </List.Description>
                )}
              </List.Content>
            </List.Item>
          );
        })}
      </List>
      <Header
        as="h2"
        textAlign="center"
        content="Chat"
        style={{ margin: "20px" }}
      />
      <Segment
        style={{
          flexGrow: "3",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <div
          style={{
            display: "flex",
            flexGrow: "3",
            overflowY: "auto",
            flexDirection: "column-reverse",
            textAlign: "left"
          }}
        >
          {_.map(messages, ({ from, message, textAlign }) => {
            const id = shortid.generate();
            return (
              <p
                key={`${from}-msg-${id}`}
                style={{
                  color: from === "system" ? "darkgoldenrod" : "indigo",
                  textAlign: textAlign ? textAlign : "inherit"
                }}
              >
                [{from}]: {message}
              </p>
            );
          })}
        </div>
        <Form onSubmit={onSendSubmit}>
          <Input
            style={{ width: "100%" }}
            name="message"
            value={chat}
            onChange={onChatChange}
            placeholder="Type your message"
            type="text"
            action={
              <Button
                type="submit"
                content={
                  isSending ? <Loader inline active size="tiny" /> : "Send"
                }
                onClick={onSendSubmit}
              />
            }
          />
        </Form>
      </Segment>
      {/* <Btn>
        <Button onClick={toggle} icon="x" circular />
      </Btn> */}
    </Sidebar>
  );
};

const { func, string, bool, object } = PropsTypes;
UserList.propsTypes = {
  visible: bool.isRequired,
  userList: object.isRequired,
  toggle: func.isRequired
};
export default UserList;
