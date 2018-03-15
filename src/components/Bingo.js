import _ from "lodash";
import React from "react";
import PropTypes from "prop-types";
import pure from "recompose/pure";
import { Grid, Button, Loader, Segment, Icon } from "semantic-ui-react";

const Bingo = ({ numbers, onClickNumber, disabled, className, children }) => {
  if (numbers.length === 0) {
    return <Loader inline active />;
  }
  const colNum = numbers.length;
  return (
    <Grid
      className={className}
      columns={colNum}
      as={Segment}
      disabled={disabled}
      textAlign="center"
      style={{ backgroundColor: "#b3e0ff" }}
    >
      {_.map(numbers, (row, i) => {
        return (
          <Grid.Row key={`bingo-row-${i}`}>
            {_.map(row, (col, j) => {
              if (
                parseInt(i) === Math.floor(colNum / 2) &&
                parseInt(j) === Math.floor(colNum / 2)
              ) {
                return (
                  <Grid.Column
                    key={`bingo-col-${j}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    Free<br />Space
                  </Grid.Column>
                );
              }
              return (
                <Grid.Column key={`bingo-col-${j}`}>
                  <Button
                    fluid
                    style={{
                      height: "100%",
                      backgroundColor: "#fff",
                      border: "4px solid #ff6600"
                    }}
                    size="big"
                    value={col.value}
                    onClick={onClickNumber}
                    disabled={disabled ? true : col.selected}
                    content={
                      col.selected ? (
                        <Icon name="circle" color="red" />
                      ) : (
                        col.value
                      )
                    }
                  />
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
  onClickNumber: PropTypes.func.isRequired,
  numbers: PropTypes.array.isRequired
};

export default pure(Bingo);
