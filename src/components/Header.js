import React from "react";
import styled from "styled-components";

const Top = styled.div`
  height: auto;
  display: flex;
  align-items: center;
  padding: 20px;
`;
const Logo = styled.div`
  font-family: Arial, Helvetica, sans-serif;
  height: auto;
  font-size: 4em;
  color: #ff0066;
  font-weight: 700;
`;
const Header = () => {
  return (
    <Top>
      <Logo>VINGO</Logo>
    </Top>
  );
};

export default Header;
