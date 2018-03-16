import _ from "lodash";
import React from "react";
import { Menu } from "semantic-ui-react";
import PropTypes from "prop-types";

const MenuBar = ({ usersContent, shareContent, nickContent, startContent }) => {
  return (
    <Menu fixed="bottom" inverted borderless style={{ zIndex: 1002 }}>
      <Menu.Item
        key={`menu-bottom-users`}
        name="users"
        content={usersContent}
      />
      <Menu.Item
        key={`menu-bottom-share`}
        name="share"
        content={shareContent}
      />
      <Menu.Menu position="right">
        <Menu.Item
          key={`menu-bottom-nick-change`}
          name="nickChange"
          content={nickContent}
        />
        <Menu.Item
          key={`menu-bottom-start`}
          name="start"
          content={startContent}
        />
      </Menu.Menu>
    </Menu>
  );
};

const { array, string } = PropTypes;

MenuBar.propsTypes = {
  menus: array.isRequired
};
export default MenuBar;
