import _ from "lodash";
import React from "react";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

const MenuBar = ({ menus, fixed, inverted, color, style, borderless }) => {
  return (
    <Menu
      fixed={fixed}
      inverted={inverted}
      color={color}
      borderless={borderless}
      style={style}
    >
      {_.map(menus, menu => {
        return (
          <Menu.Item
            key={`menu-${fixed}-${menu.name}`}
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
