import React from "react";
import styled from "styled-components";
import { Header as H } from "semantic-ui-react";

const Top = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 20px;
`;
const Logo = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  height: auto;
  font-size: 3em;
  color: #ff0066;
  font-weight: 600;
`;
const Header = () => {
  return (
    <Top>
      <Logo>VINGO</Logo>
    </Top>
  );
};

export default Header;
