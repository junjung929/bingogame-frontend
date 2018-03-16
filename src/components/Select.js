import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import { Form } from "semantic-ui-react";

const Select = ({
  className,
  name,
  type,
  label,
  placeholder,
  options,
  onChange,
  value,
  compact,
  fluid
}) => {
  return (
    <Form.Select
      inline
      {...{
        fluid,
        label,
        type,
        name,
        placeholder,
        options,
        onChange,
        compact
      }}
      {...value}
    />
  );
};

const { string, array, func, bool } = PropTypes;
Select.propTypes = {
  fluid: bool,
  compact: bool,
  label: string,
  name: string.isRequired,
  type: string.isRequired,
  placeholder: string.isRequired,
  options: array.isRequired,
  onChange: func.isRequired
};

export default pure(Select);
