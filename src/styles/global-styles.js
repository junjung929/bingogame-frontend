import { injectGlobal } from "styled-components";

/* eslint no-unused-expressions: 0 */
injectGlobal`
  html,
  body{
    height: 100%;
    width: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: sans-serif;
  }
  .flex-container{
    display: flex;
    overflow: auto;
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  .text-center {
    text-align: center !important;
  }
  .text-left {
    text-align: left !important;
  }
  .text-right {
    text-align: right !important;
  }
  .pull-left {
    float: left !important;
  }
  .pull-right {
    float: right !important;
  }

  .hover:hover {
    cursor: pointer;
  }
`;
