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
  value
}) => {
  return (
    <Form.Field className={className}>
      <Form.Select
        inline
        {...{ label, type, name, placeholder, options, onChange }}
        {...value}
      />
    </Form.Field>
  );
};

const { string, array, func } = PropTypes;
Select.propTypes = {
  label: string.isRequired,
  name: string.isRequired,
  type: string.isRequired,
  placeholder: string.isRequired,
  options: array.isRequired,
  onChange: func.isRequired
};

export default pure(Select);
