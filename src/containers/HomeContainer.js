import React, { Component } from "react";
import PropTypes from "prop-types";

import { Procedure, Header, Intro, SelectButton, ShareAndGo } from "components";

import {
  Loader,
  Container,
  Segment,
  Transition,
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
      <Button as={Link} size="large" to="/create" basic content="Start" color="pink" />
    );
    setTimeout(() => {
      this.setState({ content });
    }, 1000);
  }
  render() {
    const { content } = this.state;
    return (
      <Segment basic textAlign="center" >
        <Header />
        <br />
        {content}
      </Segment>
    );
  }
}
export default HomeContainer;
