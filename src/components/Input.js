import React from "react";
import PropTypes from "prop-types";
import { Form } from "semantic-ui-react";

const Input = ({
  name,
  value,
  label,
  type,
  onChange,
  placeholder,
  style,
  action
}) => (
  <Form.Field>
    <Form.Input
      inline
      {...{
        style,
        label,
        action,
        name,
        value,
        type,
        onChange,
        placeholder
      }}
    />
  </Form.Field>
);

const { string, func } = PropTypes;

Input.propTypes = {
  name: string.isRequired,
  value: string.isRequired,
  label: string,
  type: string.isRequired,
  onChange: func.isRequired,
  placeholder: string.isRequired
};

export default Input;
