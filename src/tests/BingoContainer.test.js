import React from "react";
import ReactDOM from "react-dom";
import { BingoContainer } from "../containers";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<BingoContainer />, div);
});
