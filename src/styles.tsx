import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    overflow: hidden;
  }

  html {
    font-size: calc(1000vw / 1920);
  }

  svg {
    height: 100%;
    object-fit: cover;
  }
`

export default GlobalStyle;