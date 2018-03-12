import React, { Component } from "react";
import { Header } from "components";

import {
  Loader,
  Segment,
  Button
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class HomeContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      content: <Loader active inline />
    };
  }
  componentDidMount() {
    const content = (
      <Button
        as={Link}
        size="large"
        to="/create"
        content="Start"
        style={{ backgroundColor: "#84468B", color: "white" }}
      />
    );
    setTimeout(() => {
      this.setState({ content });
    }, 1000);
  }
  render() {
    const { content } = this.state;
    return (
      <Segment basic textAlign="center">
        <Header />
        <br />
        {content}
      </Segment>
    );
  }
}
export default HomeContainer;
