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
  color: #84468B;
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
