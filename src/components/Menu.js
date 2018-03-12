import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.span`
  color: #ff0066;
  font-weight: bold;
`;
const MenuBar = () => {
  return (
    <Menu fixed="top">
      <Menu.Item name="home" as={Link} to="/">
        <Logo>VINGO</Logo>
      </Menu.Item>

      <Menu.Item name="create" as={Link} to="/create">
        Create New Room
      </Menu.Item>
    </Menu>
  );
};
export default MenuBar;
