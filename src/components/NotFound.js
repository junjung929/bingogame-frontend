import React from "react";
import { Link } from "react-router-dom";
import { Button, Icon, Header } from "semantic-ui-react";
const NotFount = () => {
  return (
    <Header as="h2" icon>
      <Icon name="warning sign" color="red" />
      <Header>Game is not Found</Header>
      <Header.Subheader>Please create a game</Header.Subheader>
      <br />
      <Button
        as={Link}
        to="/create"
        basic
        color="pink"
        content="Go to Create"
      />
    </Header>
  );
};

export default NotFount;
