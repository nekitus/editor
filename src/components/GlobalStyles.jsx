import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
  html {
    height: 100%;
  }
  
  body {
    font-family: medium-content-sans-serif-font, "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;    font-weight: 400;
    color: #000;
    user-select: none;
    height: 100%;
  }

  input, textarea, button {
    font-family: Open Sans, Helvetica Neue, sans-serif;
  }

  #app-container {
    height: 100%;
  }


`;
