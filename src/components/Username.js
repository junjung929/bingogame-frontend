import React from "react";
import PropsTypes from "prop-types";
import { Input } from "../components";
import { Segment, Form, Button, Icon } from "semantic-ui-react";

const Username = ({ onSubmit, username, onChange }) => {
  return (
    <Segment basic textAlign="center">
      <Form onSubmit={onSubmit}>
        <Input
          name="username"
          label="Username: "
          placeholder="Input your nick name"
          value={username}
          type="text"
          onChange={onChange}
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
};

const { func, string } = PropsTypes;
Username.propsTypes = {
  onSubmit: func.isRequired,
  onChange: func.isRequired,
  username: string.isRequired
};
export default Username;
