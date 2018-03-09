import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import styled from "styled-components";
import { Grid, Button, Loader } from "semantic-ui-react";

const Intro = styled.p`
  font-size: large;
`;

const Bingo = ({ numbers, sendNumber }) => {
  if (numbers.length === 0) {
    return <Loader inline active />;
  }
  const colNum = numbers.length;
  return (
    <Grid columns={colNum}>
      {_.map(numbers, (row, i) => {
        return (
          <Grid.Row key={`bingo-row-${i}`}>
            {_.map(row, (col, j) => {
              return (
                <Grid.Column key={`bingo-col-${j}`}>
                  <Button
                    fluid
                    value={col.value}
                    onClick={sendNumber}
                    disabled={col.selected}
                  >
                    {col.value}
                  </Button>
                </Grid.Column>
              );
            })}
          </Grid.Row>
        );
      })}
    </Grid>
  );
};

Bingo.propTypes = {
  sendNumber: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired
};

export default pure(Bingo);
