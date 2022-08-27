---
to: <%= absPath %>/<%= component_name %>.tsx
---
import React from "react";
import {Styled<%= component_name %>} from "./styles";

export const <%= component_name %> = () => {
  return (
    <Styled<%= component_name %>></Styled<%= component_name %>>
  );
};
