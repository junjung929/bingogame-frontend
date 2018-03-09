import React from "react";
import { Step, Icon, Segment, Image } from "semantic-ui-react";
import SelectButton from "./SelectButton";

const Procedure = ({ step, segment, onClick }) => {
  return (
    <div>
      <Step.Group attached="top">
        <Step
          className="hover"
          active={step === "create" ? true : false}
          onClick={onClick}
        >
          <Icon name="plus" />
          <Step.Content>
            <Step.Title>Create</Step.Title>
            <Step.Description>
              <p />
            </Step.Description>
          </Step.Content>
        </Step>

        <Step
          active={step === "share" ? true : false}
          disabled={step === "share" ? false : true}
        >
          <Icon name="game" />
          <Step.Content>
            <Step.Title>{`Share & Play`}</Step.Title>
            <Step.Description>
              <p />
            </Step.Description>
          </Step.Content>
        </Step>
      </Step.Group>

      <Segment attached>{segment}</Segment>
    </div>
  );
};
export default Procedure;
