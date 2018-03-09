import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import { Form, Select, Button } from "semantic-ui-react";

const Top = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 20px 0 10px 0;
`;
const Logo = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  height: auto;
  font-size: 2em;
`;
const SelectButton = ({
  className,
  label,
  placeholder,
  options,
  onChange,
  onClick
}) => {
  return (
    <Form.Group className={className}>
      <div>
        <label>{label}</label>
        <Select
          placeholder={placeholder}
          options={options}
          onChange={onChange}
        />
      </div>
      <br />
      <Button
        icon="plus"
        labelPosition="right"
        primary
        basic
        content="Create"
        onClick={onClick}
      />
    </Form.Group>
  );
};

SelectButton.propTypes = {
  label: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  options: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired
};

export default pure(SelectButton);
