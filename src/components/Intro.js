import React from "react";
import styled from "styled-components";
import { Segment } from "semantic-ui-react";

const Logo = styled.span`
  color: #ff0066;
`;
const Intro = () => {
  return (
    <Segment textAlign="left">
      <h2>
        Welcome to <Logo>Vingo</Logo>!
      </h2>
      <p>
        <strong>
          What is 'Vingo'?
        </strong>
        <br />- Vingo is the bingo platform in virtual environment.
      </p>
      <p>Invite your friends and enjoy!</p>
    </Segment>
  );
};

export default Intro;
