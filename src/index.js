import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store";
import Routes from "routes";
import "styles/global-styles";
// import "styles/iphones-styles";
// import "styles/google-pixel-styles";
// import "styles/laptops-styles";
import registerServiceWorker from "utils/registerServiceWorker";

render(
  <Provider store={configureStore()}>
    <Routes />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
