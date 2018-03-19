import _ from "lodash";
import React from "react";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Logo = styled.span`
  color: #84468B;
  font-weight: bold;
`;
const MenuBar = () => {
  const menus = [
    { name: "home", as: Link, to: "/", content: <Logo>VINGO</Logo> },
    { name: "create", as: Link, to: "/create", content: "Create New Room" },
    { name: "lobby", as: Link, to: "/lobby", content: "Games" }
  ];
  return (
    <Menu fixed="top">
      {_.map(menus, menu => {
        return (
          <Menu.Item
            key={`menu-top-${menu.name}`}
            name={menu.name}
            as={menu.as}
            to={menu.to}
            content={menu.content}
            onClick={menu.onClick}
            position={menu.position}
            color={menu.color}
            style={menu.style}
          />
        );
      })}
    </Menu>
  );
};
const { array, string } = PropTypes;

MenuBar.propsTypes = {
  menus: array.isRequired
};
export default MenuBar;
