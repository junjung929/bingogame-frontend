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

  #root{
    height:100%
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

  .bingo-board {
    margin-left: auto !important;
    margin-right: auto !important;
    max-width: 500px;
    min-height: 500px;
  }

  .user-list.ui.sidebar{
    display: flex;
    flex-direction: column;
    top: 40px;
    z-index: 1001;
    height: auto !important;
    bottom: 40px !important;
  }
`;
